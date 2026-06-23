# Claude Code — Frontend

## Стек
React + Phaser + TypeScript + Vite

## Команды
- `npm run dev`   — запуск локально
- `npm run build` — сборка
- `npm run lint`  — линтер
- `npm run test`  — тесты

## Структура
src/
├── scenes/      ← Phaser сцены
├── components/  ← React компоненты
├── store/       ← стейт
├── api/         ← запросы к бэкенду
├── hooks/       ← кастомные хуки
├── types/       ← TypeScript типы
└── assets/      ← подключённые ассеты

## Правила
- Компоненты только функциональные, без классов
- Все типы явные, any запрещён
- Phaser сцены не импортируют React напрямую
- Мобайл-first — минимум 44x44px для тапабельных зон
- Ветки от develop, называть feature/xxx или fix/xxx
- Коммиты: add / update / fix / delete