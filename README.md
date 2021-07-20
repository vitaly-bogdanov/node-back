1. sudo docker-compose up - поднять бд
2. yarn prisma migrate dev - миграции
3. yarn seed - faker данные для бд
4. yarn dev - запустить

- все связи в бд сделанны как необязательные
- поле адрес сделанно как ссылка на таблицу с данными адреса
- postgres - в докере
- http://localhost:2114/api-docs - swagger
- архитектуру rails/laravel-like поменял на nest/angular-like, но все файлы и старый код оставил