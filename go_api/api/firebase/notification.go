package firebase

import (
	"context"
	"firebase.google.com/go/messaging"
	fbConfig "gbl-api/api/firebase/config"
	"gbl-api/config"
	"log"
)

func SendNotification(title, body string) {
	app := fbConfig.GetFirebaseApp()

	ctx := context.Background()
	client, err := app.Messaging(ctx)
	if err != nil {
		log.Printf("error getting Messaging client: %v\n", err)
		return
	}

	message := &messaging.Message{
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
		Token: config.RegistriationToken,
	}

	response, err := client.Send(ctx, message)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println("Successfully sent message:", response)
}
