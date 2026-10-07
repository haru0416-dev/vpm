# haru0416 VPM

haru0416-dev の VRChat 用パッケージを VCC（VRChat Creator Companion）に追加するための配布元です。
公開先は https://vpm.haru0416.dev/index.json です。

VRChat 公式の [template-package-listing](https://github.com/vrchat-community/template-package-listing) をもとにしています。
`source.json` を main に push すると、Actions がパッケージ一覧（`index.json`）と紹介ページ（`Website/`）を作り、GitHub Pages に公開します。

## いまの状態

骨組みだけです。まだ GitHub には上げていません。

## 公開するときにやること

1. GitHub に公開リポジトリ `haru0416-dev/vpm` を作って push する
2. リポジトリの Settings → Pages で、Source を「GitHub Actions」にする
3. 同じ画面の Custom domain に `vpm.haru0416.dev` を入れる
4. haru0416.dev の DNS に CNAME を足す: `vpm` → `haru0416-dev.github.io`
5. Tripwire のリポジトリを公開して、zip と package.json を付けたリリースを作る
   （一覧を作る Actions は、`githubRepos` のリポジトリのリリースを読む。非公開のリポジトリは読めない）
6. Actions の「Build Repo Listing」を手動で実行する
