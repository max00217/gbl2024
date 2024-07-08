package config

import (
	"context"
	"gbl-api/config"
	"path/filepath"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var app *firebase.App

func SetupFirebase() {
	serviceAccountKeyFilePath, err := filepath.Abs(config.ServiceAccountKeyFilePath)
	if err != nil {
		panic("Unable to load serviceAccountKeys.json file")
	}

	opt := option.WithCredentialsFile(serviceAccountKeyFilePath)

	app, err = firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		panic("Firebase load error")
	}
}

func GetFirebaseApp() *firebase.App {
	if app == nil {
		SetupFirebase()
	}
	return app
}
