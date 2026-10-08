# haru0416 VPM

haru0416-dev の VRChat 用パッケージを VCC（VRChat Creator Companion）に追加するための配布元です。
公開先は https://vpm.haru0416.dev/index.json です。

VRChat 公式の [template-package-listing](https://github.com/vrchat-community/template-package-listing) をもとにしています。
`source.json` を main に push すると、Actions がパッケージ一覧（`index.json`）と紹介ページ（`Website/`）を作り、GitHub Pages に公開します。

## いまの状態

2026-10-08 に公開しました。一覧には Tripwire 0.1.0 と Udon Bridge 0.1.0 が載っています。紹介ページと一覧は GitHub Pages で `vpm.haru0416.dev` から配信しています（DNS は Cloudflare の CNAME `vpm` → `haru0416-dev.github.io`、プロキシなし）。

## 新しいバージョンを出したとき

一覧は、`source.json` か `Website/` を push したとき、手動で実行したとき、パッケージ側から `package-released` の通知を受けたときに作り直されます。
Tripwire の Release に、このリポジトリへの通知を送らせるには、Tripwire のリポジトリに Secret `VPM_DISPATCH_TOKEN` を置きます
（このリポジトリだけに Contents: Read and write を付けた fine-grained token）。置いていないときは、Release のあとに「Build Repo Listing」を手動で実行します。
