import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from supabase import create_client, Client

app = FastAPI()

# --- Supabase設定 ---
# 本来は .env ファイルから読み込むのがベストです
SUPABASE_URL = "あなたのSUPABASE_URL"
SUPABASE_KEY = "あなたのSUPABASE_ANON_KEY"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- CORS設定 ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- スキーマ定義 ---
class FlowData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class FlowChartCreate(BaseModel):
    title: str
    description: Optional[str] = None
    flow_data: FlowData

# --- エンドポイント ---

@app.post("/api/flowcharts")
async def create_flowchart(payload: FlowChartCreate):
    try:
        # Supabaseの 'flowcharts' テーブルにデータを挿入
        # payload.dict() を使うことで、Pydanticモデルを辞書形式に変換してそのまま保存できます
        response = supabase.table("flowcharts").insert({
            "title": payload.title,
            "description": payload.description,
            "flow_data": payload.flow_data.dict()  # ここがJSONB型に格納されます
        }).execute()

        return {
            "status": "success",
            "data": response.data
        }
    except Exception as e:
        # エラーが発生した場合は400エラーを返す
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/flowcharts")
async def get_flowcharts():
    try:
        # 一覧を取得する（SNSのタイムライン用）
        response = supabase.table("flowcharts").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))