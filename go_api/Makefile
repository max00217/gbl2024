build:
	go build -o gbl-api gbl-api/cmd/gbl-api

run: build
	./gbl-api

test:
	go test -v ./...

clean:
	rm -f gbl-api
	rm -f *.db
	rm -f *.log
