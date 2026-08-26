---
{"dg-publish":true,"permalink":"/extended-documentation/utils/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Основные методы в utils

## Работа с сообщениями

`answer(message, response, *, reply_markup=None, **kwargs)` - Универсальный способ ответить на команду. Если команда была отправлена от вашего имени (с парой помарок), то сообщение будет отредактировано.
Если от другого пользователя - будет отправлено новое сообщение с ответом.
Если указан `reply_markup`, то будет отправлено новое сообщение с инлайн кнопками.
Всегда возвращает объект затронутого сообщения (редакт или отправленное)

- `message` - исходное сообщение (`Message`, `InlineCall` или `InlineMessage`)
- `response` - текст ответа `str` (строка)
- `reply_markup` - список инлайн кнопок (опционально)
- `**kwargs` - доп. параметры (например, `reply_markup`, `parse_mode` и т.п.)

> [!info] Важно
>  Больше о `reply_markup` можно узнать в разделе с [[Extended documentation/Inline#Form\|инлайн формами]]

```python
await utils.answer(message, "Hello")
```

---

`answer_file(message, file, caption=None, **kwargs)` - Отправляет файл в ответ на сообщение.

- `message` - исходное сообщение
- `file` - путь `str` (строка), байты, файловый объект или `InputDocument`
- `caption` - подпись к файлу (опционально)
- `**kwargs` - доп. параметры.

```python
await utils.answer_file(message, "/Heroku/ilove.pdf", caption="I <3 pdf")
```

`get_args_raw(message)`

- `message` - сообщение или `str`

```python
utils.get_args_raw(message)  # ".cmd привет мир" => "привет мир"
```

`get_args_html(message)`

- `message` - сообщение

```python
utils.get_args_html(message) # **Hello world** => <b>Hello world</b>
```

`get_args_int(message)`
Возвращает список аргументов, приведённых к `int`.
- `message` - сообщение или `str`

```python
utils.get_args_int(message)  # ".cmd 5 10" => [5, 10]
```

`get_args_bool(message)`
Возвращает список аргументов, приведённых к `bool`.
- `message` - сообщение или `str`

```python
utils.get_args_bool(message)  # ".cmd true false" => [True, False]
```

`get_user(message)`
Возвращает объект `User`.
- `message` - сообщение

```python
utils.get_user(message) # тут тоже есть аналог,но я забыв
```

`get_chat_id(message)`
Возвращает ID чата, откуда пришло сообщение.
- `message` — сообщение

```python
chat_id = utils.get_chat_id(message) # аналог m.chat_id
```

`get_message_link(message, chat=None)`
Возвращает ссылку на сообщение.
- `message` - сообщение
- `chat` - чат / канал

```python
utils.get_message_link(message) # аналогн r.link()
```

`has_media(message)`
Проверяет, содержит ли сообщение медиа (фото, видео и т.д.).
- `message` - сообщение

```python
if utils.has_media(message):
    ...
```

`get_topic(message)` / `get_topic_id(db, topic_name)`
- `get_topic(message)` - возвращает ID топика, из сообщения
- `get_topic_id(db, topic_name)` - находит ID топика по имени через `db` (из базы данных)

```python
utils.get_topic(message)
utils.get_topic_id(self.db, "Logs")
```

> [!note] Важно
> Параметр `db` в `get_topic_id` связан с [[Extended documentation/Quickstart#База данных\|методами работы с БД]]

## Текст и форматирование

`escape_html(text)`
Экранирует HTML теги в тексте.
- `text` - строка

```python
utils.escape_html("<script>alert(1)</script>") # => &lt;script&gt;alert(1)&lt;/script&gt;
```

`remove_html(text, escape=False, keep_emojis=False)`
Удаляет html из текста.
- `text` - строка
- `escape` - экранировать оставшийся текст после удаления тегов
- `keep_emojis` - сохранять эмодзи-разметку (кастомные эмодзи)

```python
utils.remove_html("<b>Привет</b>")  # "Привет"
```

`validate_html(text)`
Проверяет и чинит некорректный / незакрытый html.
- `text` - строка

```python
utils.validate_html("<b>тест")  # "<b>тест</b>"
```

`extract_urls(text)`
Извлекает все ссылки из текста.
- `text` - строка

```python
utils.extract_urls("Лучший канал с модулями https://t.me/H_SunMods и крутой автор https://t.me/who_my_queen")
```

`check_url(url)`
Проверяет доступность ссылки
- `url` - ссылка

```python
utils.check_url("https://example.com") # Возвращает bool | True или False
```

`resolve_domain(domain)`
Резолвит доменное имя в ip.
- `domain` - домен `str`

```python
utils.resolve_domain("example.com") # Вернет ip
```

`ascii_face()`
Возвращает случайную ASCII мордочку.

```python
utils.ascii_face()  # Вернет: "(ﾉ≧ڡ≦)"
```

## Сущности и чаты

`get_entity_id(entity)`
Возвращает ID сущности.
- `entity` - объекты по типу `User`, `Chat`, `Channel` и т.п.

```python
utils.get_entity_id(user)
```

`get_entity_url(entity, openmessage=False)`
Возвращает ссылку на сущность.
- `entity` - `User` или `Channel`

```python
utils.get_entity_url(user)
```

`get_link(user)`
Возвращает `tg://`  ссылку на пользователя / канал.
- `user` - объект `User` или `Channel`

```python
utils.get_link(user)
```

`asset_channel(client, title, description, *, channel=False, silent=False, archive=False, invite_bot=False, avatar=None, ttl=None, forum=False, hide_general=False)`
Создаёт или находит уже существующий чат / канал
- `client` - я хс инициализирует клиент
- `title` - название
- `description` - описание
- `channel` - создать канал вместо группы
- `silent` - без уведомления
- `archive` - сразу заархивировать
- `invite_bot` - пригласить инлайн бота
- `avatar` - путь к файлу аватара
- `ttl` - автоудаление сообщений (в секундах)
- `forum` - включить топики
- `hide_general` - скрыть General-топик

```python
await utils.asset_channel(
    self.client, "My playlist", "Hyperpop", channel=True, silent=True
) # Вернет (<herokutl.tl.types.Channel object at 0x7fd3550271c0>, True | False) 
```

> [!note] Важно
> `invite_bot` связан с [[Extended documentation/Inline#Инлайн формы\|инлайном]]

`asset_forum_topic(client, db, peer, title, description=None, icon_emoji_id=None, invite_bot=False)`
Создаёт топик  или находит существующий.
- `client` - я хс инициализирует клиент
- `db` -  база данных
- `peer` - чат / топик, где создать топик
- `title` - название топика
- `description` - описание (опционально)
- `icon_emoji_id` - ID кастомного эмодзи-иконки
- `invite_bot` - пригласить инлайн бота в топик

```python
await utils.asset_forum_topic(self.client, self.db, chat, "Comedy club my penis")
```

`invite_inline_bot(client, peer)`
Добавляет инлайн бота в указанный чат.
- `client` - Telegram-клиент
- `peer` - чат `ID`, `username`

```python
await utils.invite_inline_bot(self.client, chat_id)
```

`set_avatar(client, peer, avatar)`
Устанавливает аватар чату/каналу.
- `client` - я хс инициализирует клиент
- `peer` - чат / канал
- `avatar` - путь к файлу

```python
await utils.set_avatar(self.client, channel, "/tmp/avatar.png")
```

`dnd(client, peer, archive=True)`
Мутит уведомления чата 
- `client` - я хс инициализирует клиент
- `peer` - чат
- `archive` - заархивировать чат

```python
await utils.dnd(self.client, chat_id)
```
# Дополнительные методы которые могут понадобиться

- `get_ram_usage()` - текущее использование ram
- `get_cpu_usage()` - текущая загрузка cpu в процентах
- `get_disk_usage()` - использование диска, возвращает `dict`
- `get_network_interfaces()` - список сетевых интерфейсов, `dict`
- `get_hostname()` - имя хоста системы
- `get_ip_address()` - внешний IP-адрес
- `is_port_open(host, port)` - проверяет, открыт ли порт (`host: str`, `port: int`)
- `uptime()` - аптайм юзербота в секундах `int`
- `formatted_uptime()` - аптайм в человекочитаемом виде ("2д 5ч 13м")
- `get_platform_name()` / `get_platform_emoji()` / `get_named_platform()` / `get_named_platform_emoji()` -  Возвращает данные связанные с вашей платформой
- `uname()` - информация о системе.
- `get_git_hash()` - хэш текущего коммита, либо `False`
- `get_git_info()` -  ветка, коммит
- `get_git_status()` - статус git репо
- `get_commit_url()` - ссылка на текущий коммит на GitHub
- `get_commit_count()` - количество коммитов
- `get_last_commit_message()` - текст последнего коммита
- `get_version_raw()` - текущая версия юзербота
- `is_up_to_date()` - проверяет, актуальна ли установленная версия

`rand(size)`
Генерирует случайную строку заданной длины.
- `size` - длина строки (`int`)

```python
utils.rand(16) # => вернет например: jm7s3uo5f63m5jrs
```

`chunks(_list, n)`
Разбивает список на части по `n` элементов.
- `_list` - исходный список / множество / кортеж
- `n` - размер каждой части

```python
utils.chunks([1, 2, 3, 4, 5], 2)  # [[1, 2], [3, 4], [5]]
```

`merge(a, b, deep=True)`
Объединяет два словаря.
- `a`, `b` - словари для слияния 
- `deep` - рекурсивно сливать вложенные словари

```python
utils.merge({"x": {"y": 1}}, {"x": {"z": 2}})  # {"x": {"y": 1, "z": 2}}
```

`safe_getattr(obj, attr, default=None)`
Безопасный `getattr`, не бросающий исключение.
- `obj` - объект
- `attr` - имя атрибута `str`
- `default` - значение по умолчанию, если атрибута нет

```python
utils.safe_getattr(message, "some_attr", "нет данных")
```

`censor(obj, to_censor=None, replace_with="redacted_{count}_chars")`
Скрывает чувствительные данные (токены, пароли) в объекте перед логированием /выводом.
- `obj` - объект (строка, словарь и т.п.)
- `to_censor` - список ключей/подстрок, которые нужно скрыть (опционально)
- `replace_with` - шаблон замены

```python
utils.censor(config_dict, to_censor=["api_key", "token"]) # Если что есть валидаторы в конфиге,они работают по такому же принципу, это я добавил для других данных, мало ли.
```

`get_base_dir()` / `get_dir(mod)`
- `get_base_dir()` - возвращает базовую директорию юзербота 
- `get_dir(mod)` - возвращает путь к директории конкретного модуля (`mod: str`)

```python
utils.get_base_dir()
utils.get_dir("MyModule") # у меня они возвращают одинакувую директорию
```

`get_kwargs()`
Возвращает именованные аргументы (`**kwargs`), с которыми была вызвана функция. 

```python
def foo(a=1, b=2):
    utils.get_kwargs()  # {"a": 1, "b": 2}
```

# Плейсхолдеры

`get_placeholder(placeholder, data=None)`
Получить значение плейсхолдера.
- `placeholder` - имя плейсхолдера (`str`)
- `data` - контекстные данные для подстановки (опционально, `dict`)

```python
await utils.get_placeholder("name")
```

`get_placeholders(data, custom_message)`
Получить список плейсхолдеров, встречающихся в тексте.
- `data` - контекстные данные
- `custom_message` - текст, в котором ищутся плейсхолдеры

```python
utils.get_placeholders(data, "Прив {owner}")
```

`debug_placeholders()`
Показывает список плейсхолдеров для дебага.

```python
utils.debug_placeholders()
```

`help_placeholders(module_name, self)`
Возвращает док-стринги плейсхолдероа, для конкретного модуля.
- `module_name` - имя модуля `str`
- `self` - экземпляр модуля, для которого генерируется справка

```python
utils.help_placeholders("MyModule", self)
# Как пример вернет: => 
['<emoji document_id=5197195523794157505>▫️</emoji> {sp_duration} - Прогресс бар', '<emoji document_id=5197195523794157505>▫️</emoji> {sp_track} - Автор и песня']
```
---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Quickstart\|Основы разработки]]
- [[Extended documentation/Inline\|Инлайн]]
- [[Extended documentation/Bot pm\|Работа с ботом]]
- [[Extended documentation/Scopes\|Скоупы]]
- [[Extended documentation/Config\|Конфиг]]
- [[Extended documentation/Rich Message\|Rich Message]]
---

[[Extended documentation/Utils\|<=]] [[Extended documentation/Home\|На главную]] [[Extended documentation/Inline\|=>]]