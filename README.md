[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Requirements
- Ruby 3.0.1
- PostgreSQL
- NodeJS
- yarn
- foreman

# Running the application
```
bin/setup
foreman start -f Procfile.dev
```

# Running tests
```
bundle exec rspec
```
