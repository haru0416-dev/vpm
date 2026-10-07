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
5. Tripwire のリポジトリを公開して、Actions の「Release」を手動で実行する
   （package.json のバージョンと CHANGELOG.md の節を先に用意しておく。一覧を作る Actions は、`githubRepos` のリポジトリのリリースに付いた .zip を読む。非公開のリポジトリは読めない）
6. Actions の「Build Repo Listing」を手動で実行する

## 新しいバージョンを出したとき

一覧は、`source.json` か `Website/` を push したとき、手動で実行したとき、パッケージ側から `package-released` の通知を受けたときに作り直されます。
Tripwire の Release に、このリポジトリへの通知を送らせるには、Tripwire のリポジトリに Secret `VPM_DISPATCH_TOKEN` を置きます
（このリポジトリだけに Contents: Read and write を付けた fine-grained token）。置いていないときは、Release のあとに「Build Repo Listing」を手動で実行します。
