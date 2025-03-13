add dòng này vào env
FIREBASE_CREDENTIALS=D:\A_FPI_MOBILE_APP\C_Panel\Laravel\BE_Cpanel\account_service.json(thay = đường dẫn đến file config của bạn)
php -v : PHP 8.0.28 (cli)
node -v : 20
CMD:

1. composer install
2. npm install
3. php artisan migrate:refresh
4. config lại db trong env

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cpanel
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_password

4. php artisan serve
5. chưa cần chạy FE.
