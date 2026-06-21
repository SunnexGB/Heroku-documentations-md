---
{"dg-publish":true,"permalink":"/kak-sozdat-svoi-creds/","tags":["solution_reslove"],"dgEnableSearch":true,"dg-note-properties":{"tags":["solution_reslove"]}}
---

Привет, в этом гайде я вам расскажу как создать свои ==App api_id== и ==App api_hash== , если вы живете в России.
(по факту вы создаете не их отдельно, а приложение в целом.) 
# Подготовка

Идем на сайт [one.one.one.one](https://one.one.one.one/) и выбираем свою платформу на которой вы будете создавать свои creds 
![main_menu_cf_warp.png](/img/user/images/how%20to%20create%20CREDS/main_menu_cf_warp.png)
**P.S** Лучше скачивать именно на пк или ноутбук, потому что на айфонах и надройдах может выскочить следующие(в таком случае лучше забить и пробовать с пк или ноута):

>[!quote]  ERROR
>Your device could not
establish a connection.
Contact your administrator
for assistance

После того как вы скачали **Cloudflare WARP**, все что вам нужно будет это просто подключиться, а на пк или ноутбуке нужно будет выбрать в меню режим ==Трафик и DNS (UDP)== 
![cf_one_client.png](/img/user/images/how%20to%20create%20CREDS/cf_one_client.png)
> [!warning] ВАЖНО!
> Не использовать впн-сервисы пока работает **Cloudflare WARP**,вы сможете его отключить уже после того как зарегистрируете свои **creds**

# Регистрация creds
1. Для начала мы идем на [my.telegram.org](https://my.telegram.org/auth?to=apps)и вписываем в международном формате ваш номер телефона, для россии это +7 ... 
![manage_apps_page.png](/img/user/images/how%20to%20create%20CREDS/manage_apps_page.png)
2. Вставляем код который вам отправит телеграм в приложение и нажимаем кнопку для входа на страницу регистрации приложения!
![confirmation_code.png](/img/user/images/how%20to%20create%20CREDS/confirmation_code.png)
3. И так! Вы на странице для регистрации приложения.
![create_app_empyty.png](/img/user/images/how%20to%20create%20CREDS/create_app_empyty.png)
> [!warning] ВАЖНО!
> **App title: любой(уникальный)**
> **Short name: тоже любой**
> **URL: не нужен(оставьте пустым)**
> **Description: не нужен(оставьте пустым)**

Вот что получилось у меня в итоге:
![app_configuration_done.png](/img/user/images/how%20to%20create%20CREDS/app_configuration_done.png)

# Поздравляю вы зарегистрировали личные creds

---
# Уже готовые creds

> [!quote] Это личные api_id и api_hash,беря их вы подтверждаете что вся ответственность лежит на вас,а не на мне,во избежание конфликтов.

**api_id** = `33728218`
**api_hash** = `2c416c3a6e867f9c67169a6c8506990b`

**api_id** = `37930389`
**api_hash** = `4ff9248ea6d2be566e492cc797e9a6ab`

**api_id** = `23265745`
**api_hash** = `e148c83a745127ce88a5918771b88e14`

**api_id** = `32983937`
**api_hash** = `82a67ca02320b5203f228cfbeac8a362`

---
# Guide by @SunnexGB