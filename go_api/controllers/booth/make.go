package booth

import "gbl-api/data"

func MakeBooth(b Booth) error {
	db := data.GetDatabase()
	return db.Create(&b).Error
}
