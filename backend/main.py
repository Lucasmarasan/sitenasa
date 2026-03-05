from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
import warnings

# Ignorar avisos de requisições HTTPS inseguras (devido ao verify=False)
warnings.filterwarnings("ignore")

load_dotenv()

app = FastAPI()

# Configuração de CORS para permitir que o frontend acesse o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = os.getenv("NASA_API_KEY")
NASA_URL = "https://api.nasa.gov/planetary/apod"

@app.get("/")
async def root():
    return {"message": "NASA APOD Backend is running!", "status": "ok"}

@app.get("/apod")
async def get_apod(date: str):
    if not NASA_API_KEY:
        raise HTTPException(status_code=500, detail="NASA_API_KEY não configurada no servidor.")
    
    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }
    
    try:
        # verify=False é usado para evitar erros de certificado SSL local no Windows
        response = requests.get(NASA_URL, params=params, verify=False)
        
        if response.status_code != 200:
            error_detail = response.json().get("msg", "Erro ao buscar dados da NASA")
            print(f"Erro da API NASA: {error_detail}")
            raise HTTPException(status_code=response.status_code, detail=error_detail)
        
        return response.json()
    except requests.exceptions.SSLError as e:
        print(f"Erro de SSL detectado: {e}")
        raise HTTPException(status_code=500, detail="Erro de conexão segura (SSL). Tente novamente.")
    except Exception as e:
        print(f"Erro inesperado no backend: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno no servidor: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
