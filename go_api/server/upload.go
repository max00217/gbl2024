package server

import (
	"crypto/rand"
	"encoding/base64"
	"github.com/gin-gonic/gin"
)

func generateRandomString(length int) string {
	rnd := make([]byte, length)
	rand.Read(rnd)
	return base64.URLEncoding.EncodeToString(rnd)
}

func generateRandomFilePath(ext string) string {
	rnd := generateRandomString(32)
	return rnd + "." + ext
}

func uploadFile(c *gin.Context) {
	f, _ := c.FormFile("file")
	if f.Size > 1024*1024*500 {
		c.JSON(400, gin.H{
			"error": "file size too big",
		})
		return
	}

	ext := f.Filename[len(f.Filename)-3:]
	generatedFileName := generateRandomFilePath(ext)
	c.SaveUploadedFile(f, "./upload/" + generatedFileName)
	c.JSON(200, gin.H{
		"success": true,
		"file":    generatedFileName,
	})
}
