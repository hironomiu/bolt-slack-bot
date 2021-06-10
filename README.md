# bolt-slack-bot

## Settings

```
$ npm install
```

## run

```
$ node index.js
```

## Slack API

### Settings

APP の作成後は[slack api apps](https://api.slack.com/apps)から作成した APP の管理画面で設定

- スラッシュコマンド(slash commands) -> `https://api.slack.com/apps/xxxx/slash-commands?`

- メッセージ(`api.message`) -> `https://api.slack.com/apps/xxxx/event-subscriptions?`
  - Subscribe to bot events -> 今回は`message.channels`,`message.im`,`reaction_added`を追加

### Domain

`https://api.slack.com/apps/xxxx/slash-commands?`などでのドメイン登録は

`ドメイン(+Port) + "/slack/events"`で登録する

例 `https:www.hoge.example.com:3000/slack/events`

## Memo

### 作成

このアプリを作成した際のオペレーション

```
$ npm -y init
Wrote to /Users/h-miura/Desktop/lunch/package.json:

{
  "name": "lunch",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

```
$ npm install @slack/bolt

added 152 packages, and audited 153 packages in 5s

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

```
$ npm install dotenv

added 1 package, and audited 154 packages in 642ms

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

```
$ npm install node-schedule

added 6 packages, and audited 160 packages in 1s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ npm install axios

up to date, audited 160 packages in 1s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ npm install qs

up to date, audited 160 packages in 2s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

`.env.local`の`SLACK_BOT_SIGNING_SECRET`に[api.slack.com](https://api.slack.com/apps) -> 「Basic Information」 -> 「Signing Secret」の値を設定

### ボタン

[api.slack.com](https://api.slack.com/apps) ->　「Interactivity & Shortcuts」->「Request URL」を記載しセーブ

## Scopes

chat:write
