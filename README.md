# Notes

Basic note taking app built by [Joel Vardy][joelvardy].

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

### Email Available

 * Endpoint: **/user/available**
 * Method: **POST**
 * Data:
  * email
 * Response: **JSON**
  * status

### Create

 * Endpoint: **/user**
 * Method: **POST**
 * Data:
  * email
  * password
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

### Read

 * Endpoint: **/user**
 * Method: **GET**
 * Data:
  * user_id
  * api_key
 * Response: **JSON**
  * status
  * user_id
  * email
  * *notes*
   * note_id
   * text
   * created_at
   * update_at
  * created_at
  * update_at

*Only if the user has notes*

### Update

 * Endpoint: **/user**
 * Method: **PUT**
 * Data:
  * user_id
  * api_key
  * password
 * Response: **JSON**
  * status

## Note

### Save

 * Endpoint: **/note**
 * Method: **PUT**
 * Data:
  * user_id
  * api_key
  * text
  * *note_id*
 * Response: **JSON**
  * status
  * note_id

*Not required if saving a new note*

### Read

 * Endpoint: **/note/{ID}**
 * Method: **GET**
 * Data:
  * user_id
  * api_key
 * Response: **JSON**
  * status
  * note_id
  * text
  * created_at
  * update_at

  [joelvardy]: http://joelvardy.com/