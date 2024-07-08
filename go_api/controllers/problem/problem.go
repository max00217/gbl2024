package problem

import (
	"gbl-api/controllers/booth"
	"gbl-api/data"
	"math/rand"
)

func GetBoothProblems(bid string) ([]Problem, error) {
	var problems []Problem
	db := data.GetDatabase()

	err := db.Where("bid = ?", bid).Find(&problems).Error

	return problems, err
}

func generateRandomString(n int) string {
	charSet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, n)
	for i := range b {
		b[i] = charSet[rand.Intn(len(charSet))]
	}

	return string(b)
}

func MakeBoothProblems(bid string, problems []Problem) error {
	db := data.GetDatabase()

	err := removeOldProblems(bid)
	if err != nil {
		return err
	}

	for _, p := range problems {
		p.PID = generateRandomString(64)
		p.BID = bid
		err := db.Create(&p).Error
		if err != nil {
			return err
		}

		var b booth.Booth
		err = db.Where("bid = ?", bid).First(&b).Error
		if err != nil {
			return err
		}

		b.ProblemOrder = append(b.ProblemOrder, p.PID)
		err = db.Where("bid = ?", bid).Save(&b).Error
		if err != nil {
			return err
		}
	}

	return nil
}

func removeOldProblems(bid string) error {
	db := data.GetDatabase()

	err := db.Where("bid = ?", bid).Delete(Problem{}).Error

	return err
}

func CheckAnswer(pid, answer string) int {
	var problem Problem
	db := data.GetDatabase()

	db.Where("pid = ?", pid).First(&problem)

	if problem.Answer == answer {
		return problem.Score
	}

	return 0
}
