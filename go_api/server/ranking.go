package server

import (
	"gbl-api/controllers/score"
	"gbl-api/controllers/user"
	"github.com/gin-gonic/gin"
	"log"
	"sort"
)

type rankType struct {
	Name          string `json:"name"`
	Score         int    `json:"score"`
	LastBoothName string `json:"last_booth_name"`
}

func rankingList(c *gin.Context) {
	var ranks []rankType
	scores := score.GetScores()
	for uid, s := range scores {
		name, err := user.GetNameFromUID(uid)
		if err != nil {
			log.Println(err)
			c.JSON(500, gin.H{
				"message": "Internal Server Error",
			})
			return
		}

		lastBooth, err := user.GetLastBoothFromUID(uid)
		if err != nil {
			log.Println(err)
			c.JSON(500, gin.H{
				"message": "Internal Server Error",
			})
			return
		}

		ranks = append(ranks, rankType{
			Name:          name,
			Score:         s,
			LastBoothName: lastBooth,
		})
	}

	sort.Slice(ranks, func(i, j int) bool {
		return ranks[i].Score > ranks[j].Score
	})

	c.JSON(200, gin.H{
		"ranks": ranks,
	})
}
