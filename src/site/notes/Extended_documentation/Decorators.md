---
{"dg-publish":true,"permalink":"/extended-documentation/decorators/","dgEnableSearch":true,"dg-note-properties":{}}
---

# Декораторы
`@loader.tds` - динамически переводит команды и описание класса.
- `"_cmd_doc_commandname"` - переводит команду
- `"_ihandle_doc_handlername"` - перевод инлайн описания
- `"_cls_doc"` - переводит описание модуля

# Разрешения для команд
Например, для команды `.mute` вы можете задать права по умолчанию администраторам, умеющим банить пользователей. Для этого используются следующие декораторы:
- `@loader.owner`
- `@loader.sudo`
- `@loader.support`
- `@loader.group_owner`
- `@loader.group_admin_add_admins`
- `@loader.group_admin_change_info`
- `@loader.group_admin_ban_users`
- `@loader.group_admin_delete_messages`
- `@loader.group_admin_pin_messages`
- `@loader.group_admin_invite_users`
- `@loader.group_admin`
- `@loader.group_member`
- `@loader.pm`
- `@loader.unrestricted`
- `@loader.inline_everyone`

# Бесконечные циклы
`@loader.loop` _Пример:_

```python
def loop(
    interval: int = 5,
    autostart: Optional[bool] = False,
    wait_before: Optional[bool] = False,
    stop_clause: Optional[str] = None,
) -> FunctionType:
    """
	cоздаёт новый бесконечный цикл из метода класса.  
	  
	:param interval: Задержка между итерациями цикла (в секундах)  
	:param autostart: Запускать цикл сразу после загрузки модуля  
	:param wait_before: Вставлять задержку перед итерацией, а не после  
	:param stop_clause: Ключ базы данных, на основе которого работает цикл.  
	При запуске цикла ключ устанавливается в True,  
	а сам цикл останавливается, когда значение сбрасывается в False.  
	:attr status: Булево значение (True/False), описывающее, запущен ли цикл в данный момент.
    """
```

> [!info] Важно
> Подробнее об циклах в [[Extended_documentation/Loops\| Циклах]]

# Команды и хендлеры
Как и говорилось ранее, мы можем создавать команды, они закачиваться на `cmd`.
Мы можем добавлять обработчики команд для них:

```python
@loader.command()
async def test(...)
```


- `@loader.command()` - декоратор, помечающий метод как команду с именем, совпадающим с именем метода.
- `@loader.inline_handler()` - помечает [[Extended_documentation/Inline#Инлайн (@bot ...)\|инлайн хендлер]] (`@heroku_..._bot <method>`)
- `@loader.callback_handler()` - помечает callback хендлер (только для пользовательских [[Inline#Кнопка с кастомным payload `(button_callback_handler)`|кнопок с данными]], необходимо корректно обрабатывать события)
- `@loader.watcher()` - помечает вотчер. Их можно создавать несколько, главное нумеровать их (например `watcher`, `watcher1`, `watcher2`)

> [!info] Важно
> Подробнее о вотчерах в [[Extended_documentation/Watchers\|вотчерах]]
# Параметры которые можно передать в декоратор

`LanguageCode_doc` - нужен для перевода описания команды и записывается так:
`@loader.command(ru_doc="тут описание команды")`.

## Поддерживаемые языки

- 🇬🇧 English
- 🇷🇺 Русский
- 🇺🇦 Український
- 🇩🇪 Deutsch
- 🇯🇵 日本語

## Параметры для декоратора

- `no_commands` - игнорировать все команды юзербота в вотчере
- `only_commands` - захватывать только команды юзербота в вотчере
- `out` - захватывать только исходящие события
- `in` - захватывать только входящие события
- `only_messages` - захватывать только сообщения (без событий входа/выхода из чата)
- `editable` - захватывать только редактируемые сообщения (без пересланных и т. д.)
- `no_media` - захватывать только сообщения без медиафайлов и документов
- `only_media` - захватывать только сообщения с медиафайлами и документами
- `only_photos` - захватывать только сообщения с фотографиями
- `only_videos` - захватывать только сообщения с видео
- `only_audios` - захватывать только сообщения с аудиозаписями
- `only_docs` - захватывать только сообщения с документами
- `only_stickers` - захватывать только сообщения со стикерами
- `only_inline` - захватывать только сообщения с инлайн запросами
- `only_channels` - захватывать сообщения только из каналов
- `only_groups` - захватывать сообщения только из групп
- `only_pm` - захватывать сообщения только из личных сообщений
- `startswith` - захватывать только сообщения, начинающиеся с указанного текста
- `endswith` - захватывать только сообщения, заканчивающиеся на указанный текст
- `contains` - захватывать только сообщения, содержащие указанный текст
- `regex` - захватывать только сообщения, соответствующие регулярному выражению
- `func` - захватывать только сообщения, прошедшие проверку пользовательской функцией
- `from_id` - захватывать сообщения только от указанного пользователя
- `chat_id` - захватывать сообщения только из указанного чата

## Примеры:

```python
# Захватывает только исходящие сообщения в каналах, содержащие фотографии
@loader.watcher(out=True, only_channels=True, only_photos=True)

# Добавляет описание команды для русского языка, которую можно использовать только в личных сообщениях
@loader.command(ru_doc="тут описание команды", only_pm=True)
```
---

## Связанные статьи

- [[Extended_documentation/Home\|Главная]]
- [[Extended_documentation/Quickstart\|Основы разработки]]
- [[Extended_documentation/Inline\|Инлайн]]
- [[Extended_documentation/Bot pm\|Работа с ботом]]
- [[Extended_documentation/Watchers\|Вотчеры]]
- [[Extended_documentation/Loops\|Циклы]]
- [[Extended_documentation/Config\|Конфиг]]
---

[[Extended_documentation/Decorators\|<=]] [[Extended_documentation/Home\|На главную]] [[Extended_documentation/Watchers\|=>]]