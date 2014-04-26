build:
	@npm install

clean:
	@rm -rf node_modules bower_components public .tmp

release:
	@make clean
	@make build

.PHONY: build clean release