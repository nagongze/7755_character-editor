# 🎮 7755遊戲角色檔案編輯器

一個現代化的 Vue 3 應用程式，專為卿卿我我遊戲角色設定與備份而設計，支援 Google Drive 雲端儲存功能。

## ✨ 功能特色

- 📋 **完整角色設定** - 個人資料、基本設定、對話場景、詳細設定、事件記錄
- ☁️ **雲端同步** - 透過 Google Drive API 自動儲存與同步角色檔案
- 🎨 **現代化介面** - 使用 Element Plus 打造直觀易用的操作介面
- 📱 **響應式設計** - 支援各種螢幕尺寸的裝置
- 🔐 **安全認證** - Google OAuth 2.0 安全登入機制

## 🛠️ 技術棧

- **Vue 3** - 使用 Composition API
- **Pinia** - 現代化狀態管理
- **Vue Router 4** - 前端路由
- **Element Plus** - UI 組件庫
- **Sass** - CSS 預處理器
- **Google Drive API** - 雲端儲存服務

## 🎨 字型說明

本應用程式使用了以下開源字型，以確保在各種裝置上都能呈現一致的文字效果：

- **[粉圓 2.1版](https://justfont.com/huninn/)** - 主要介面字型，提供圓潤可愛的視覺風格
- **[芫荽 1.020版](https://github.com/ButTaiwan/iansui)** - 輔助字型，增強文字的可讀性與美感

字型檔案皆已轉檔為.woff2和.woff，以優化載入速度，此轉檔版本僅作為本網站UI呈現使用。
若有字型使用需求的人，請自行至該字型官網瞭解相關詳細資訊，禁止直接拷貝或引用本專案內的檔案。

## 🚀 快速開始

### 環境需求
- Node.js 16.x 或更高版本
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
```bash
git clone <repository-url>
cd character-editor
```

2. **安裝依賴**
```bash
npm install
```

3. **設定環境變數**
```bash
# 複製環境變數檔案
cp .env.local.example .env.local

# 編輯 .env.local，設定你的 Google API 憑證
VUE_APP_GOOGLE_CLIENT_ID=your-client-id.googleusercontent.com
HTTPS=true

```

4. **啟動開發伺服器**
```bash
npm run serve
```

應用程式將在 `https://localhost:8080` 啟動（需要 HTTPS 以支援 Google API）

## 📁 專案結構

```
src/
├── assets/          # 靜態資源
│   ├── fonts/       # 字型檔案（粉圓、芫荽）
│   └── styles/      # 全域樣式檔案
├── components/      # Vue 組件
│   ├── Common/      # 通用組件（載入動畫、狀態訊息、圖示等）
│   ├── Character/   # 角色編輯相關組件
│   └── GoogleDrive/ # Google Drive 功能組件
├── composables/     # 組合式 API
├── router/          # 路由配置
├── services/        # API 服務封裝
├── stores/          # Pinia 狀態管理
├── utils/           # 工具函數與常數
└── views/           # 頁面組件
```

## 🔧 可用指令

```bash
# 開發模式（啟用 HTTPS）
npm run serve

# 建置生產版本
npm run build

# 代碼檢查與修復
npm run lint
```

## 🔑 Google API 設定

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 Google Drive API
4. 建立 OAuth 2.0 憑證
5. 設定授權重新導向 URI（包含你的開發與生產環境網址）
6. 將憑證資訊添加到 `.env.local` 檔案

## 📝 使用說明

1. **登入 Google 帳號** - 首次使用需要登入 Google 帳號以存取 Drive
2. **建立角色** - 填寫角色的各項資訊
3. **儲存到雲端** - 角色資料會自動儲存到你的 Google Drive
4. **載入角色** - 可以載入之前儲存的角色檔案繼續編輯

## 🤝 貢獻指南

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🐛 問題回報

如果發現 bug 或有功能建議，請在 [Issues](issues) 頁面建立新的議題。
