# me

個人用プロフィール/リンク集サイト。Astro製の静的サイトとして [Cloudflare Workers (Static Assets)](https://developers.cloudflare.com/workers/static-assets/) にデプロイする。

## ローカル開発

Node.js 24以上が必要（`.nvmrc` 参照。nvm利用時は `nvm use`）。

```bash
npm install
npm run dev
```

Dockerで動かす場合:

```bash
docker compose up app-dev
```

`http://localhost:3000` で確認できる。

## リンクの追加方法

`src/content/links/` にMarkdownファイルを1つ追加するだけでトップページのリンク一覧に反映される。

```markdown
---
title: GitHub
url: https://github.com/yourname
description: メインのGitHubアカウント
category: dev
color: "#b8862f"
order: 4
---
```

- `order`: 表示順（必須・昇順）
- `category`: 任意のラベル（現状は表示に使っていない）
- `color`: 頭文字アイコンの背景色。省略するとタイトルから自動で決まる
  （`src/data/linkIcons.ts` のパレットから選ばれる）。
  隣り合うリンクが似た色になった場合はここで明示する。
  YAMLでは `#` がコメント開始扱いになるため、必ずクォートで囲む

## プロフィール/サイト名の編集方法

- `src/data/profile.ts`: プロフィールカードの内容（名前、説明、所在地、プロフィール画像パス）
- `src/data/site.ts`: サイト名（`<title>` やOGP等に使われる）

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが出力される。

## デプロイ

初回のみ `npx wrangler login` でCloudflareアカウントにログインしてから:

```bash
npm run deploy
```

（`wrangler deploy` のエイリアス。`wrangler.jsonc` の設定に従い `dist/` をCloudflare Workersにデプロイする）

GitHubリポジトリと連携すれば `git push` で自動ビルド・デプロイも可能（下記「ダッシュボードでの手動設定」参照）。

## ダッシュボードでの手動設定（Claude Codeでは自動化できない項目）

以下はすべてCloudflareダッシュボード上での操作が必要。

- **カスタムドメインの紐付け**: `wrangler.jsonc` の `name`（Worker名 `me`）で作成されたWorkerの Settings → Domains & Routes から `roguesch.net` を紐付ける（DNSレコードは自動作成される）
- **GitHub連携によるCI/CD**: ビルドコマンド `npm run build`、出力ディレクトリ `dist` を設定
- **Cloudflare Web Analytics**: ダッシュボードの Web Analytics でサイトを登録し、発行されたトークンをビルド環境変数 `PUBLIC_CF_BEACON_TOKEN` としてWorkerの設定に追加する（`.env.example` を参照。トークンはリポジトリにコミットしない）
- **Bot Fight Mode**: 有効化を推奨（無料・コード変更不要）

## License

[MIT](LICENSE)
