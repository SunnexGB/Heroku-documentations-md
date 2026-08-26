---
{"dg-publish":true,"permalink":"/extended-documentation/raw-handler/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Обработчик событий (Raw Handler)

`Raw handler` - функция, которая вызывается при каждом новом событии определённого типа, полученном диспатчером юзербота.  Является одним из типов, указанных в аргументах декоратора `@loader.raw_handler`. Функция получает объект события 

```python
from telethon.tl.types import UpdateUserStatus, UserStatusOnline, UserStatusOffline

@loader.raw_handler(UpdateUserStatus)
async def raw_handler(self, event: UpdateUserStatus):
    ...
```

## Пример (отслеживание онлайна)

```python
from telethon.tl.types import UpdateUserStatus, UserStatusOnline, UserStatusOffline

@loader.raw_handler(UpdateUserStatus)
async def raw_handler(self, event: UpdateUserStatus):
    if not self.config["raw_handler"]:
        return
    user_id = event.user_id
    if user_id in self.config["handler_targets"]:
        user = await self.client.get_entity(user_id)
        if isinstance(event.status, UserStatusOnline):
            status = "user_online"
        else:
            status = "user_offline"
        await self.client.send_message(
            "me",
            self.strings[status].format(
                telethon.utils.get_display_name(user) + f" ({user_id})",
            ),
        )
```

# Отличие от вотчеров

- `watcher` реагирует на сообщения (объекты `Message`)
- `raw_handler` реагирует на raw события любого типа из Telethon (объекты `Update*`, `UserStatus*` и т.д.)
# Импорт типов

Типы для raw_handler берутся из Telethon:

```python
from telethon.tl.types import UpdateUserStatus, UserStatusOnline, UserStatusOffline
from telethon.tl.types import UpdateNewMessage
from telethon.tl.types import UpdateChatParticipant
```

> [!info] Важно
> Импорты из `Telethon` берутся из `herokutl`. Юзербот на уровне загрузчика патчит импорты с `Telethon` на `herokutl`. Для универсальных модулей используйте `from telethon import ...`

---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Watchers\|Вотчеры]]
- [[Extended documentation/Loops\|Циклы]]
- [[Extended documentation/Decorators\|Декораторы]]
---

[[Extended documentation/Raw Handler\|<=]] [[Extended documentation/Home\|На главную]] [[Extended documentation/Lookup & Invoke\|=>]]
