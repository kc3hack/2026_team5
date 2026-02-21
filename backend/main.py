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
    allow_origins=["http://localhost:5173",
                   "https://2026team5-livid.vercel.app",
                   "https://adorable-frangipane-3e810e.netlify.app"],
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

class LikeAction(BaseModel):
    action: str  # "like" or "unlike"

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

@app.post("/api/flowcharts/{flow_id}/like")
async def toggle_like(flow_id: int, payload: LikeAction):
    try:
        # 現在のいいね数を取得
        response = supabase.table("flowcharts").select("likes").eq("id", flow_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Flowchart not found")
            
        current_likes = response.data[0].get("likes", 0)
        
        if current_likes is None:
            current_likes = 0
            
        if payload.action == "like":
            new_likes = current_likes + 1
        elif payload.action == "unlike":
            new_likes = max(0, current_likes - 1)
        else:
            raise HTTPException(status_code=400, detail="Invalid action")
            
        # いいね数を更新
        update_response = supabase.table("flowcharts").update({"likes": new_likes}).eq("id", flow_id).execute()
        
        return {
            "status": "success",
            "likes": new_likes
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))