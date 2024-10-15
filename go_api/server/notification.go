package server

import (
	"gbl-api/api/firebase"
	"gbl-api/controllers/notification"
	"github.com/gin-gonic/gin"
	"time"
)

func notificationList(c *gin.Context) {
	notifications, err := notification.GetNotifications()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
	} else {
		c.JSON(200, gin.H{
			"notifications": notifications,
		})
	}
}

func notificationMake(c *gin.Context) {
	var n notification.Notification
	err := c.BindJSON(&n)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "Invalid request",
		})
		return
	}
	n.Time = time.Now().Format("2006-01-02 15:04:05")

	firebase.SendNotification(n.Title, n.Content)

	err = notification.AddNotification(n)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Internal server error",
		})
	} else {
		c.JSON(200, gin.H{
			"message": "Notification added",
		})
	}
}
