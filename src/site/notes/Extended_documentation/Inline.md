---
{"dg-publish":true,"permalink":"/extended-documentation/inline/","dgEnableSearch":true,"dg-note-properties":{}}
---

# Инлайн формы
Для того чтобы создавать сообщения с инлайн кнопками, можно воспользоваться [Инлайн менеджером](https://github.com/coddrago/Heroku/blob/master/heroku/inline/form.py#L55):

```python
    async def form(
        self: "InlineManager",
        text: str,
        message: Message | int,
        reply_markup: HerokuReplyMarkup | None = None,
        *,
        force_me: bool = False,
        always_allow: list[int] | None = None,
        manual_security: bool = False,
        disable_security: bool = False,
        ttl: int | None = None,
        on_unload: Callable | None = None,
        photo: str | None = None,
        gif: str | None = None,
        file: str | None = None,
        mime_type: str | None = None,
        video: str | None = None,
        location: str | None = None,
        audio: dict | str | None = None,
        silent: bool = False,
    ) -> InlineMessage | bool:
        """
        Отправляет инлайн форму в  чат
        :param text: Содержимое инлайн формы. Поддерживается html и markdown.
        :param message: Куда отправить инлайн сообщение. Может быть `Message` или `int`
        :param reply_markup: Список кнопок. Словарь с ключами: text, callback
        :param force_me: Должны ли кнопки этой формы нажиматься только владельцем.
        :param always_allow: Пользователи, которым разрешено нажимать кнопки.
        :param ttl: Время, через которое форма будет выгружена. Выгрузка означает, что кнопки формы с инлайн-запросами и callback запросами станут неактивными, но url кнопки продолжат работать. Обратите внимание, что ttl не может превышать значение по умолчанию (1 день) и должен быть `int` или `False`.
        :param on_unload: Вызываемая при выгрузке и/или закрытии формы. Нужна для удаления мусора.
        :param manual_security: По умолчанию Heroku пытается унаследовать безопасность инлайн кнопок от вызывающего объекта (команды). Чтобы избежать этого, передайте `manual_security=True`.
        :param disable_security: По умолчанию Heroku пытается унаследовать безопасноть инлайн кнопок от вызывающего обьекта (команды). Чтобы избежать этого, передайте `disable_security=True`.
        :param photo: Передать фото в инлайн форму (должен быть raw-url)
        :param gif: Передать гиф в инлайн форму (должен быть raw-url)
        :param file: Передать файл в инлайн форму (должен быть raw-url)
        :param mime_type: Требуется, только если поле `file` не пустое. Должно быть 'application/pdf' или 'application/zip'.
        :param video: Передать видео в инлайн форму (должен быть raw-url)
        :param location: Передать гео в инлайн форму. Должен быть передан список/кортеж (широта, долгота). Пример: (55.749931, 48.742371).
⚠️ Если вы передаете этот параметр, в `text` необходимо передать пустую строку! ⚠️
        :param audio: Передать файл в инлайн форму (должен быть словарь или raw-url)
        :param silent: Отправить инлайн форму без звука(сообщения об открытии инлайн формы)
        :return: Если инлайн форма отправлена,то вернет :obj:`InlineMessage`, иначе `False`
        """
```

## Например:

```python
await self.inline.form(
    text="📊 Голосня Sunnex <3 vs. vkw.>#\n🌘 Sunnex <3: нет голосов\n😔 vkw.>#: нет голосов",
    message=message,
    reply_markup=[
        [
            {
                "text": "Sunnex <3",
                "callback": self.vote,
                "args": [False]
            }
        ],
        [
            {
                "text": "vkw.>#",
                "callback": self.vote,
                "args": [True]
            }
        ],
    ],
    force_me=False, # опционально: Разрешить доступ другим пользователям.
    always_allow=[659800858],  # опционально: Разрешить определеным юзерам по ID
    ttl=30, # опционально: Сколько секунд инлайн форма будет работоспособна
    silent=True, # опционально: Отправить безшумно
)
```

<div style="text-align: center"><img src="inline_form.png"/></div>

## Примеры кнопок:

```python
{
    "text": "Кнопка с функцией",
    "callback": self.callback_handler,
    "args": (arg1, ), # опционально: аргументы передающейся в callback
    "kwargs": {"arg1name": "arg1"}, # опционально: именованые аргументы передающейся в callback
}
```

## Кнопка с кастомным payload `(button_callback_handler)`:


```python
{
    "text": "Кнопка с кастомным payload",
    "data": "custom_payload",
}
```

## Кнопка с ссылкой:

```python
{
    "text": "Кнопка с ссылкой",
    "url": "https://example.com",
}
```

## Кнопка с возможность ввода значения:

```python
{
    "text": "Ввелите что то",
    "input": "Ввелите что то новое",
    "handler": self.input_handler,
    "args": (arg1, ), # опционально: аргументы передающейся в callback
    "kwargs": {"arg1name": "arg1"}, # опционально: именованые аргументы передающейся в callback
}
```

## Кнопки с готовыми действиями:

```python
{
    "text": "Закрыть инлайн форму",
    "action": "close",
}
```

```python
{
    "text": "Деактивировать инлайн форму",
    "action": "unload",
}
```

```python
{
    "text": "Скажи `Спасибо!`",
    "action": "answer",
    "text": "Нет.",
}
```

## Немного примеров кнопок

```python
{
    "text": "Вставить запрос в другом чате",
    "switch_inline_query": "tl",
    # вы получите что то типо @heroku_XXX_bot tl
}
```

```python
{
    "text": "Тоже самое что и выше,но только не нужно выбирать чат.",
    "switch_inline_query_current_chat": "tl",
    # вы получите что то типо @heroku_XXX_bot tl
}
```

```python
{
    "text": "Создаст инлайн запрос.",
    "input": True,
}
```

```python
{ 
	"text": "Открыть Web App", 
	"web_app": {"url": "https://your-webapp.com"}, 
}
```

```python
{
    "text": "Скопировать",
    "copy": "<3",
}
```

```python
{
    "text": "Цветная кнопка",
    "action": "close",
    "style": "danger", # Доступные стили: "danger", "primary", "success"
}
```

>[! warining] 
>В случае ошибки метод просто вернет `False`

# Галерея
Смотрите сюда [inline galleries](https://github.com/hikariatama/Hikka/blob/master/hikka/inline/gallery.py#L55)

```python
class Gallery(InlineUnit):
    async def gallery(
        self: "InlineManager",
        message: Message | int,
        next_handler: Callable | list[str],
        caption: list[str] | str | Callable = "",
        *,
        custom_buttons: HerokuReplyMarkup | None = None,
        force_me: bool = False,
        always_allow: list[int] | None = None,
        manual_security: bool = False,
        disable_security: bool = False,
        ttl: int | bool = False,
        on_unload: Callable | None = None,
        preload: bool | int = False,
        gif: bool = False,
        silent: bool = False,
        _reattempt: bool = False,
    ) -> bool | InlineMessage:
        """
        Отправляет инлайн галлерею в чат.
        :param caption: Подпись к фото.
        :param message: Куда отправить инлайн-сообщение. Может быть `Message` или `int`.
        :param next_handler: Callback функция, которая должна возвращать URL для следующего фото или список с URL фото.
        :param custom_buttons: Кастомные кнопки, добавляемые над стандартными.
        :param force_me: Должны ли кнопки этой формы нажиматься только владельцем.
        :param always_allow: Пользователи, которым разрешено нажимать кнопки.
        :param ttl: Время, через которое форма будет выгружена. Выгрузка означает, что кнопки формы с инлайн-запросами и callback запросами станут неактивными, но url кнопки продолжат работать. Обратите внимание, что ttl не может превышать значение по умолчанию (1 день) и должен быть `int` или `False`.
        :param on_unload: Вызываемая при выгрузке и/или закрытии формы. Нужна для удаления мусора.
        :param preload: Предзагружать ли фото галереи заранее. Если да - укажите порог загрузки. Используйте, если ваш callback слишком медленно грузит фото в реальном времени.
        :param gif: Будут ли использоваться gif в вашей инлайн галерее.
        :param manual_security: По умолчанию Heroku пытается унаследовать безопасность инлайн кнопок от вызывающего объекта (команды). Чтобы избежать этого, передайте `manual_security=True`.
        :param disable_security: По умолчанию Heroku пытается унаследовать безопасноть инлайн кнопок от вызывающего обьекта (команды). Чтобы избежать этого, передайте `disable_security=True`.
        :param silent:  Отправить инлайн форму без звука(сообщения об открытии инлайн формы)
        :return: Если инлайн форма отправлена,то вернет :obj:`InlineMessage`, иначе `False`
        """
```

## Пример:

```python
def generate_caption() -> str:
    return random.choice(["Да", "Нет"])

async def photo() -> str:
    return (await utils.run_sync(requests.get, "https://api.catboys.com/img")).json()["url"]

await self.inline.gallery(
    message=message,
    next_handler=photo,
    caption=generate_caption,
)
```

`generate_caption` - метод, который возвращает подпись, `photo` - Асинхронная функция, которая возвращает фото.
## Галереи для инлайн запросов(InlineQuery Galleries)
Чтобы позволить пользователю вызывать галереи через инлайн-запрос (@heroku_xxxxxx_bot), используйте [встроенный метод](https://github.com/coddrago/Heroku/blob/master/heroku/inline/form.py#L55)
## Справка:

```python
async def query_gallery(
    self,
    query: InlineQuery,
    items: List[dict],
    *,
    force_me: Optional[bool] = False,
    disable_security: Optional[bool] = False,
    always_allow: Optional[list] = None,
) -> bool:
    """
    Отвечает на инлайн запрос набором инлайн галерей.
    :param query: `InlineQuery` на который нужно ответить инлайн галереей
    :param items: ассив словарей с инлайн результатами.
                    Каждый словарь ОБЯЗАН содержать:
                        - `title` - Заголовок
                        - `description` - Описание
                        - `next_handler` - Инлайн хэндлер. Callback или awaitable
                    Каждый словарь МОЖЕТ содержать:
                        - `caption` - Подпись к фото. По умолчанию это `""`
                        - `force_me` - Должны ли кнопки этой формы нажиматься только владельцем. По умолчанию `False`
                        - `disable_security` - По умолчанию Heroku пытается унаследовать безопасноть инлайн кнопок от вызывающего обьекта (команды). Чтобы избежать этого, передайте `disable_security=True`.
    :param force_me: Должны ли кнопки этой формы нажиматься только владельцем.
    :param always_allow: Пользователи, которым разрешено нажимать кнопки.
    :param disable_security: По умолчанию Heroku пытается унаследовать безопасноть инлайн кнопок от вызывающего обьекта (команды). Чтобы избежать этого, передайте `disable_security=True`.
    :return: Статус ответа.
    """
```

## Например:

```python
async def catboy_inline_handler(self, query: InlineQuery):
    """Send Catboys"""
    await self.inline.query_gallery(
        query,
        [
            {
                "title": "🌘 Catboy",
                "description": "Send catboy photo",
                "next_handler": photo,
                "thumb_handler": photo, # Опционально
                "caption": lambda: f"<i>Enjoy! {utils.escape_html(utils.ascii_face())}</i>", # Опционально
                # Из-за ^ лямбды смайлик будет генерироваться заново при каждом переключении фото

               # "caption": f"<i>Enjoy! {utils.escape_html(utils.ascii_face())}</i>", # Если сделать без лямбды ^, он сгенерируется только один раз
            }
        ],
    )

```

> [!info] Важно
>  `utils.get_args_raw` описан в [[Extended_documentation/Utils#Работа с сообщениями\|Вспомогателных функциях]]
# Списки
Вы можете использовать [Инлайн списки](https://github.com/coddrago/Heroku/blob/master/heroku/inline/list.py#L38).

## Справка:

```python
async def list(
    self,
    message: Union[Message, int],
    strings: _List[str],
    *,
    force_me: Optional[bool] = False,
    always_allow: Optional[list] = None,
    manual_security: Optional[bool] = False,
    disable_security: Optional[bool] = False,
    ttl: Optional[Union[int, bool]] = False,
    on_unload: Optional[callable] = None,
    silent: Optional[bool] = False,
    custom_buttons: Optional[Union[_List[_List[dict]], _List[dict], dict]] = None,
) -> Union[bool, InlineMessage]:
    """
    Отправляет инлайн список в чат.
    :param message: Куда отправить список. Может быть `Message` или `int`.
    :param strings: Список строк, которые должны стать инлайн списком.
    :param force_me: Доступ к кнопкам списка только для владельца.
    :param always_allow: Разрешенные пользователи.
    :param ttl: Время работоспособности списка (до 1 дня), `int` или `False`.
    :param on_unload: Callback при выгрузке/закрытии.
    :param manual_security: Наследование настроек безопасности от вызывающей команды.
    :param disable_security: Отключить все проверки безопасности.
    :param silent: Беззвучная отправка.
    :param custom_buttons: Кастомные кнопки для добавления над стандартными.
    :return: Возвращает :obj:`InlineMessage`, если список отправлен, иначе `False`.
    """
```

## Например:

```python
async def meancmd(self, message: Message):
    """<термин> - Найти определение слова"""
    args = utils.get_args_raw(message)

    ...

    await self.inline.list(
        message,
        [self.strings("meaning").format(args, mean) for mean in means],
    )
```

> [!info] Важно
>  Метод `namecmd` использует декоратор команды из [[Extended_documentation/Decorators#Команды и хендлеры\|Команды и хендлеры]]

# Обработка нажатий на инлайн кнопки

```python
from ..inline.types import InlineCall
async def _process_click_ai(self, call: InlineCall, arg1: str):
    # Выполнение действий
```

Вы так же можете использовать:

```python
await call.unload()  # Выгрузить инлайн форму
await call.delete()  # Выгрузиь и удалить(сообщение)

await call.edit(
    text="Ваш новый текст",
    reply_markup=[
        [
            {
                "text": "Новая кнопка ><",
                "url": "https://example.com"
            }
        ]
    ],  # опционально: Change buttons in message. If not specified, buttons will be removed
    disable_web_page_preview=True, # опционально: Отключить предпросмотр ссылок
    always_allow=[659800858],
    force_me=False,
)

call.form # опционально: тут информация об инлайн форме
```

# Инлайн (@bot ...)

```python
from ..inline.types import InlineQuery

async def <name>_inline_handler(self, query: InlineQuery):
    # Обработка запроса.
```

Чтобы получить текст, введенный после вызова бота, используйте `query.args` вы сможете обернуть эти обработчики:
- `@loader.support`
- `@loader.sudo`
- `@loader.owner`
- `@loader.inline_everyone`

> [!note] Важно
> Эти декораторы описаны в [[Extended_documentation/Decorators#Разрешения для команд\|Декораторы]]

Полезные ответы:
- `await query.e400()` - Неверные аргументы
- `await query.e403()` - Недостаточно прав для доступа к ресурсу
- `await query.e404()` - Требуемый результат не найден
- `await query.e426()` - Необходимо обновление юзербота
- `await query.e500()` - Ошибка модуля. Смотри логи

# Инлайн запрос
Вам нужно вернуть словарь с ответом:

```python
{"message": "<b>Текст</b>", "title": "ответ"}
{"photo": "https://i.imgur.com/hZIyI7v.jpeg", "title": "Фото"}
{"video": "https://x0.at/wWN9.mp4", "title": "Видео"}
{"file": "https://x0.at/f7ps.pdf", "mime_type": "application/pdf", "title": "Документ"}
{"gif": "https://x0.at/Sey-.mp4", "title": "Гиф файл"}
```
---

## Связанные статьи

- [[Extended_documentation/Home\|Главная]]
- [[Extended_documentation/Utils\|Вспомогательные функции]]
- [[Extended_documentation/Decorators\|Декораторы]]
- [[Extended_documentation/Bot pm\|Работа с ботом]]
- [[Extended_documentation/Scopes\|Скоупы]]
- [[Extended_documentation/Config\|Конфиг]]
---

[[Extended_documentation/Inline\|<=]] [[Extended_documentation/Home\|На главную]] [[Extended_documentation/Rich Message\|=>]]