# Development (for docker-compose)
FROM node:24-alpine AS development
WORKDIR /app

# rootで実行すると、マウントしたソースに生成される .astro などが
# ホスト側でroot所有になりホストからビルドできなくなる。
# イメージに元からある node ユーザー（uid/gid 1000）で実行して所有者を揃える。
# npm install も同じユーザーで行い、node_modules ボリュームも書き込み可能にする
RUN chown node:node /app
USER node

# パッケージファイルをコピー
COPY --chown=node:node package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY --chown=node:node . .

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev", "--", "--host"]
