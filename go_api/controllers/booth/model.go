package booth

import "github.com/lib/pq"

type Booth struct {
	BID          string         `gorm:"column:bid" json:"bid"`
	Name         string         `json:"name"`
	Description  string         `json:"description"`
	Part         string         `json:"part"`
	Complexity   int            `json:"complexity"`
	VideoURL     string         `json:"video_url"`
	ThumbnailURL string         `json:"thumbnail_url"`
	ProblemOrder pq.StringArray `gorm:"type:text[]" json:"problem_order"`
	UIDs         pq.StringArray `gorm:"type:text[]" json:"uids"`
}

type BoothPassword struct {
	BID      string `gorm:"column:bid" json:"bid"`
	Password string `json:"password"`
}
