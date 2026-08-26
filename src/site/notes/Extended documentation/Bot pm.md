---
{"dg-publish":true,"permalink":"/extended-documentation/bot-pm/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Работа в личных сообщениях бота

## bot_watcher
Если в вашем модуле определён метод `bot_watcher`, `InlineManager` будет автоматически вызывать его на **каждое** входящее сообщение боту.

```python
class MyMod(loader.Module):
    async def bot_watcher(self, message: "BotInlineMessage"):
        """Вызывается на каждое сообщение, отправленное боту в лс"""
        ...
```

> [!warning]
> `bot_watcher` вызывается для сообщений **от любого пользователя**, который напишет боту, а не только от владельца юзербота. Обязательно фильтруйте по `message.sender_id`, если хотите реагировать только на себя.

### Атрибуты `BotInlineMessage`

| Атрибут                         | Описание                                          |
| ------------------------------- | ------------------------------------------------- |
| `text` / `raw_text` / `message` | Текст сообщения                                   |
| `sender_id` / `from_user.id`    | ID отправителя                                    |
| `chat_id`                       | ID чата                                           |
| `id` / `message_id`             | ID сообщения                                      |
| `form`                          | Данные инлайн формы, если сообщение связано с ней |
> [!info] Note
> Атрибут `form` связан с [[Extended documentation/Inline#Инлайн формы\|инлайн формами]]
### Методы

```python
await message.answer(text: str, **kwargs)
```

Отправляет ответ в чат с ботом.

> [!info] Note
> Метод `answer` похож на [[Extended documentation/Utils#Основные методы в utils\|utils.answer()]], но используется для ответа в лс бота

## FSM (состояния диалога)

Часто одного `bot_watcher` недостаточно и для этого используется `self.inline.fsm` это внутренний словарь `{user_id: state}`.

## Справка:

```python
def set_fsm_state(
    self: "InlineManager",
    user: str | int,
    state: str | bool,
) -> bool:
    """
    Устанавливает состояние для пользователя.
    :param user: ID юзера
    :param state: Состояние (str). Передайте False, чтобы сбросить состояние.
    :return: True при успехе, инчае False
    """

def get_fsm_state(self: "InlineManager", user: str | int) -> bool | str:
    """
    Возвращает текущее состояние пользователя, либо False, если оно не установлено.
    """
```

> [!note]
> Короткие алиасы: `self.inline.ss` (`set_fsm_state`) и `self.inline.gs` (`get_fsm_state`).

## Пример:

```python
class BotPm(loader.Module):
    async def namecmd(self, message: Message):
        """Познакомиться с ботом"""
        self.inline.ss(message.sender_id, "await_name")
        await self.inline.bot.send_message(
            message.sender_id,
            "К-ка-к тебя зовут, котик? ~",
        )

    async def bot_watcher(self, message: "BotInlineMessage"):
        state = self.inline.gs(message.sender_id)

        if state == "await_name":
            name = message.text.strip()
            self.inline.ss(message.sender_id, False)  # сбрасываем состояние
            await message.answer(f"Приятно познакомиться, {name}!")
```

> [!info] Note
>  Метод `namecmd` использует декоратор команды из [[Extended documentation/Decorators#Команды и хендлеры\|Команды и хендлеры]]

# Вызов бота (self.inline.bot)

`self.inline.bot` - клиент бота. До Heroku 2.1.0+ (Hikka-вайбы) - Aiogram клиент, после - Telethon.
Через него можно работать напрямую от лица бота

# Генерация инлайн кнопок (generate_markup)

`generate_markup` - тот же парсер кнопок, что и для инлайн сообщений. Полезен, когда нужно отправить сообщение от имени бота с кнопками, созданными через удобный обработчик юзербота. (Разумеется ты можешь создавать свои кнопки через
 telethon-билдер Button и ловить его через сырой callback_handler для
каких-то более сложных задач. Но удобный генератор ведь легче :3)

```python
reply_markup = self.inline.generate_markup(
    [
        [
            {
                "text": "Да",
                "callback": self.callback_yes,
                "args": (arg1,),
            },
            {"text": "Нет", "callback": self.callback_no},
        ],
    ]
)

await self.inline.bot.send_message(
    self.tg_id,  # ID владельца юзербота
    "<b>Привет, это сообщение от бота</b>",
    reply_markup=reply_markup,
)
```

## Пример

```python
@loader.command(ru_doc="Пример отправки сообщения с кнопками от лица бота")
async def exmplnotify(self, message: Message):
    """Example of sending message with buttons from the bot"""
    reply_markup = self.inline.generate_markup(
        [
            [
                {
                    "text": "Да",
                    "callback": self.exmplnotify_yes,
                    "args": (await message.link(thread=True),),
                },
                {"text": "Нет", "callback": self.exmplnotify_no},
            ],
        ]
    )

    await self.inline.bot.send_message(
        self.tg_id,
        "<b>Привет, это тестовое сообщения от <code>TheBestExampleEver</code></b>",
        reply_markup=reply_markup,
    )
    await utils.answer(message, "Уведомление отправлено в личку с ботом")

async def exmplnotify_yes(self, call: BotInlineCall, source_message_link: str):
    await call.answer("Подтверждено!")
    await utils.answer(call, f"Готово! (из сообщения {source_message_link})")

async def exmplnotify_no(self, call: BotInlineCall):
    await call.answer("Отменено")
    await utils.answer(call, "Отменено юзером")
```

---

# Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Inline\| Инлайн]]
- [[Extended documentation/Decorators\|Декораторы]]
- [[Extended documentation/Utils\|Вспомогательные функции]] 
---

[[Extended documentation/Bot pm\|<=]] [[Extended documentation/Home\|На главную]] [[Extended documentation/Loops\|=>]]