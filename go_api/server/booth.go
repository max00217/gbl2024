package server

import (
	"log"

	"gbl-api/controllers/booth"
	"github.com/gin-gonic/gin"
)

func makeBooth(c *gin.Context) {
	var b booth.Booth
	err := c.BindJSON(&b)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	err = booth.MakeBooth(b)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "ok",
	})
}

func getBooths(c *gin.Context) {
	booths, err := booth.GetBooths()
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}
	c.JSON(200, gin.H{
		"boothlist": booths,
	})
}

func getBooth(c *gin.Context) {
	bid := c.Param("bid")
	b, err := booth.GetBooth(bid)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "Booth not found",
		})
		return
	}
	c.JSON(200, b)
}

type checkBoothRequest struct {
	BID string `json:"bid"`
	UID string `json:"uid"`
}

func checkBooth(c *gin.Context) {
	var req checkBoothRequest
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	p, err := booth.IsUidInBooth(req.BID, req.UID)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	if p {
		c.JSON(200, gin.H{
			"participate": true,
		})
	} else {
		c.JSON(200, gin.H{
			"participate": false,
		})
	}
}

func deleteBooth(c *gin.Context) {
	bid := c.Param("bid")

	err := booth.DeleteBooth(bid)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "ok",
	})
}

func deleteBoothUser(c *gin.Context) {
	bid := c.Param("bid")

	err1 := booth.DeleteBooth(bid)
	err2 := booth.DeletePasswordByBID(bid)
	if err1 != nil || err2 != nil {
		log.Println(err1, err2)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}
}

func makeBoothUser(c *gin.Context) {
	type Request struct {
		Password string `json:"password"`
	}

	var req Request
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	err = booth.AddPassword(req.Password)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "ok",
	})
}

type addUserReq struct {
	UID string `json:"uid"`
	BID string `json:"bid"`
}

func addUser(c *gin.Context) {
	var req addUserReq
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	err = booth.AddUidToBooth(req.BID, req.UID)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "ok",
	})
}

func setComplexity(c *gin.Context) {
	type Request struct {
		BID        string `json:"bid"`
		Complexity int    `json:"complexity"`
	}

	var req Request
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}

	err = booth.SetComplexity(req.BID, req.Complexity)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "ok",
	})
}
