build:
	@npm install
	@./node_modules/.bin/bower install
	@mkdir public
	@mkdir public/partials
	@./node_modules/.bin/browserify ./app/client/scripts/index.js -o ./public/app.js
	@cp ./app/client/markup/index.html ./public/index.html
	@cp ./app/client/markup/partials/* ./public/partials/

clean:
	@rm -rf node_modules bower_components public

server-start:
	@./node_modules/.bin/forever start server.js

server-stop:
	@./node_modules/.bin/forever stop server.js

server-restart:
	@make server-stop
	@make server-start

.PHONY: build server-start server-stop