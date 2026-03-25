# Museum Kiosk Web

Новый web-first проект музейного киоска без Electron.

## Что внутри

- один сайт для киоска
- единый backend API внутри Next.js
- Prisma + база данных
- загрузка изображений
- готовые разделы:
  - мероприятия
  - цены
  - экспозиции
  - режим работы
  - история парка
  - доступность
  - пушкинская карта

## Быстрый старт

1. Установить зависимости:

```bash
npm install -g pnpm
pnpm install
```

2. Скопировать env:

```bash
copy .env.example .env
```

На macOS/Linux:

```bash
cp .env.example .env
```

3. Сгенерировать Prisma client:

```bash
pnpm prisma generate
```

4. Создать локальную базу и таблицы:

```bash
pnpm db:push
```

5. Заполнить демо-данными:

```bash
pnpm seed
```

6. Запустить проект:

```bash
pnpm dev
```

Открыть:

```text
http://localhost:3000
```

## API

- `/api/health` — проверка сервиса
- `/api/bootstrap` — контент для киоска
- `/api/upload` — загрузка изображения
- `/uploads/...` — раздача загруженных файлов

## Где хранятся загрузки

По умолчанию в `.env.example` указано:

```env
UPLOAD_DIR="./uploads"
```

Для облака можно поменять на:

```env
UPLOAD_DIR="/data/uploads"
```

## Что делать дальше

- добавить `/admin`
- заменить SQLite на PostgreSQL
- привязать домен
- вынести деплой в Amvera
