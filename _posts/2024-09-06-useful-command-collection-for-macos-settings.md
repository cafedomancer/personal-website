---
title: "macOS の設定に使える便利なコマンド集"
published: true
---

いずれもリファレンスをを見つけられていないので、実行するときは自己責任でお願いします :pray:
macOS-defaults というサイトにいろいろ情報が載っていて便利。

- [https://macos-defaults.com/](https://macos-defaults.com/)
- [https://github.com/yannbertrand/macos-defaults](https://github.com/yannbertrand/macos-defaults)

# Launchpad のアプリの並び順をリセットする

```
$ defaults write com.apple.dock ResetLaunchPad -boolean TRUE
```

# ログインシェルを変更する

```
$ sudo dscl . -change /Users/$USER UserShell /bin/zsh /opt/homebrew/bin/fish
```

# スクリーンショットの影を無くす

```
$ defaults write com.apple.screencapture disable-shadow -boolean FALSE
```

# キーを長押ししたときにその文字の入力を繰り返す

```
defaults write NSGlobalDomain ApplePressAndHoldEnabled -boolean FALSE
```