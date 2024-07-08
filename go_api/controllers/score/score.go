package score

import (
	"time"

	"gbl-api/data"
	"gorm.io/gorm"
)

var userScores map[string]int
var userRank map[string]int
var lastScoresUpdate time.Time

func UpdateLastScoreChanged() {
	lastScoresUpdate = time.Now()
}

func IsUserParticipated(bid, uid string) (bool, error) {
	db := data.GetDatabase()
	var score Participation
	err := db.Where("bid = ? AND uid = ?", bid, uid).First(&score).Error
	if err == gorm.ErrRecordNotFound {
		return false, nil
	} else if err != nil {
		return false, err
	}
	return true, nil
}

func updateUserScores() {
	db := data.GetDatabase()
	var scores []Participation
	err := db.Find(&scores).Error
	if err != nil {
		return
	}

	userScores = make(map[string]int)
	userRank = make(map[string]int)
	for _, score := range scores {
		userScores[score.UID] += score.Score
	}

	for _, score := range scores {
		var rank int
		for _, otherScore := range scores {
			if otherScore.Score > score.Score {
				rank++
			}
		}
		userRank[score.UID] = rank
	}

	lastScoresUpdate = time.Now()
}

func GetTotalScore(uid string) (int, error) {
	if time.Now().Sub(lastScoresUpdate) > time.Second {
		updateUserScores()
	}

	score, ok := userScores[uid]
	if !ok {
		return 0, nil
	}
	return score, nil
}

func GetRank(uid string) (int, error) {
	if time.Now().Sub(lastScoresUpdate) > time.Second {
		updateUserScores()
	}

	rank, ok := userRank[uid]
	if !ok {
		return 0, nil
	}
	return rank, nil
}

func GetRanks() map[string]int {
	if time.Now().Sub(lastScoresUpdate) > time.Second {
		updateUserScores()
	}

	return userRank
}

func GetScores() map[string]int {
	if time.Now().Sub(lastScoresUpdate) > time.Second {
		updateUserScores()
	}

	return userScores
}

func GetUserScores(uid string) (map[string]int, error) {
	db := data.GetDatabase()
	var scores []Participation
	err := db.Where("uid = ?", uid).Find(&scores).Error
	if err != nil {
		return nil, err
	}

	userScores := make(map[string]int)
	for _, score := range scores {
		if _, ok := userScores[score.BID]; !ok {
			userScores[score.BID] = score.Score
		} else {
			userScores[score.BID] += score.Score
		}
	}

	return userScores, nil
}

func AddScore(bid, uid, pid string, score int) error {
	db := data.GetDatabase()
	return db.Create(&Participation{
		BID:   bid,
		UID:   uid,
		PID:   pid,
		Score: score,
	}).Error
}
