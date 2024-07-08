package user

type User struct {
	UID          string `gorm:"column:uid" json:"uid"`
	Name         string `json:"name"`
	ProfileImage string `json:"profile_image"`
	Type         string `json:"type"`
}
