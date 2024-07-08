package user

import "gbl-api/data"

func isUserExist(u User) bool {
	db := data.GetDatabase()
	var count int64
	db.Model(&User{}).Where("uid = ?", u.UID).Count(&count)
	return count > 0
}

func RegisterUser(u User) error {
	if isUserExist(u) {
		return nil
	}

	db := data.GetDatabase()
	db.Create(&u)
	return nil
}
