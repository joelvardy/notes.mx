# Write [Secure Notes][notes]

I first built this project because I wanted to play around with JavaScript font end development.

Two years after I first built notes.mx I decided to revisit, here are some of the changes I've made:

 * Upgraded Laravel
 * Rebuilt the API
 * Wrote unit tests for API endpoints
 * Started using AngularJS for the front
 * Moved to using SCSS and minifying JavaScript with custom Gulp workflow
 * Stopped serving assets from a CDN (due to minifying and using SPDY on the server)

The project is however still using the [Stanford Javascript Crypto Library][sjcl] to provide client side encryption of notes.

If you go to [notes.mx][notes] you'll be able to see the thing in action.

## Install

 * Ensure the `app/storage` folder is writable:

```bash
chmod -R 777 app/storage
```

 * Ensure the details in the `app/config/` directory are correct.

 * Run the composer install:

```bash
composer install
```

 * Run migrations:

```bash
php artisan migrate
```

Project developed by [Joel Vardy][joelvardy].

  [notes]: https://notes.mx/
  [sjcl]: https://github.com/bitwiseshiftleft/sjcl
  [joelvardy]: https://joelvardy.com/
