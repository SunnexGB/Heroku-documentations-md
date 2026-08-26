---
{"dg-publish":true,"permalink":"/extended-documentation/watchers/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Вотчеры

Вотчер - функция, которая вызывается при каждом новом сообщении, полученным диспатчером юзербота, при условии что сообщение подходит под условия вотчера.

```python
@loader.watcher()
async def example_watcher(self, message: Message):
    ...
```

> [!info] Важно
> Вотчеров может быть несколько. Главное - нумеровать их (например, `watcher`, `watcher1`, `watcher2`)
## Пример

```python
@loader.watcher(no_commands=True)
async def example_watcher(self, message: Message):
    if not self.config["watcher"]:
        return

    if not hasattr(message, "message"):
        return

    if not message.message or not message.message.startswith("testwatcher"):
        return

    prefix = self.get_prefix()
    await message.reply(
            "Watcher from TheBestExampleEverMod is working!\n"
            "You can turn the watcher off in <code>{prefix}cfg TheBestExampleEverMod</code>".format(prefix=prefix)
        )
```

# Фильтры вотчера

Фильтры передаются как аргументы декоратора `@loader.watcher()` или `@loader.tag()`

> [!info] Важно
> Это все описано в [[Quickstart Development#Полный список доступных тегов \| начало работы]]

## Примеры комбинирования

```python
# Ловит только исходящие ивенты в каналах с фотографиями
@loader.watcher(out=True, only_channels=True, only_photos=True)
async def channel_photos(self, message: Message):
    ...

# Команда будет работать только в личных сообщениях
@loader.command(ru_doc="Описание", only_pm=True)
async def pmonly(self, message: Message):
    ...

# Реагирует на сообщения от конкретного юзера
@loader.watcher(in=True, from_id=123456789)
async def watch_user(self, message: Message):
    ...
```

---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Decorators\|Декораторы]]
- [[Extended documentation/Config\|Конфиг]]
- [[Extended documentation/Loops\| Циклы]]
---

[[Extended documentation/Watchers\|<=]] [[Extended documentation/Home\|На главную]] [[Extended documentation/Utils\|=>]]
