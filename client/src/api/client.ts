import axios from 'axios'

console.log("今のAPIの住所はこれだ！👉", import.meta.env.VITE_API_URL);

// apiClient（専用の配達トラック）を作る
export const apiClient = axios.create({
  // さっき .env に書いた住所（URL）を自動で読み込む設定！
  baseURL: import.meta.env.VITE_API_URL,
  
  // 「これから送る荷物はJSON（データ）ですよ」という合図
  headers: {
    'Content-Type': 'application/json',
  },
});