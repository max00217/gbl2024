package data

import (
	"gbl-api/config"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func getSqliteDatabase() *gorm.DB {
	if config.SqliteMemory {
		db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}

		return db
	} else {
		db, err := gorm.Open(sqlite.Open(config.SqliteFilename), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}

		return db
	}
}
