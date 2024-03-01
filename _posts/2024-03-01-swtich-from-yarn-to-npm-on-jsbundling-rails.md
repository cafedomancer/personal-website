---
title: "jsbundling-rails で yarn から npm に移行する"
published: true
---

初めから npm を使って jsbundling-rails をセットアップできるとよいのですが、そのような方法は v1.3.0 時点ではなさそうなので、yarn から npm に移行する方法を紹介します。やることは以下です。

- `yarn.lock` を削除して `package-lock.json` を作成する
- `Dockerfile` で yarn をインストールしないようにする
- `Procfile.dev` で yarn ではなく npm を使うようにする
- `bin/setup` で yarn ではなく npm を使うようにする

# 前提

`rails new -j esbuild ...` でプロジェクトが作成されていることを前提としています。手元で試したときの Rails のバージョンは v7.1.3.2 です。

# yarn.lock を削除して package-lock.json を作成する

そのままです。以下を実行します。

```shell
$ rm yarn.lock
$ npm install # package-lock.json が作成される
```

# Dockerfile で yarn をインストールしないようにする

yarn をインストールしないようにし、`yarn.lock` の代わりに `package-lock.json` を使い、`yarn install` の代わりに `npm ci` を実行するようにします。

```diff
diff --git a/Dockerfile b/Dockerfile
index 9e0644d..b3f3c74 100644
--- a/Dockerfile
+++ b/Dockerfile
@@ -23,11 +23,9 @@ RUN apt-get update -qq && \

 # Install JavaScript dependencies
 ARG NODE_VERSION=20.10.0
-ARG YARN_VERSION=1.22.21
 ENV PATH=/usr/local/node/bin:$PATH
 RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
     /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
-    npm install -g yarn@$YARN_VERSION && \
     rm -rf /tmp/node-build-master

 # Install application gems
@@ -37,8 +35,8 @@ RUN bundle install && \
     bundle exec bootsnap precompile --gemfile

 # Install node modules
-COPY package.json yarn.lock ./
-RUN yarn install --frozen-lockfile
+COPY package.json package-lock.json ./
+RUN npm ci

 # Copy application code
 COPY . .
```

# Procfile.dev で yarn ではなく npm を使うようにする

`yarn build` の代わりに `npm run build` を使うようにします。esbuild に `--watch` オプションを渡すために、`--` で区切らないといけない点に注意してください。

```diff
diff --git a/Procfile.dev b/Procfile.dev
index b19ff76..d1e741d 100644
--- a/Procfile.dev
+++ b/Procfile.dev
@@ -1,2 +1,2 @@
 web: env RUBY_DEBUG_OPEN=true bin/rails server
-js: yarn build --watch
+js: npm run build -- --watch
```

# bin/setup で yarn ではなく npm を使うようにする

`yarn install` の代わりに `npm install` を使うようにします。`yarn check` 相当のコマンドは npm にはないので、その部分は単純に削除しています。

```diff
diff --git a/bin/setup b/bin/setup
index d38bf9f..ca8a24c 100755
--- a/bin/setup
+++ b/bin/setup
@@ -18,7 +18,7 @@ FileUtils.chdir APP_ROOT do
   system("bundle check") || system!("bundle install")

   # Install JavaScript dependencies
-  system("yarn check --check-files") || system!("yarn install")
+  system! "npm install"

   # puts "\n== Copying sample files =="
   # unless File.exist?("config/database.yml")
```
