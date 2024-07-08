package notification

import "gbl-api/data"

func GetNotifications() ([]Notification, error) {
	db := data.GetDatabase()
	var notifications []Notification
	err := db.Find(&notifications).Error
	return notifications, err
}

func AddNotification(n Notification) error {
	db := data.GetDatabase()
	err := db.Create(&n).Error
	return err
}
