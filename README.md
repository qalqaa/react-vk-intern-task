# Как запустить проект

Т.к я не хочу давать свои креды от GH в общий доступ я их спрятал в .env файле, который добавил в .gitignore.

1. Зайти в настройки своего профиля на GitHub
2. В самом низу списка настроек будет вкладка **Developer Settings**, нажать на нее
3. Перейти в вкладку **OAuth Apps**
4. Создать Oauth App с

   Homepage URL = http://localhost:5173

   Authorization callback URL = http://localhost:5173/callback

5. Создать **Client Secret**
6. Перейти в склонированный репозиторий и создать **.env** файл
7. Скопировать из созданного oAuth приложения **ClientID** и **Client Secret**
8. И назвать их следующим образом 👇

```
VITE_CLIENT_ID=[ClientID]

VITE_CLIENT_SECRET=[ClientSecret]
```
