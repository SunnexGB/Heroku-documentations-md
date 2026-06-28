---
{"dg-publish":true,"permalink":"/guide-for-digital-garden-module/","dg-note-properties":{}}
---

# Подготовка
Для начала нам нужно создать свой репозиторий на гитхабе, куда будут деплоиться все ваши заметки.
Переходим на [SunnexGB / DigitalGarden](https://github.com/SunnexGB/DigitalGarden), после чего следуем шагам приведённым ниже:
## шаг 1
![step_1.png](/img/user/images/dg_module/step_1.png)
Генерируем из моего шаблона репозиторий.
## шаг 2
![step_2.png](/img/user/images/dg_module/step_2.png)
Пишем любое название репозитория которое пропустит гитхаб и описание по желанию, так же репозиторий должен быть публичный.

## шаг 3
![step_3.png](/img/user/images/dg_module/step_3.png)
Нажимаем на **Settings**, далее на **Pages**

## шаг 4
![step_4.png](/img/user/images/dg_module/step_4.png)
Выбираем способ билдинга и деплоя как **Github Actions**
## Итог:
![done_deploy.png](/img/user/images/dg_module/done_deploy.png)
У вас появиться страница, но на ней ничего не будет(пока что)
# Настройка модуля
Чтобы публиковать заметки вам нужно настроить модуль, это очевидно можно сделать командой `.cfg digitalgarden` там вам нужно будет настроить поля которые я подчеркнул:
![module_settings.png](/img/user/images/dg_module/module_settings.png)

Как получить ==repo_name== и ==username== я не буду объяснять, но вот как получить `github_token` я вам расскажу.
1. Для начала переходим на [эту страницу](https://github.com/settings/personal-access-tokens/new)
2. ![base_info.png](/img/user/images/dg_module/base_info.png)
тут нам нужно указать имя нашего токена(ключа).
3. ![repo_accsess.png](/img/user/images/dg_module/repo_accsess.png)
Выбираем `Only select repositories` и уже там выбираем наш репозиторий который мы сгенерировали ранее.
4. ![permissions.png](/img/user/images/dg_module/permissions.png)
Тут нам нужно нажать на `Add permisions` и после чего нужно будет выбрать 2 вещи:
- ==Contents== 
![permissions_contents.png](/img/user/images/dg_module/permissions_contents.png)
и **обязательно** выбрать `Read and write`
- ==Pull requests== 
![permissions_pr.png](/img/user/images/dg_module/permissions_pr.png)
Делаем тоже самое с  ==Pull requests== и создаем токен,а далее просто его копируем(можно будет скопировать только 1 раз).
Токен можно установить командой `.fcfg digitalgarden github_token ваш_токен`
# Команды
 `.dg` - Опубликовать вашу заметку в веб (поддерживает dg-теги как аргументы)
Например: чтобы установить домашнюю-страницу(ту на которую вас будет кидать всегда на сайте), нужно указать тег `dg-home`
`.dgc` - Управление статусом dg-тегов
Это тогл команда, она отключает/включает определённые теги, которые вы укажите.

# Список dg-тегов
*(какие то из них сам модуль не кидает, поэтому вам придётся самому ручками их указывать)*

| Свойство                 | Что делает                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `dg-home`                | Делает заметку главной страницей. Должно быть только у одной заметки.                                         |
| `dg-show-local-graph`    | Показывает локальный граф для этой заметки (даже если глобально выключен).                                    |
| `dg-show-backlinks`      | Показывает список обратных ссылок.                                                                            |
| `dg-show-toc`            | Показывает оглавление.                                                                                        |
| `dg-show-inline-title`   | Показывает заголовок заметки сверху страницы.                                                                 |
| `dg-show-filetree`       | Показывает файловое дерево справа.                                                                            |
| `dg-enable-link-preview` | Включает превью заметок при наведении на ссылки.                                                              |
| `dg-enable-search`       | Включает поиск.                                                                                               |
| `dg-show-tags`           | Показывает теги из frontmatter на странице.                                                                   |
| `dg-pass-frontmatter`    | Передаёт весь frontmatter в шаблон без фильтрации (для кастомных шаблонов).                                   |
| `dg-permalink`           | Задаёт собственный URL страницы. Например `articles/my-post`.                                                 |
| `dg-pinned`              | Закрепляет заметку сверху.                                                                                    |
| `dg-hide`                | Полностью скрывает заметку: из дерева, поиска, графа, sitemap, RSS и т.д., хотя файл остаётся опубликованным. |
| `dg-hide-in-graph`       | Скрывает только из графа.                                                                                     |
| `dg-hide-in-filetree`    | Скрывает только из файлового дерева, но оставляет доступной через поиск и ссылки.                             |
| `dg-metatags`            | Позволяет задать SEO/OpenGraph-метатеги (`description`, `og:image`, `og:title` и др.)                         |
| `dg-content-classes`     | Добавляет CSS-классы к странице для индивидуального оформления.                                               |
| `dg-note-icon`           | Назначает иконку заметке.                                                                                     |
Больше можно узнать [тут!](https://docs.forestry.md/getting-started/03-note-settings/)