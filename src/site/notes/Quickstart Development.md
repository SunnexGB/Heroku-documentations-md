---
{"dg-publish":true,"permalink":"/quickstart-development/","dgEnableSearch":true,"dg-note-properties":{}}
---

# Как написать свой первый модуль

Давай глянем на базовую структуру:

```python
from herokutl.types import Message
from .. import loader, utils

@loader.tds
class MyModule(loader.Module):
    """Мой модуль"""
    strings = {"name": "MyModule", "hello": "Привет мир!"}
    strings_ru = {"hello": "Привет мир!"}
    strings_de = {"hello": "Hallo Welt!"}

    @loader.command(
        ru_doc="Привет мир!",
        de_doc="Hallo Welt!",
        # ...
    )
    async def helloworld(self, message: Message):
        """Hello world"""
        await utils.answer(message, self.strings["hello"])
```

Первая строка импортит тип `Message` из herokutl.types и модуль `loader` из `..`. В лоадере лежит всё необходимое для создания модуля.
`@loader.tds` - декоратор, который делает модуль переводимым (`tds` от `translateable_docstring`). В докстринге класса стоит кратко описать, что вообще делает твой модуль, чтобы любой, кто его читает, сразу врубился.
Словарь `strings` - это спецобъект с переводами строк. Суффикс с нужным языком позволяет юзать модуль на выбранном языке. Если перевода нет - подтянется дефолтный.
Декоратор `@loader.command` помечает функцию как команду. Принимает кучу аргументов, самые важные - переводы. `XX_doc` задаёт описание команды на языке XX.
`utils.answer` асинхронная функция-ответчик. Если сообщение можно отредачить - отредачит, иначе отправит новое. Всегда возвращает итоговое сообщение, так что можно снова его редачить в той же команде.

---

# Ватчер и теги команд

Теги - относительно свежая фича, которая продолжает развиваться. Юзаются для фильтрации команд и ватчеров. Пример использования:

```python
@loader.command(only_pm=True, only_photos=True, from_id=123456789)
async def mycommand(self, message: Message):
    ...
```

`only_pm` - команда работает только в личках. 
`only_photos` - только с фотками. 
`from_id` - только если сообщение прислал юзер с указанным ID.

## Полный список доступных тегов:

---

- `no_commands` - игнорить все команды юзербота в вотчере
- `only_commands` - ловить только команды юзербота в вотчере
- `out` - ловить только исходящие ивенты
- `in` - ловить только входящие ивенты
- `only_messages` - ловить только сообщения (не ивенты входа)
- `editable` - ловить только редактируемые сообщения (без форвардов и т.п.)
- `no_media` - ловить только сообщения без медиа и файлов
- `only_media` - ловить только сообщения с медиа и файлами
- `only_photos` - ловить только сообщения с фотками
- `only_videos` - ловить только сообщения с видосами
- `only_audios` - ловить только сообщения с аудио
- `only_docs` - ловить только сообщения с доками
- `only_stickers` - ловить только сообщения со стикерами
- `only_inline` - ловить только инлайн-запросы
- `only_channels` - ловить только сообщения из каналов
- `only_groups` - ловить только сообщения из групп
- `only_pm` - ловить только личку
- `no_pm` - не трогать личку
- `no_channels` - не трогать каналы
- `no_groups` - не трогать группы
- `no_inline` - не трогать инлайн
- `no_stickers` - не трогать стикеры
- `no_docs` - не трогать доки
- `no_audios` - не трогать аудио
- `no_videos` - не трогать видосы
- `no_photos` - не трогать фотки
- `no_forwards` - не трогать форварды
- `no_reply` - не трогать реплаи
- `no_mention` - не трогать упоминания
- `mention` - ловить только упоминания
- `only_reply` - ловить только реплаи
- `only_forwards` - ловить только форварды
- `startswith` - ловить сообщения, начинающиеся с заданного текста
- `endswith` - ловить сообщения, заканчивающиеся на заданный текст
- `contains` - ловить сообщения, содержащие заданный текст
- `regex` - ловить сообщения, подходящие под регулярку
- `filter` - ловить сообщения, прошедшие через заданную функцию-фильтр
- `from_id` - ловить сообщения только от конкретного юзера
- `chat_id` - ловить сообщения только из конкретного чата
- `thumb_url` - для инлайн-хендлеров, показывается в хелпе
- `alias` - задать один алиас для команды
- `aliases` - задать несколько алиасов для команды

