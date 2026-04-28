package models

import "time"

// PropertyStatus maps to Saudi Real Estate Exchange (Mooj) status codes
type PropertyStatus string

const (
	StatusActive  PropertyStatus = "active"
	StatusSold    PropertyStatus = "sold"
	StatusAuction PropertyStatus = "auction"
	StatusPending PropertyStatus = "pending"
)

// PropertyType maps to Mooj property classifications
type PropertyType string

const (
	TypeResidential PropertyType = "residential"
	TypeCommercial  PropertyType = "commercial"
	TypeLand        PropertyType = "land"
	TypeFarm        PropertyType = "farm"
)

// Property represents a real estate asset conforming to Mooj data standards.
// Bilingual fields (TitleAr/TitleEn) comply with Saudi national data policy.
type Property struct {
	ID        int64     `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`

	// Mooj / Deed information
	DeedNumber  string `json:"deedNumber"`  // رقم الصك
	PlanNumber  string `json:"planNumber"`  // رقم المخطط
	BlockNumber string `json:"blockNumber"` // رقم الحوض

	// Bilingual content (Arabic + English)
	TitleAr       string `json:"titleAr"`
	TitleEn       string `json:"titleEn"`
	DescriptionAr string `json:"descriptionAr"`
	DescriptionEn string `json:"descriptionEn"`

	// Location
	CityCode   string  `json:"cityCode"` // riyadh, jeddah, makkah, madinah, ...
	CityAr     string  `json:"cityAr"`
	CityEn     string  `json:"cityEn"`
	DistrictAr string  `json:"districtAr"`
	DistrictEn string  `json:"districtEn"`
	Latitude   float64 `json:"latitude"`
	Longitude  float64 `json:"longitude"`

	// Property details
	Type        PropertyType   `json:"type"`
	Status      PropertyStatus `json:"status"`
	AreaSqm     float64        `json:"areaSqm"`
	Bedrooms    int            `json:"bedrooms"`
	Bathrooms   int            `json:"bathrooms"`
	FloorNumber int            `json:"floorNumber"`
	TotalFloors int            `json:"totalFloors"`

	// Pricing (SAR)
	PriceTotal  float64 `json:"priceTotal"`
	PricePerSqm float64 `json:"pricePerSqm"`

	// Auction specific
	AuctionStart *time.Time `json:"auctionStart,omitempty"`
	AuctionEnd   *time.Time `json:"auctionEnd,omitempty"`
	StartingBid  *float64   `json:"startingBid,omitempty"`
	CurrentBid   *float64   `json:"currentBid,omitempty"`
	BidIncrement *float64   `json:"bidIncrement,omitempty"`

	// Media
	ImageURLs []string `json:"imageUrls"`
	VideoURL  string   `json:"videoUrl,omitempty"`

	// Metadata
	OwnerID    int64 `json:"ownerId"`
	IsFeatured bool  `json:"isFeatured"`
	ViewCount  int   `json:"viewCount"`
}

// PropertyListResponse is the paginated API response shape.
type PropertyListResponse struct {
	Data       []Property `json:"data"`
	Total      int        `json:"total"`
	Page       int        `json:"page"`
	PageSize   int        `json:"pageSize"`
	TotalPages int        `json:"totalPages"`
}
