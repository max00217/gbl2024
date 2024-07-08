package config_test

import (
	"gbl-api/config"
	"testing"
)

func TestServerSecurity(t *testing.T) {
	if config.DebugMode {
		if config.Hostname != "localhost" && config.Hostname != "127.0.0.1" {
			t.Errorf("Hostname is not localhost in DEBUG_MODE")
		}
	}
}
