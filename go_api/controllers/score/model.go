package score

type Participation struct {
	BID   string `gorm:"column:bid" json:"bid"`
	UID   string `gorm:"column:uid" json:"uid"`
	PID   string `gorm:"column:pid" json:"pid"`
	Score int    `json:"score"`
}