---

# Валидаторы конфига

Валидаторы нужны для санитизации входящих данных конфига. Пример:

```python
@loader.tds
class MyModule(loader.Module):
    ...

    def __init__(self):
        self.config = loader.ModuleConfig(
            loader.ConfigValue(
                "task_delay",
                60,
                "Задержка между тасками в секундах",
                validator=loader.validators.Integer(minimum=0),
            ),
            loader.ConfigValue(
                "sleep_between_tasks",
                False,
                "Слипать между тасками вместо ожидания их завершения",
                validator=loader.validators.Boolean(),
            ),
            loader.ConfigValue(
                "tasks_to_run",
                [],
                "Таски для запуска",
                validator=loader.validators.MultiChoice(["task1", "task2", "task3"]),
            ),
        )
```

## Полный список валидаторов:

- `Boolean` - True или False
- `Integer` - целое число
- `Choice` - один из предложенных вариантов
- `MultiChoice` - один или несколько вариантов из списка
- `Series` - один или несколько вариантов (не из заданного списка)
- `Link` - валидная урла
- `String` - любая строка
- `RegExp` - строка, подходящая под регулярку
- `Float` - флоат
- `TelegramID` - Telegram ID
- `Union` - комбо из нескольких валидаторов (Integer или Float и т.п.)
- `NoneType` - None
- `Hidden` - топчик для токенов и прочих чувствительных данных
- `Emoji` - валидный эмодзи(-и)
- `EntityLike` - валидная энтити (юзер, чат, канал и т.п.) - ссылка, id или урл

### Можно написать свой валидатор. Для этого юзай базовый класс `Validator` (`heroku.loader.validators.Validator`):

```python
class Cat(Validator):
    def __init__(self):
        super().__init__(self._validate, {"en": "cat's name", "ru": "именем кошечки"})

    @staticmethod
    def _validate(value: typing.Any) -> str:
        if not isinstance(value, str):
            raise ValidationError("Имя кошки должно быть строкой")

        if value not in {"Mittens", "Fluffy", "Garfield"}:
            raise ValidationError("Такая кошка не разрешена")

        return f"Cat {value}"


...

loader.ConfigValue(
    "cat",
    "Mittens",
    "Имя кошки",
    validator=Cat(),
)
```

---

# Работа с базой данных

У Heroku есть встроенная БД. Можно юзать её для персистентного хранения данных, которые нужны модулю.
Первый способ - работать с объектом базы данных напрямую:

- `self._db.get(owner, value, default)`
- `self._db.set(owner, value, data)`
- `self._db.pointer(owner, value, default)`

Гораздо удобнее юзать обёртки:

- `self.db.get(value, default)`
- `self.db.set(value, data)`
- `self.db.pointer(value, default)`

`self.get` и `self.set` - всё понятно. А вот `self.pointer` чуть хитрее: возвращает указатель на значение в БД. Через него можно менять данные, не вызывая `self.set` каждый раз. Удобно, когда надо периодически добавлять/удалять айтемы из списка. Пример:

```python
self._users = self.pointer("users", [])
self._users.append("John")
self._users.extend(["Jane", "Joe", "Doe"])
self._users.remove("Doe")
```

```python
self._state = self.get("state", False)
self._state = not self._state
self.set("state", self._state)
```

---

# By SunnexGB