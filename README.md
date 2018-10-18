# Kanban Board

## 1. Installation of environment

This project requires PHP 7.1.3 or higher and MySQL to be installed.
For PHP certain extensions are required:
  OpenSSL PHP Extension
  PDO PHP Extension
  Mbstring PHP Extension
  Tokenizer PHP Extension
  XML PHP Extension
  Ctype PHP Extension
  JSON PHP Extension

You will need Composer too.

## 2. Get Code

Once you setup environment clone project from GitHub https://github.com/StefanBeader/kanban-board.git

## 3. Run get Laravel files

After you get files go in project root folder and run composer install cmd
If that cmd don't create .env file make copy of .env.example from root folder and name it .env
Then run key:generate cmd, that will create application key.

## 4. Create DB and DB User
You will need new DB and User for this project.
After you create it enter parametars in .env file
Next run migrations with php artisan migrate cmd
You will get new Tables and Data in them.

## 5. Add site to hosts file

## 6. Run server 
If you followed all steps when you go to "/" route of site you should see application

## 7. Unit Test
For running tests use phpunit cmd
