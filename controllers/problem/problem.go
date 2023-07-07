package problem

import (
	"gbl-api/data"
)

func GetBoothProblems(bid string) ([]Problem, error) {
	var problems []Problem
	db := data.GetDatabase()

	err := db.Where("bid = ?", bid).Find(&problems).Error

	return problems, err
}

func MakeBoothProblems(bid string, problems []Problem) error {
	db := data.GetDatabase()

	err := removeOldProblems(bid)
	if err != nil {
		return err
	}

	for _, p := range problems {
		p.BID = bid
		err := db.Create(&p).Error
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
