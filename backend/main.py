import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from supabase import create_client, Client

app = FastAPI()

# --- Supabase設定 ---
# 本来は .env ファイルから読み込むのがベストです
SUPABASE_URL = "https://hlbwewrytlpcrfwqfuci.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYndld3J5dGxwY3Jmd3FmdWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTA2MjAsImV4cCI6MjA4NzEyNjYyMH0.mcooxvLg8IUaKxwrevTKdMPJjO7bfaemk5nZcIKLhZQ"
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
@app.get("/api/flowcharts/{flow_id}")
async def get_flowchart_by_id(flow_id: int):
    try:
        # IDを指定して1件だけ取得
        response = supabase.table("flowcharts").select("*").eq("id", flow_id).execute()
        
        # データが見つからなかった場合
        if not response.data:
            raise HTTPException(status_code=404, detail="Flowchart not found")
            
        # リストの0番目（1件だけなので）を返す
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))