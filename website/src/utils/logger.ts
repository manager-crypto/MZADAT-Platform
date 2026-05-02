import { ReactNode } from 'react';

type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
  component?: string;
}

export interface Metric {
  name: string;
  value: number;
  timestamp: string;
  tags?: Record<string, string>;
}

class Logger {
  private static MAX_LOGS = 500;
  private logs: LogEntry[] = [];
  private metrics: Metric[] = [];
  
  // For simulating real-time updates in the dashboard
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  log(level: LogLevel, message: string, context?: any, component?: string) {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      component
    };

    this.logs.unshift(entry);
    if (this.logs.length > Logger.MAX_LOGS) {
      this.logs.pop();
    }

    // In a real app, send to Datadog/Sentry here
    const colorMap = {
      info: '#3b82f6',
      warn: '#f59e0b',
      error: '#ef4444',
      fatal: '#991b1b'
    };

    console.log(`%c[${level.toUpperCase()}] ${component ? `[${component}] ` : ''}${message}`, `color: ${colorMap[level]}`, context || '');

    this.notify();
  }

  info(message: string, context?: any, component?: string) { this.log('info', message, context, component); }
  warn(message: string, context?: any, component?: string) { this.log('warn', message, context, component); }
  error(message: string, context?: any, component?: string) { this.log('error', message, context, component); }
  fatal(message: string, context?: any, component?: string) { this.log('fatal', message, context, component); }

  trackMetric(name: string, value: number, tags?: Record<string, string>) {
    this.metrics.push({
      name,
      value,
      timestamp: new Date().toISOString(),
      tags
    });
    if (this.metrics.length > Logger.MAX_LOGS) this.metrics.shift();
    this.notify();
  }

  trackBidEvent(
    auctionId: string,
    amount: number,
    success: boolean,
    errorMessage?: string,
    kind: 'business' | 'system' = 'business',
  ) {
    if (success) {
      this.info(`Bid placed successfully`, { auctionId, amount }, 'BiddingSystem');
      this.trackMetric('bid_success', 1, { auctionId });
      return;
    }
    // Business-rule rejections (low bid, insufficient balance, auction closed)
    // are expected outcomes, not system faults — surface them at warn level.
    // System/network failures still surface at error level.
    const ctx = { auctionId, amount, error: errorMessage };
    if (kind === 'system') {
      this.error(`Bid failed (system)`, ctx, 'BiddingSystem');
      this.trackMetric('bid_error', 1, { auctionId, reason: errorMessage || 'unknown' });
    } else {
      this.warn(`Bid rejected`, ctx, 'BiddingSystem');
      this.trackMetric('bid_rejected', 1, { auctionId, reason: errorMessage || 'unknown' });
    }
  }

  trackPaymentEvent(txId: string, amount: number, success: boolean, method: string, errorMessage?: string) {
    if (success) {
      this.info(`Payment processed`, { txId, amount, method }, 'PaymentGateway');
      this.trackMetric('payment_success', 1, { method });
    } else {
      this.error(`Payment failed`, { txId, amount, method, error: errorMessage }, 'PaymentGateway');
      this.trackMetric('payment_error', 1, { method, reason: errorMessage || 'unknown' });
    }
  }

  getLogs() {
    return [...this.logs];
  }

  getMetrics() {
    return [...this.metrics];
  }
  
  getErrorRate() {
    if (this.logs.length === 0) return 0;
    const errors = this.logs.filter(l => l.level === 'error' || l.level === 'fatal').length;
    return (errors / this.logs.length) * 100;
  }
}

export const logger = new Logger();

// Seed some initial mock data
setTimeout(() => {
  logger.info('System initialization complete', { version: '1.0.4' }, 'System');
  logger.trackMetric('cpu_usage', 34);
  logger.trackMetric('memory_usage', 62);
  logger.trackBidEvent('MZ-123', 500000, true);
  logger.trackBidEvent('MZ-124', 25000, false, 'Insufficient wallet balance');
  logger.trackPaymentEvent('TX-8821', 100000, true, 'SADAD');
}, 1000);