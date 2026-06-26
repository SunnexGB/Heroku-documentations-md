---
{"dg-publish":true,"permalink":"/custom-guide/","dg-note-properties":{}}
---

Гайд для кастомизирования **инфо/пинг/хелп** и других:
чтобы сделать кастомный **инфо/пинг/хелп** и в целом все что угодно нам помогут **плейсхолдеры**
вот список дефолтных(основных) плейсхолдеров
> [!quote]
> *ℹ️ Кастомный текст сообщения. Может содержать ключевые слова {me}, {version}, {build}, {prefix}, {platform}, {upd}, {uptime}, {cpu_usage}, {ram_usage}, {branch}, {hostname}, {user}, {os}, {kernel}, {cpu}, {ping}*

***изъяснение каждого плейсхолдера:***
`{me}` -  **отображает ваш ник в тг**
 `{version}` -  **отображает текущую версию юб**
 `{build}` -  **отображает номер билда(показывает номер коммита)**
 `{prefix}` -  **отображает префикс, с которого начинаются команды (например, . или !)**
 `{platform}` -  **отображает хост wds/userland/docker**
 `{upd}` -  **отображает информацию об обновлениях**
 `{uptime}` -  **отображает время непрерывной работы юб**
 `{cpu_usage}` -  **отображает текущую нагрузку на процессор в процентах**
 `{ram_usage}` -  **отображает объем занятой оперативной памяти**
 `{branch}` -  **отображает текущую ветку (например, main или dev)**
 `{hostname}` -  **отображает сетевое имя сервера(вроде)**
 `{user}` -  **отображает имя пользователя в системе**
 `{os}` -  **отображает название операционной системы (например, Ubuntu)**
 `{kernel}` -  **отображает версию ядра системы дистрибутива там**
 `{cpu}` -  **отображает  данные о проце (например,6 (12) core(-s); 11.9% total)**
 `{ping}` -  **отображает ваш текущий пинг**

Нам нужно обычным сообщением написать ~~в Избранное~~ в телеграме шаблон сообщения,например:

{user}@debian
━━━━━━━━━━━━━━━━━━━━━━━━
**OS     : `{os}`
Ver    : {version} ({branch}@{build})**
**Up     : {uptime}**
**RAM    : {ram_usage}**
**Load   : {cpu_usage}%**
**Ping   : {ping}ms**
━━━━━━━━━━━━━━━━━━━━━━━━
⚙️| **CPU : {cpu}**
⚪️| **Update : {upd} 

после чего мы скидываем это сообщение в чат и в отвен на него пишем `.e r.text` ,в итоге мы получим следящее:

```python
{user}@debian
━━━━━━━━━━━━━━━━━━━━━━━━
<b>OS     : </b><code>{os}</code>
<b>Ver    : {version} ({branch}@{build})</b>
<b>Up     : {uptime}</b>
<b>RAM    : {ram_usage}</b>
<b>Load   : {cpu_usage}%</b>
<b>Ping   : {ping}ms</b>
━━━━━━━━━━━━━━━━━━━━━━━━
<tg-emoji emoji-id=6021582331251268218>⚙️</tg-emoji>| <b>CPU : {cpu}</b>
<tg-emoji emoji-id=5873022839866527761>⚪️</tg-emoji>| <b>Update : {upd}</b>
```
далее это нужно применить,пишем `.fcfg модуль параметр текст`
для **info** это `.fcfg Herokuinfo custom_message`
для **ping** это `.fcfg Tester custom_message`
━━━━━━━━━━━━━━━━━━━━━━━━
в итоге вот что получилось у меня
> [!quote]
> .fcfg Herokuinfo custom_message {user}@debian
> ━━━━━━━━━━━━━━━━━━━━━━━━
> &lt;b&gt;OS     : &lt;/b&gt;&lt;code&gt;{os}&lt;/code&gt;
> &lt;b&gt;Ver    : {version} ({branch}@{build})&lt;/b&gt;
> &lt;b&gt;Up     : {uptime}&lt;/b&gt;
> &lt;b&gt;RAM    : {ram_usage}&lt;/b&gt;
> &lt;b&gt;Load   : {cpu_usage}%&lt;/b&gt;
> &lt;b&gt;Ping   : {ping}ms&lt;/b&gt;
> ━━━━━━━━━━━━━━━━━━━━━━━━
> &lt;tg-emoji emoji-id=6021582331251268218&gt;⚙️&lt;/tg-emoji&gt;| &lt;b&gt;CPU : {cpu}&lt;/b&gt;
> &lt;tg-emoji emoji-id=5873022839866527761&gt;⚪️&lt;/tg-emoji&gt;| &lt;b&gt;Update : {upd}&lt;/b&gt;
Пример инфо брал у [него](https://t.me/iwannabecomedead)
