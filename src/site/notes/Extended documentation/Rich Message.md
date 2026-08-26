---
{"dg-publish":true,"permalink":"/extended-documentation/rich-message/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Rich Message

> [!info] Перед началом
> Я дал базу которую нужно знать, ниже будут представлены примеры для работы с голыми объектами, просто в ознакомительных целях, так же тут могут быть разного рода ошибки, но я старался все проверять.
# Отправка Rich Message

## send_rich_message

```python
async def send_rich_message(
    self,
    chat_id,
    html: str | None = None,
    *,
    markdown: str | None = None,
    rich_message=None,
    reply_markup=None,
    message_thread_id: int | None = None,
    disable_notification: bool | None = None,
):
    """
    :param chat_id: Куда отправить инлайн сообщение. Может быть `Message` или `int`
    :param html: html разметка rich message
    :param markdown: Markdown разметка rich message. Альтернатива html
    :param rich_message: Готовый объект `InputRichMessageHTML` или `InputRichMessageMarkdown`
    :param reply_markup: Список инлайн кнопок
    :param message_thread_id: ID топика
    :param disable_notification: Отправить без звука
    """
```

## send_message (альтернатива)

Вы так же можете отправлять `rich_message`, через `send_message`

```python
await self.inline.bot.send_message(
    chat_id,
    rich_message="<b>Текст</b>", # тут ваг текст в html
)
```


## utils.answer(еще 1 альтернатива)

`utils.answer` поддерживает параметр `rich_message`:

```python
from ..inline import utils
await utils.answer(message, rich_message="<b>Текст</b>")
```

> [!info] Примечание
> Для объектов `InlineMessage` / `InlineCall` rich message редактируется, для обычных сообщений - отправляется новое

# Редактирование Rich Message

## edit_rich_message

Для редактирования `rich message` используется метод `edit_rich_message`:

```python
async def edit_rich_message(
    self,
    html: str | None = None,
    *,
    markdown: str | None = None,
    rich_message=None,
    inline_message_id=None,
    chat_id=None,
    message_id=None,
    reply_markup=None,
):
    """
    :param html: html разметка rich message
    :param markdown: Markdown разметка rich message. Альтернатива html
    :param rich_message: Готовый объект `InputRichMessageHTML` или `InputRichMessageMarkdown`
    :param inline_message_id: ID инлайн сообщения
    :param chat_id: ID чата
    :param message_id: ID сообщения
    :param reply_markup: Список инлайн кнопок
    """
```

# Работа с Rich Message в инлайне

```python
async def rich_article( # InlineQuery.rich_article
    self,
    title: str,
    *,
    html: str | None = None,
    markdown: str | None = None,
    rich_message=None,
    description: str | None = None,
    id: str | None = None,
    buttons=None,
):
    """
    :param title: Заголовок (обязательный)
    :param html:  html разметка rich message
    :param markdown: Markdown разметка rich message. Альтернатива html
    :param rich_message: Готовый объект `InputRichMessageHTML` или `InputRichMessageMarkdown`
    :param description: Описание (опционально)
    :param id: ID результата (опционально)
    :param buttons: Список инлайн кнопок (опционально)
    """
```

# Конвертация (parse and unpare)

`utils.rich_message_to_html(rich_message)` - конвертирует `rich message` обратно в html. 

```python
from ..utils.rich import rich_message_to_html # обрабатывает все типы рич блоков(обьектов)
```

# Работа с блоками Rich Message

## Список импортов для работы с ними

### Текст

```python
from ..utils.rich import (
    TextBold, # жирный
    TextItalic, # курсив
    TextUnderline, # дальше сами
    TextStrike,
    TextFixed,
    TextSubscript,
    TextSuperscript,
    TextMarked,
    TextSpoiler,
)
```

### Линкинг

```python
from ..utils.rich import (
    TextUrl,
    TextEmail,
    TextPhone,
    TextMentionName,
    TextMention,
    TextHashtag,
    TextBotCommand,
)
```

### Блочное форматирование

```python
from ..utils.rich import (
    TextCode, # mono (моно как бы тоже относиться к этому типу)
    TextCodeBlock, #code block
    TextQuote, # quote 
)
```

# Другие импорты

```python
from ..utils.rich import TextCustomEmoji # Кастомные эмодзи
from ..utils.rich import TextAlign # позиционирование
from ..utils.rich import TextMediaSpoiler # работа со спойлерами
from ..utils.rich import TextEmpty, TextPlain # пустой и обычный текст
```

> [!warning] Важно
> `TextConcat` используется для объединения нескольких Text* элементов в один rich message

---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Inline\| Инлайн]]
- [[Extended documentation/Utils\|Вспомогательные функции]] 
- [[Extended documentation/Bot pm\| Работа с ботом]]
- [[Config \| Конфиг]]
---

[[Extended documentation/Rich Message\|<=]] [[Extended documentation/Home\|На главную]] [[Extended documentation/Bot pm\|=>]]