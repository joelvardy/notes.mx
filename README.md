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

## API Authentication

Some API calls must pass a user ID and API key in the request headers, the headers are:
 * user-id
 * user-api-key

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
 * *Must pass API authentication*
 * Response: **JSON**
  * status
  * user_id
  * email
  * *notes*
  * created_at
  * update_at

*Only if the user has notes*

Each element in the notes array will contain:
 * note_id
 * text
 * created_at
 * update_at

### Update

 * Endpoint: **/user**
 * Method: **PUT**
 * *Must pass API authentication*
 * Data:
  * password
 * Response: **JSON**
  * status

## Note

### Save

 * Endpoint: **/note**
 * Method: **PUT**
 * *Must pass API authentication*
 * Data:
  * text
  * *note_id*
 * Response: **JSON**
  * status
  * note_id

*Not required if saving a new note*

### Read

 * Endpoint: **/note/{ID}**
 * Method: **GET**
 * *Must pass API authentication*
 * Response: **JSON**
  * status
  * note_id
  * text
  * created_at
  * update_at

### Delete

 * Endpoint: **/note/{ID}**
 * Method: **DELETE**
 * *Must pass API authentication*
 * Data:
  * note_id
 * Response: **JSON**
  * status

  [joelvardy]: http://joelvardy.com/