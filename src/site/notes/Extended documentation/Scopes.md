---
{"dg-publish":true,"permalink":"/extended-documentation/scopes/","dgShowLocalGraph":true,"dgEnableSearch":true,"dg-note-properties":{}}
---

# Scopes

>  Вы можете использовать скоупы | scopes в своем коде. По факту это однострочный комментарий, который парсит юзербот. 

`# scope: heroku_only` - _Избыточно_: Нужен для модулей, которые  поддерживаются только Heroku.
`# scope: inline` -  Указывает на то что модуль использует инлайн.
`# scope: heroku_min 2.1.0` -  Указывает минимальную версию Heroku,которая нужна для установки модуля.
`# meta developer: @H_SunMods` - Указывает разработчика модуля. Если указан канал, Heroku предложит подписаться на него.
`# meta banner: https://example.com/banners/spotifylyrics.jpg` -  Нужен для отображения баннера при установке модуля.
`# requires: Pillow requests spotipy` - Указывает список зависимостей для установки.
`# no_ml` - Запрещает выгрузку модуля.

> [!info] Важно
> - `# scope: inline` связан с [[Extended documentation/Inline#Инлайн формы\|инлайн формами]]
> - `# requires` управляет зависимостями, которые могут потребоваться в [[Extended documentation/Libraries#Библиотеки\|библиотеках]]

---

## Связанные статьи

- [[Extended documentation/Home\|Главная]]
- [[Extended documentation/Quickstart\|Основы разработки]]
- [[Extended documentation/Libraries\|Импорт библиотек]]
---

[[Quickstart Development\|<=]] [[Extended documentation/Home\| На главную]] [[Extended documentation/Config\|=>]]