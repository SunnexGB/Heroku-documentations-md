---
{"dg-publish":true,"permalink":"/extended-documentation/lookup-and-invoke/","dgEnableSearch":true,"dg-note-properties":{}}
---

# Lookup

`self.lookup(name)` - метод, возвращающий объект класса активного модуля или библиотеки по имени. Позволяет получить доступ к `self` другого модуля, вызывать его функции, получать данные и т.д.

## Пример

```python
tester_module: "Literal[False] | Module | Library" = self.lookup("TestMod")

if tester_module is not False:
    log_level = tester_module.config["tglog_level"]
else:
    log_level = 0
# Вот что возвращает модуль:
# Объект модуля/библиотеки - если найден
# False - если модуль не загружен(ну не найден)
```

> [!warning] Важно
> Аннотация в кавычках (`"Literal[False] | Module | Library"`) обязательна. Module и Library импортируются под `TYPE_CHECKING`, чтобы loader не нашёл их раньше твоего класса. Подробнее об этом - в [[Extended_documentation/Quickstart#TYPE_CHECKING - импорт типов\|основаях разработки]]

---

# Invoke

`self.invoke(command, args=None, *, peer=None, message=None, edit=False)` - вызывает команду по её имени, как будто её реально ввели в чат.

## Параметры

| Параметр  | Описание                                                    |
| --------- | ----------------------------------------------------------- |
| `command` | Имя команды (без точки), например `"ping"`                  |
| `args`    | Аргументы                                                   |
| `peer`    | Куда отправить. Если не указан - отправляется в текущий чат |
| `message` | Наше существующее сообщение                                 |
| `edit`    | Если True - редактирует `message`, иначе отправляет новое   |

## Примеры

```python
# Отправит .ping самому себе
await self.invoke("ping", peer=self.tg_id)

# Отправит .help -c
await self.invoke("help", "-c", peer="me")
```

> [!warning] Важно
> Команда должна быть в `self.allmodules.commands` (то есть модуль с этой командой должен быть загружен), иначе будет `ValueError`

---

## Связанные статьи

- [[Extended_documentation/Home\|Главная]]
- [[Extended_documentation/Quickstart\|Основы разработки]]
- [[Extended_documentation/Config\|Конфиг]]
- [[Libraries \| Импорт библиотек]]
---


[[Extended_documentation/Lookup & Invoke\|<=]] [[Extended_documentation/Home\|На главную]] [[Extended_documentation/Lookup & Invoke\|=>]]
