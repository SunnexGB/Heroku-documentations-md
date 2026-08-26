---
{"dg-publish":true,"permalink":"/extended-documentation/quickstart/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Базовая структура модуля
Любой модуль начинается с:
- Лицензии
- Скоупов | Scopes
- Импорта зависимостей
- Инициализации импорта
- Класса модуля, обёрнутого декоратором
- Объявления базовых хендлеров
Все остальные действия проходят внутри класса модуля `@loader.tds`

# TYPE_CHECKING - импорт типов

`Module` и `Library` специально импортируются под `TYPE_CHECKING`. Loader ищет класс твоего модуля как первый попавшийся подкласс от `Module` через `vars(module).values()`. Если импортировать `Module` ДО объявления своего класса - loader найдёт сам `Module` раньше твоего класса, создаст пустой `Module()` и юзербот загрузит модуль как буквально нерабочую пустышку.

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..types import Module, Library
```

> [!warning] Важно
> Аннотации, использующие эти типы, надо оборачивать в строку:
> ```python
> tester_module: "Literal[False] | Module | Library" = self.lookup("TestMod")
> ```

>[!notice] Примечание
>Если метод не использует self.(что-то),то он должен быть объявлен как статический 
>(за исключением команд, вотчеров и других элементов, используемых Heroku)
# Документация по структуре

```python
def __init__(self): # Используеться для определения конфига и других статических констант
```

```python
async def client_ready(self, client, db): # Вызывается при инициализации модуля. Часто используется для запуска хендлеров, инициализации API и т. д.
```

```python
async def on_dlmod(self, client, db): # Вызываеться при загрузке модуля  и используеться для сбора статистики и для входа в нужные каналы
```

> [!warning] Важно
> `on_dlmod` вызывается ДО `client_ready`. Любой ошибки не прервёт загрузку модуля - будет только отправлено сообщение в логи с уровнем INFO

```python
async def on_unload(self): # Вызываеться при выгрузке модуля,нужен для остановки циклов,закрывает соеденения с API, в целом чтобы завершить процессы, которые требуют этого.
```

```python
async def testcmd(self, message: Message): # Обработчик команды,любой метод который заканчиваеться на cmd - будет являться командой(можно и без cmd на самом то деле)
```

```python
async def watcher(self, message: Message): # Следит за сообщениями и срабатывает на все события сообщений
```

# Перевод модуля через strings
Strings нужен для перевода. Вы можете создавать списки свои списки переводов, а `HerokuDynamicTranslate` автоматически прочитает этот перевод и применит его при необходимости.

```python
strings = {
	"name": "ModuleName",
	"hello": "holla by Sunnex <3"
}

strings_ru = {
	"hello": "Привет от Санекса"
}
```

далее просто вызываем наш перевод через `self`

```python
await utils.answer(message, self.strings("hello"))
```

> [!info] Note
> Подробнее о [[Extended documentation/Utils#Основные методы в utils\|utils.answer()]]

# База данных
Вы можете получить значение из базы данных или заменить его значением по умолчанию, если оно отсутствует вот так:

```python
self.get(key: str, default: Any = None)
```

Например:
```python
self.get("token")
self.get("token", False)
self.get("state", True)
```

Или вы можете записать значение в бд:
```python
self.set("token", None)
self.set("state", True)
```

# Указатель в базе данных (pointer)

`self.pointer(key, default)` - получить указатель на значение в базе данных. Если значение - `dict` или `list`, можно обращаться к нему напрямую через `pointer["key"]`. Изменения сразу сохраняются в базу.

```python
pointer = self.pointer("data", {})
pointer["count"] = 42  # автоматически сохранится в базу
pointer["items"] = [1, 2, 3]  # тоже автоматически
```

> [!warning] Важно
> Числовые ключи автоматически конвертируются в строковые. `1` и `"1"` - это один ключ. Указывайте в ключе только строки

> [!info] Note
> Подробнее о `self.set`, `self.get`, `self.pointer` - сокращения от `self.db.*(self.__class__.__name__, ...)` и т.д. Значения должны быть сериализуемыми в JSON

---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Quickstart Development\|Начало работы]] 
- [[Extended documentation/Utils\|Вспомогательные функции]] 
- [[Extended documentation/Decorators\|Декораторы]]
- [[Extended documentation/Libraries\|Импорт библиотек]]
- [[Extended documentation/Config\|Конфиг]]
- [[Extended documentation/Watchers\|Вотчеры]]
- [[Extended documentation/Loops\|Циклы]]
---

[[Extended documentation/Quickstart\|<= ]][[Extended documentation/Home\|На главную]][[Quickstart Development\| =>]]
