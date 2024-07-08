package user

import (
	"gbl-api/controllers/booth"
	"gbl-api/controllers/score"
	"gbl-api/data"
)

func GetNameFromUID(uid string) (string, error) {
	var user User
	db := data.GetDatabase()
	err := db.Where("uid = ?", uid).First(&user).Error
	return user.Name, err
}

func GetLastBoothFromUID(uid string) (string, error) {
	var participation score.Participation
	db := data.GetDatabase()
	err := db.Where("uid = ?", uid).Last(&participation).Error
	if err != nil {
		return "", err
	}

	b, err := booth.GetBooth(participation.BID)
	if err != nil {
		return "", err
	}

	return b.Name, nil
}

func checkBoothVisited(b string, bs []string) bool {
	for _, booth := range bs {
		if booth == b {
			return true
		}
	}
	return false
}

func GetBoothHistoryFromUID(uid string) ([]string, error) {
	var participations []score.Participation
	db := data.GetDatabase()
	err := db.Where("uid = ?", uid).Find(&participations).Error
	if err != nil {
		return nil, err
	}

	var history []string
	for _, participation := range participations {
		b, err := booth.GetBooth(participation.BID)
		if err != nil {
			return nil, err
		}

		if !checkBoothVisited(b.Name, history) {
			history = append(history, b.Name)
		}
	}

	return history, nil
}
