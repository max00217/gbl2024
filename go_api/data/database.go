package data

import (
	"gbl-api/config"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetDatabase() *gorm.DB {
	if db != nil {
		return db
	}

	switch config.DbType {
	case "sqlite":
		db = getSqliteDatabase()
	default:
		panic("Unknown database type")
	}

	return db
}
