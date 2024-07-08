package booth

import (
	"math/rand"

	"gbl-api/data"
	"gorm.io/gorm"
)

func GetBooths() ([]Booth, error) {
	db := data.GetDatabase()
	var booths []Booth
	err := db.Find(&booths).Error
	return booths, err
}

func GetBooth(bid string) (Booth, error) {
	db := data.GetDatabase()
	var booth Booth
	err := db.Where("bid = ?", bid).First(&booth).Error
	return booth, err
}

func GetBoothIdByPassword(password string) (string, error) {
	db := data.GetDatabase()
	var boothPw BoothPassword
	err := db.Where("password = ?", password).First(&boothPw).Error
	if err == gorm.ErrRecordNotFound {
		return "", nil
	} else if err != nil {
		return "", err
	} else {
		return boothPw.BID, nil
	}
}

func DeleteBooth(bid string) error {
	db := data.GetDatabase()
	return db.Delete(&Booth{}, "bid = ?", bid).Error
}

func generateRandomString(n int) string {
	charSet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, n)
	for i := range b {
		b[i] = charSet[rand.Intn(len(charSet))]
	}

	return string(b)
}

func generateRandomBID() string {
	return generateRandomString(64)
}

func AddPassword(password string) error {
	db := data.GetDatabase()
	return db.Create(&BoothPassword{
		Password: password,
		BID:      generateRandomBID(),
	}).Error
}

func DeletePasswordByBID(bid string) error {
	db := data.GetDatabase()
	return db.Delete(&BoothPassword{}, "bid = ?", bid).Error
}

func AddUidToBooth(bid string, uid string) error {
	db := data.GetDatabase()
	var booth Booth
	err := db.Where("bid = ?", bid).First(&booth).Error
	if err != nil {
		return err
	}
	booth.UIDs = append(booth.UIDs, uid)
	return db.Where("bid = ?", bid).Save(&booth).Error
}

func SetComplexity(bid string, complexity int) error {
	db := data.GetDatabase()
	var booth Booth
	err := db.Where("bid = ?", bid).First(&booth).Error
	if err != nil {
		return err
	}
	booth.Complexity = complexity
	return db.Where("bid = ?", bid).Save(&booth).Error
}

func IsUidInBooth(bid string, uid string) (bool, error) {
	db := data.GetDatabase()
	var booth Booth
	err := db.Where("bid = ?", bid).First(&booth).Error
	if err != nil {
		return false, err
	}
	for _, u := range booth.UIDs {
		if u == uid {
			return true, nil
		}
	}
	return false, nil
}
