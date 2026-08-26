---
{"dg-publish":true,"permalink":"/extended-documentation/loops/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Циклы

Декоратор `@loader.loop` создаёт бесконечный цикл из метода класса. Цикл выполняет функцию с заданным интервалом.

```python
@loader.loop(
    interval=60, # default int 5
    autostart=True, # default bool False
    wait_before=True, # default bool False
    stop_clause="IS_LOOP_RUNNING", # default NoneType None
)
async def loop(self):
    ...
```

## Управление циклом

```python
# Ручной запуск
self.loop.start()

# Ручная остановка
self.loop.stop()

# Проверка статуса
self.loop.status  # True/False
```

## Пример с остановкой

```python
@loader.loop(
    interval=60,
    autostart=True,
    wait_before=True,
    stop_clause="IS_LOOP_RUNNING",
)
async def loop(self):
    self._loop_iterations += 1

    if self._loop_iterations > 10:
        self.set("IS_LOOP_RUNNING", False)
        return

    # основная логика цикла
```

> [!warning] Важно
> До Heroku 2.2.2 метод `stop()` не очищал поле `loop._task`, что мешало повторному запуску через `loop.start()`. В Heroku 2.2.2+ ошибка исправлена. Для совместимости с Hikka делайте обход через очистку поля `_task` и `status` после явной остановки цикла

## Пример без автостарта

```python
@loader.loop(interval=30)
async def my_loop(self):
    # цикл не запустится автоматически
    # нужно вызвать self.loop.start() вручную
    ...
```

# Связь с on_unload

При выгрузке модуля цикл автоматически останавливается. Но если нужно выполнить дополнительную очистку:

```python
async def on_unload(self):
    self.loop.stop()
```

> [!info] Note
> `on_unload` описан в [[Extended documentation/Quickstart#Документация по структуре\|основах разработки]]

---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Decorators\|Декораторы]]
- [[Extended documentation/Watchers\| Вотчеры]]
- [[Quickstart \| Основы разработки]]
---

[[Extended documentation/Loops\|<=]] [[Extended documentation/Home\|На главную]] [[Extended documentation/Raw Handler\|=>]]
