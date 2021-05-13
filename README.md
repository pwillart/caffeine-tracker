# Caffeine tracker

# Installation

1. Clone this repo

```
git clone https://github.com/pwillart/caffeine-tracker.git
```

2. Install composer and npm packages

```
cd caffeine-tracker
$ composer install
$ npm install
```

3. Create and setup .env file

```
make a copy of .env.example
$ copy .env.example .env
$ php artisan key:generate
put database credentials in .env file
$ php artisan jwt:secret
```

4. Migrate and insert records

```
$ php artisan migrate
$ php artisan db:seed
```

Patrick Willart

[patrick@what-about-pat.com](mailto:patrick@what-about-pat.com)
