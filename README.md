# Vue + Highcharts 客戶分析 Dashboard

本專案是一套以 **Vue 3 + Highcharts** 製作的「客戶分析儀表板」。這個專案快速實作互動式統計圖表、並練習前端數據視覺化技術。

---

## 🚀 專案特色

* 使用 Vue 3 組件化開發
* 各圖表資料皆來自 `public/persona_target_guid.json`
* 前端採用 [Highcharts](https://www.highcharts.com/) 繪製：

  * 長條圖（性別 × 年齡）
  * 直方圖（消費力分布）
  * 堆疊條形圖（三個月消費趨勢）
  * 多圓環圖（消費傾向與習慣）
  * 樹狀圖（註冊地）


---

## 📦 專案安裝與啟動

1. **下載或 clone 專案：**

   ```bash
   git clone https://github.com/Shikilife/vue-highcharts.git
   cd vue-highcharts
   ```
2. **安裝依賴：**

   ```bash
   npm install
   ```
3. **開發模式啟動：**

   ```bash
   npm run dev
   ```
4. **開啟瀏覽器網址：**

   * [http://localhost:5173](http://localhost:5173)

---

## 🔧 打包＆部署 GitHub Pages

1. **打包：**

   ```bash
   npm run build
   ```
2. **部署到 gh-pages：**

   ```bash
   npx gh-pages -d dist
   ```
3. **瀏覽網址：**

   * [https://shikilife.github.io/vue-highcharts/](https://shikilife.github.io/vue-highcharts/)

> 🚩 部署時請確認 `persona_target_guid.json` 已放在 `public/`，並**確保 fetch 路徑為 `./persona_target_guid.json`**，否則 GitHub Pages 無法正確讀取資料！

---

## 📊 Dashboard 主要組件

| 組件名稱              | 功能              |
| ----------------- | --------------- |
| GenderAgeBar      | 年齡 × 性別分布長條圖    |
| PowerHistogram    | 消費力分布直方圖        |
| StackedBarChart   | 近三個月消費趨勢堆疊圖     |
| ConsumptionHabits | 消費傾向/習慣多圓環圖     |
| RegisterTreemap   | 註冊地樹狀圖（Treemap） |

---

## 📝 專案資料格式

請將 JSON 資料 `persona_target_guid.json` 放於 `public/` 資料夾。

### 範例格式（部分）：

```json
{
  "guid_data": [
    { "類型": "性別與年齡", ... },
    { "類型": "消費力直方圖", ... },
    { "類型": "近三個月消費趨勢", ... },
    { "類型": "消費傾向與習慣", ... },
    { "類型": "註冊地", ... }
  ]
}
```

---

## 🛠 技術棧

* Vue 3
* Highcharts
* Vite
* Node.js

---

## 紀錄
* Day14：https://hackmd.io/@Shiki9029/ry3a6NaVgx
* Day15：https://hackmd.io/@Shiki9029/HkzArdR4xg
* Day16：https://hackmd.io/@Shiki9029/r1dl3dJrgg
* Day17：https://hackmd.io/@Shiki9029/rksm7rgBxl



