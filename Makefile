default:
	env=cjs ./bin/condilation test/fixture.txt test/fixture-cjs.txt -f
	env=meteor ./bin/condilation test/fixture.txt test/fixture-meteor.txt -f
	env=globals ./bin/condilation test/fixture.txt test/fixture-globals.txt -f

test:
	./node_modules/.bin/mocha test/*.js

test.coverage:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha
	@cd coverage/lcov-report && python -m SimpleHTTPServer 8080

.PHONY: test