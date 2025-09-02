# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール（devDependenciesも含む）
RUN npm install

# ソースコードをコピー
COPY . .

# 静的サイトをビルド
RUN npm run build

# Stage 2: Development (for docker-compose)
FROM node:22-alpine AS development
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev", "--", "--host"]

# Stage 3: Production (for deployment)
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# ビルド済みの静的ファイルをコピー
COPY --from=builder /app/dist .

# Nginxの設定をコピー（オプション）
# COPY nginx.conf /etc/nginx/nginx.conf

# ポートを公開
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]