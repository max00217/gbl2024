package server

import (
	"gbl-api/controllers/booth"
	"gbl-api/controllers/score"
	"gbl-api/controllers/user"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"log"
	"time"
)

func authLogin(c *gin.Context) {
	var u user.User
	err := c.BindJSON(&u)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	if user.IsUserExist(u.UID) {
		u = user.GetUser(u.UID)
		c.JSON(200, gin.H{
			"message": "Login success",
			"type":    u.Type,
		})
	} else {
		c.JSON(404, gin.H{
			"message": "User not found",
		})
	}
}

func authRegister(c *gin.Context) {
	var u user.User
	err := c.BindJSON(&u)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	err = user.RegisterUser(u)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Register success",
	})
}

type historyType struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

func userInfo(c *gin.Context) {
	uid := c.Param("uid")
	totalScore, err := score.GetTotalScore(uid)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	rank, err := score.GetRank(uid)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	boothScores, err := score.GetUserScores(uid)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	var history []historyType
	for k, v := range boothScores {
		b, err := booth.GetBooth(k)
		if err != nil {
			log.Println(err)
			c.JSON(500, gin.H{
				"message": "Internal server error",
			})
			return
		}

		history = append(history, historyType{
			Name:  b.Name,
			Score: v,
		})
	}

	c.JSON(200, gin.H{
		"total_score": totalScore,
		"now_rank":    rank,
		"history":     history,
		"time":        time.Now().Format("2006-01-02 15:04:05"),
	})
}

func authBoothAdmin(c *gin.Context) {
	var boothPw booth.BoothPassword
	err := c.BindJSON(&boothPw)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	bid, err := booth.GetBoothIdByPassword(boothPw.Password)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
	} else if bid == "" {
		c.JSON(404, gin.H{
			"message": "Booth not found",
		})
	} else {
		_, err := booth.GetBooth(bid)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(200, gin.H{
					"bid":        bid,
					"is_created": false,
				})
			} else {
				log.Println(err)
				c.JSON(500, gin.H{
					"message": "Internal server error",
				})
			}
		} else {
			c.JSON(200, gin.H{
				"bid":        bid,
				"is_created": true,
			})
		}
	}
}
