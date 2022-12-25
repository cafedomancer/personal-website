---
title: "bokan と sorta"
published: true
---

これは [フィヨルドブートキャンプ Part 2 Advent Calendar 2022](https://adventar.org/calendars/7786) の 12 日目の記事です。
11 日目の記事は hirano-vm4 さんの「[FBC と仕事の両立とふりかえり&卒業後は？](https://hirano-vm4.hatenablog.com/entry/adventcalendar2022)」でした。
13 日目の記事は sasabo さんの「[プログラマ 2 年目の記録](https://sasabo-h.hatenablog.com/entry/2022/12/13/083953)」です。
[フィヨルドブートキャンプ Part 1 Advent Calendar 2022](https://adventar.org/calendars/7760) もあるのでよければどうぞ。

# はじめに

フィヨルドブートキャンプでメンターをしている梅本 ([cafedomancer](https://twitter.com/cafedomancer)) です。
フィヨルドブートキャンプではコミュニケーションの主なツールとして Discord が使われています。
Discord は Bot を導入するのが簡単で、フィヨルドブートキャンプの Discord でも様々な Bot が使われています。
その中でも今回は、ぼくが作成した bokan と sorta という Discord Bot について紹介します。

# bokan

フィヨルドブートキャンプの Discord では、輪読会や雑談などのイベントがボイスチャンネルを使って行われています。
そこに参加されている方から以下のような意見を聞く機会がありました。

「ボイスチャンネルで雑談していると、相手に気を使うので自分のタイミングで退出するのが難しい。特定の時間で雑談を終了しようと思っても、盛り上がっているときに終了を促すと話に水を差す形になってしまう。時間になったらボイスチャンネルに接続している全員が退出されるような仕組みがあればよいのではないか。」

この意見を参考にぼくが作った Discord Bot が [bokan](https://github.com/cafedomancer/bokan) です。
bokan は以下のように使うことができます。

1. ボイスチャンネルに接続する
2. `/bokan 0900` のようにコマンドを実行して退出時間を設定する
3. 退出時間が来るまで雑談する

<img class="width-fit" src="/assets/screenshot-2022-12-25-at-12-45-51.png" alt="screenshot-2022-12-25-at-12-45-51.png" />
<img class="width-fit" src="/assets/screenshot-2022-12-25-at-12-45-58.png" alt="screenshot-2022-12-25-at-12-45-58.png" />

Bot 自体は Node.js, TypeScript, discord.js, ts-node といったスタックで作成されており、アプリケーションは Render 上でホストされています。
詳しくは GitHub 上のリポジトリをご参照ください。

フィヨルドブートキャンプの Discord に参加されている方はだれでも使えるので、上記のような問題に困っている場合はぜひ使ってみてください。
ぼくも実際に使ってみているのですが、時間になるとブツっと切断される体験はなかなか面白いです。

# sorta

フィヨルドブートキャンプの Discord には、各参加者が自分で自由に使える分報と呼ばれるテキストチャンネルがあります。
チャンネル名は、以下のようにユーザー名と同じ名前で作成され、アルファベット順に並び替えられています。
ただ、分報のテキストチャンネルの管理には次のような問題がありました。

<img class="width-fit" src="/assets/screenshot-2022-12-25-at-14-02-30.png" alt="screenshot-2022-12-25-at-14-02-30.png" />

- チャンネルの順番はだれでも操作できてしまうため、だれかが時々間違って変な順番にしてしまう
- 新しく作成された分報を適当な順番の位置に配置する必要がある

この問題を解決するために、分報のテキストチャンネルを並び替える [sorta](https://github.com/cafedomancer/sorta) という Discord Bot を作成しました。
sorta は、各カテゴリに所属するテキストチャンネルを、1 時間に 1 回アルファベット順に並び替えます。
誤ってテキストチャンネルを移動してしまっても、1 時間以内に元の順番に戻ります。
新しいテキストチャンネルを追加した場合も、とりあえず放っておけば 1 時間以内に適切な順番に配置されます。

こちらの Bot も Node.js, TypeScript, discord.js, ts-node のスタックで作成されており、アプリケーションは Render 上のバックグラウンドワーカーで実行されています。
詳しくは GitHub 上のリポジトリをご参照ください。

# おわりに

今回は、フィヨルドブートキャンプの Discord で使っているぼくが作成した Discord Bot について紹介しました。
Discord Bot は作成や導入がカンタンで、手近な問題を解決する練習を行うにはちょうどよいかなーと思います。
また、イベントに応じて処理を行うような Bot は、Node.js と discord.js を使うと自然な形で記述することができます。
みなさんも興味があればぜひ Discord Bot を作ってみてください。
FBCBot.rb という Discord Bot のテストなどに使える非公式サーバーもあるようなのでぜひご活用ください。
