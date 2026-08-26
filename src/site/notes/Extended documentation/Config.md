---
{"dg-publish":true,"permalink":"/extended-documentation/config/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

Конфиг модуля регистрируется в `__init__` через `loader.ModuleConfig`. Каждая опция - это `loader.ConfigValue`.

# Структура ConfigValue

```python
loader.ConfigValue(
    option="option_name", # имя опции, по которому к ней обращаются через self.config["option_name"]
    default=42, # значение по умолчанию
    doc="Описание опции", # отображается в меню конфига
    validator=loader.validators.Integer(), # валидатор значения
    on_change=self._on_change, # callback при изменении (опционально)
)
```

> [!info] Важно
> Посмотреть разные виды валидаторов вы можете в [[Quickstart Development#Валидаторы конфига\| Начало работы]]

## Примеры

```python
# Булево значение
loader.ConfigValue(
    "watcher_enabled",
    True,
    "Should watcher be running?",
    validator=loader.validators.Boolean(),
)

# Целое число с ограничениями
loader.ConfigValue(
    "limit",
    10,
    "Max items",
    validator=loader.validators.Integer(minimum=1, maximum=100),
)

# Скрывает конифиг
loader.ConfigValue(
    "api_key",
    "",
    "API Key",
    validator=loader.validators.Hidden(
        loader.validators.String(),
    ),
)

# Список чисел от 0 до 42
loader.ConfigValue(
    "list_example",
    [1, 2, 3],
    "Example list",
    validator=loader.validators.Series(
        loader.validators.Integer(minimum=0, maximum=42)
    ),
)
```

> [!warning] Важно
> list/dict опции нельзя редактировать напрямую через `append`, `update` и т.д. Оно не пройдёт через `__setitem__`, поэтому не сохранится и не вызовет `on_change`. Переприсваивайте целиком:
> ```python
> self.config["list_example"] = self.config["list_example"] + [4]
> ```

# on_change 

Параметр `on_change` в `ConfigValue` указывает функцию, которая вызывается при изменении опции. Функция не получает аргументов.

```python
def __init__(self):
    self.config = loader.ModuleConfig(
        loader.ConfigValue(
            "option",
            42,
            "Some option",
            validator=loader.validators.Integer(),
            on_change=self._on_config_change,
        ),
    )

async def _on_config_change(self):
    # функция вызывается при изменении любой опции с on_change=self._on_config_change
    value = self.config["option"]
    await self.client.send_message("me", f"Config changed to {value}")
```

> [!info] Важно
> `on_change` может быть асинхронной или синхронной функцией.

---

# Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Quickstart\|Основы разработки]]
- [[Extended documentation/Scopes\|Скоупы]]
- [[Extended documentation/Config\|Конфиг]]
---

[[Extended documentation/Scopes\|<=]] [[Extended documentation/Home\| На главную]] [[Extended documentation/Libraries\|=>]]