Запуск базы данных postgres в отдельном контейнере

Для базы данных postgres мы будем использовать готовый официальный образ postgres с Docker Hub.
https://hub.docker.com/_/postgres
Также для проверки работоспособности возьмём образ adminer с Docker Hub.
https://hub.docker.com/_/adminer
Это позволит подключиться к базе данных после запуска контейнера.

Команды:
docker-compose up --build   создает контейнеры при необходимости перестроит существующие
docker-compose down  убивает группы контейнеры согласно файла  docker-compose.yml
docker-compose start/stop  запуск и остановка существующих групп контейнеров

docker-compose up --build --remove-orphans
Ключ remove-orphans нужен, потому что мы удалили контейнер adminer и Docker не знает,
переименовали мы контейнер или создали новый.