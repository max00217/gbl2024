package config_test

import (
	"gbl-api/config"
	"testing"
)

func TestValidDBType(t *testing.T) {
	isValid := false
	validDBTypes := []string{"sqlite"}
	for _, dbType := range validDBTypes {
		if config.DbType == dbType {
			isValid = true
			break
		}
	}

	if !isValid {
		t.Errorf("Invalid DB_TYPE: %s", config.DbType)
	}
}
