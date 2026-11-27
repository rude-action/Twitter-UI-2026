# X Ext — Themes & Library for X (Twitter)

X（Twitter）のテーマ・レイアウトをカスタマイズし、投稿をブラウザ内に保存できる Chrome 拡張機能（Manifest V3 / TypeScript + Vite）。

すべてのデータ（設定・保存した投稿）はブラウザ内 (`chrome.storage`) にのみ保持され、外部へ送信されません。

## 機能

- **テーマ**: Paper / Midnight / Sakura / Lagoon / Dusk（CSS 変数 + `<style>` 注入）
- **レイアウト**: ナビ折りたたみ、右サイドバー非表示、フィード中央寄せ・拡幅、行間圧縮
- **プロモ投稿非表示**
- **ローカルライブラリ**: 投稿アクションバーに「保存」ボタンを追加。本文・投稿者・URL・時刻を `chrome.storage.local` に保存し、専用ページでタグ・ノート付け・検索・削除が可能

## 開発

```bash
npm install
npm run build   # 型チェック + dist/ へビルド
npm run dev     # 開発モード
```

## Chrome への読み込み

1. `npm run build` を実行
2. `chrome://extensions` を開き、「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」で `dist/` ディレクトリを選択
4. x.com を開き、ツールバーのアイコンからポップアップでテーマ・レイアウトを設定

## 構成

```
src/
├── content/      # Xページに注入されるcontent script
│   ├── index.ts    # エントリ: 設定読込→CSS適用、メッセージ受信、DOM監視
│   ├── themes.ts   # テーマ定義（CSS変数セット）
│   ├── layout.ts   # レイアウト調整CSS生成
│   └── library.ts  # 保存ボタン注入・投稿データ抽出
├── popup/        # ツールバーポップアップ（テーマ・トグルUI）
├── pages/        # 保存投稿ライブラリ（options page）
└── shared/       # 型定義・storageラッパー
```

## 設計メモ

- X-Tools のような「JS で要素ごとに inline style を書き換える」方式ではなく、`data-testid` ベースの **CSS 注入**方式。SPA の画面遷移に強く、X 側 DOM 変更の影響を受けにくい
- popup ↔ content script 間は標準の `chrome.tabs.sendMessage` / `chrome.runtime.onMessage` + `storage.onChanged` で二重に同期
- 新規投稿検出は `MutationObserver`（300ms デバウンス付き）
- X の DOM 構造（`data-testid` の値など）は変更されることがあるため、表示が崩れた場合は `themes.ts` / `layout.ts` のセレクタを更新してください

## 謝辞

本プロジェクトは [jvsinclair/x-theme-extension](https://github.com/jvsinclair/x-theme-extension) を参考にさせていただきました。
