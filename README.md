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

### Email Available

 * Endpoint: **/user/available**
 * Method: **POST**
 * Data:
  * email
 * Response: **JSON**
  * status

### Login

 * Endpoint: **/user/login**
 * Method: **POST**
 * Data:
  * email
  * password
 * Response: **JSON**
  * status
  * *user_id*
  * *api_key*

*If successfully authenticated*

### Authenticate

 * Endpoint: **/user/authenticate**
 * Method: **POST**
 * Data:
  * email
  * api_key
 * Response: **JSON**
  * status

### Read

 * Endpoint: **/user/{ID}**
 * Method: **GET**
 * Data:
  * email
  * api_key
 * Response: **JSON**
  * status
  * id
  * email
  * created_at
  * update_at

### Update

 * Endpoint: **/user**
 * Method: **PUT**
 * Data:
  * email
  * api_key
  * password
 * Response: **JSON**
  * status

  [1]: http://joelvardy.com/