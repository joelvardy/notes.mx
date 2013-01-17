# Notes

Basic note taking app built by [Joel Vardy] [1].

## Install

Setup config options in the `app/config` folder.

Ensure the `app/storage` folder is writable:

```bash
sudo chmod -R 777 app/storage
```

Run the composer install:

```bash
composer install
```

Run migrations:

```bash
php artisan migrate
```

# API

## User

### Create

 * Endpoint: **/user**
 * Method: **POST**
 * Data:
  * email
  * password
 * Response: **JSON**
  * status

### Read

 * Endpoint: **/user/{ID}**
 * Method: **GET**
 * Response: **JSON**
  * status
  * id
  * email
  * created_at
  * update_at

### Update

 * Endpoint: **/user/{ID}**
 * Method: **PUT**
 * Data:
  * password
 * Response: **JSON**
  * status

### Delete

 * Endpoint: **/user/{ID}**
 * Method: **DELETE**
 * Response: **JSON**
  * status

  [1]: http://joelvardy.com/