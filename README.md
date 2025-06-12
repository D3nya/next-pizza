# 🍕 Next Pizza

Next Pizza — это учебный e-commerce проект-демо, написанный на **Next.js 13 (App Router)** и TypeScript. Приложение показывает, как можно строить полноценный магазин с каталогом, фильтрами, корзиной, оформлением заказа, оплатой и авторизацией.

## Стек

- **Next.js 13** — SSR/SSG, маршрутизация App Router, серверные экшены
- **React 18**, **TypeScript**
- **Tailwind CSS** + shadcn/ui
- **Prisma ORM** + PostgreSQL
- **NextAuth.js** — аутентификация (email link)
- **Zustand** — глобальное состояние (корзина)
- ESLint, Prettier, Husky, Commitlint (Conventional Commits)
- Docker / Docker Compose (dev + prod)

## Быстрый старт

```bash
# 1. Клонируем репозиторий
$ git clone https://github.com/username/next-pizza.git
$ cd next-pizza

# 2. Устанавливаем зависимости
$ npm ci                     # или pnpm install / yarn install

# 3. Создаём файл окружения
$ cp .env.example .env        # и заполняем переменные

# 4. Поднимаем БД (PostgreSQL 17 в Docker)
$ docker compose up -d postgres

# 5. Применяем миграции и сидируем данные
$ npx prisma migrate dev      # миграции
$ npx prisma db seed          # сиды (пример меню, пользователь и т.п.)

# 6. Запускаем dev-сервер
$ npm run dev
```

Приложение будет доступно по адресу: <http://localhost:3000>

## Переменные окружения

```env
# PostgreSQL
POSTGRES_USER=pizza
POSTGRES_PASSWORD=secret
POSTGRES_DB=pizza_db
DATABASE_URL="postgresql://pizza:secret@localhost:5432/pizza_db"

# Аутентификация
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="Случайная_строка"

# SMTP для отправки ссылок подтверждения (пример для Yandex)
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=username@yandex.ru
SMTP_PASSWORD=app_password

# URL, куда платёжный провайдер шлёт callback
PAYMENT_CALLBACK_URL=http://localhost:3000/api/checkout/callback
```

Полный список переменных смотрите в `.env.example` (если файла нет — создайте по аналогии).

## Скрипты npm

| Скрипт           | Назначение                             |
| ---------------- | -------------------------------------- |
| `dev`            | Запуск локального dev-сервера          |
| `build`          | Прод-сборка Next.js                    |
| `start`          | Запуск собранного приложения           |
| `lint`           | Проверка ESLint                        |
| `format`         | Применить Prettier к файлам            |
| `prisma:migrate` | `prisma migrate deploy` для production |
| `prisma:studio`  | Открыть Prisma Studio                  |

## Docker

В репозитории есть готовый **Dockerfile** и **docker-compose.yaml**.

### Продакшн-сборка

```bash
# собираем и запускаем продакшн-контейнеры
$ docker compose --profile prod up -d --build
```

Будут подняты:

1. `postgres` — контейнер с БД
2. `nextjs` — оптимизированный standalone-build приложения

## База данных и Prisma

- Схема описана в `prisma/schema.prisma`.
- После изменения схемы запускайте:
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```
- Для просмотра / правки данных удобно пользоваться `npx prisma studio`.

## Тестовые данные

Сид скрипт (`prisma/seed.ts`) заполняет БД категориями, пиццами и тестовым пользователем. Запускается автоматически в dev-режиме или вручную командой `npm run seed` (см. скрипт в `package.json`).

## Линтинг и git-хуки

Husky подключает pre-commit и commit-msg хуки:

- `pre-commit` → `npm run lint` и `npm run format:check`
- `commit-msg` → проверка сообщений через Commitlint

## Архитектура

```
app/                # маршруты Next.js (App Router)
components/         # переиспользуемые UI/блоки
services/           # клиенты API, бизнес-логика
store/              # Zustand-сторы
prisma/             # схема, миграции, сиды
public/             # статические файлы (изображения, svg)
```

## Лицензия

Проект распространяется под лицензией MIT.
