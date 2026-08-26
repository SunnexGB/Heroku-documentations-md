---
{"dg-publish":true,"permalink":"/extended-documentation/scopes/","dgEnableSearch":true,"dg-note-properties":{}}
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
> - `# scope: inline` связан с [[Extended_documentation/Inline#Инлайн формы\|инлайн формами]]
> - `# requires` управляет зависимостями, которые могут потребоваться в [[Extended_documentation/Libraries#Библиотеки\|библиотеках]]

---

## Связанные статьи

- [[Extended_documentation/Home\|Главная]]
- [[Extended_documentation/Quickstart\|Основы разработки]]
- [[Extended_documentation/Libraries\|Импорт библиотек]]
---

[[Quickstart Development\|<=]] [[Extended_documentation/Home\| На главную]] [[Extended_documentation/Config\|=>]]