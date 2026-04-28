// Package sms provides a unified SMS gateway interface with support for
// Unifonic (primary for KSA) and Twilio (international fallback).
//
// Provider is selected via the SMS_PROVIDER environment variable:
//
//	SMS_PROVIDER=unifonic    (production, KSA)
//	SMS_PROVIDER=twilio      (fallback / non-KSA)
//	SMS_PROVIDER=console     (dev mode: prints OTP to logs instead of sending)
//
// On development/staging, use SMS_PROVIDER=console to avoid spending SMS credits.
package sms

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

// Provider is the interface every SMS backend implements.
type Provider interface {
	// Send an SMS. `to` must be E.164 (+9665XXXXXXXX). Returns error on failure.
	Send(ctx context.Context, to, message string) error
	// Name for logging / diagnostics.
	Name() string
}

// ─── Factory ─────────────────────────────────────────────────────────────────

// New returns the SMS provider configured via environment variables.
// Falls back to ConsoleProvider if nothing is configured.
func New() Provider {
	providerName := strings.ToLower(os.Getenv("SMS_PROVIDER"))
	switch providerName {
	case "unifonic":
		return &UnifonicProvider{
			appSid: os.Getenv("UNIFONIC_APP_SID"),
			sender: env("UNIFONIC_SENDER_ID", "MZADAT"),
		}
	case "twilio":
		return &TwilioProvider{
			accountSID: os.Getenv("TWILIO_ACCOUNT_SID"),
			authToken:  os.Getenv("TWILIO_AUTH_TOKEN"),
			fromNumber: os.Getenv("TWILIO_FROM_NUMBER"),
		}
	case "console", "":
		log.Println("sms: using CONSOLE provider (OTPs will be printed to logs)")
		return &ConsoleProvider{}
	default:
		log.Printf("sms: unknown provider %q, falling back to console", providerName)
		return &ConsoleProvider{}
	}
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// ─── ConsoleProvider: dev mode ───────────────────────────────────────────────

type ConsoleProvider struct{}

func (c *ConsoleProvider) Name() string { return "console" }

func (c *ConsoleProvider) Send(_ context.Context, to, message string) error {
	log.Printf("┌───────────────────────── SMS (DEV) ─────────────────────────")
	log.Printf("│ To:      %s", to)
	log.Printf("│ Message: %s", message)
	log.Printf("└──────────────────────────────────────────────────────────────")
	return nil
}

// ─── UnifonicProvider: KSA primary ───────────────────────────────────────────
//
// Unifonic's API reference: https://docs.unifonic.com/reference/sendsms
// Minimum required fields: AppSid, Body, Recipient, SenderID (optional).

type UnifonicProvider struct {
	appSid string
	sender string
}

func (u *UnifonicProvider) Name() string { return "unifonic" }

func (u *UnifonicProvider) Send(ctx context.Context, to, message string) error {
	if u.appSid == "" {
		return errors.New("unifonic: UNIFONIC_APP_SID is not set")
	}

	// Unifonic expects phone without the leading '+' (i.e. 9665XXXXXXXX)
	recipient := strings.TrimPrefix(to, "+")

	form := url.Values{}
	form.Set("AppSid", u.appSid)
	form.Set("Recipient", recipient)
	form.Set("Body", message)
	if u.sender != "" {
		form.Set("SenderID", u.sender)
	}

	req, err := http.NewRequestWithContext(ctx, "POST",
		"https://el.cloud.unifonic.com/rest/SMS/messages",
		strings.NewReader(form.Encode()))
	if err != nil {
		return fmt.Errorf("unifonic: build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("unifonic: http: %w", err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	// Unifonic returns HTTP 200 even on logical errors — check payload
	var result struct {
		Success   bool            `json:"success"`
		Data      json.RawMessage `json:"data"`
		ErrorCode string          `json:"errorCode"`
		Message   string          `json:"message"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		return fmt.Errorf("unifonic: parse response (status %d, body=%s): %w",
			resp.StatusCode, truncate(body, 200), err)
	}
	if !result.Success {
		return fmt.Errorf("unifonic: send failed [code=%s message=%s]",
			result.ErrorCode, result.Message)
	}
	return nil
}

// ─── TwilioProvider: international fallback ──────────────────────────────────

type TwilioProvider struct {
	accountSID string
	authToken  string
	fromNumber string
}

func (t *TwilioProvider) Name() string { return "twilio" }

func (t *TwilioProvider) Send(ctx context.Context, to, message string) error {
	if t.accountSID == "" || t.authToken == "" || t.fromNumber == "" {
		return errors.New("twilio: credentials not configured")
	}

	form := url.Values{}
	form.Set("To", to)
	form.Set("From", t.fromNumber)
	form.Set("Body", message)

	req, err := http.NewRequestWithContext(ctx, "POST",
		fmt.Sprintf("https://api.twilio.com/2010-04-01/Accounts/%s/Messages.json", t.accountSID),
		bytes.NewBufferString(form.Encode()))
	if err != nil {
		return fmt.Errorf("twilio: build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(t.accountSID, t.authToken)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("twilio: http: %w", err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("twilio: HTTP %d: %s", resp.StatusCode, truncate(body, 200))
	}
	return nil
}

// ─── helpers ─────────────────────────────────────────────────────────────────

func truncate(b []byte, max int) string {
	if len(b) > max {
		return string(b[:max]) + "..."
	}
	return string(b)
}
