from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="@Jurozetu02",
        database="cadastro_db"
    )

class Usuario(BaseModel):
    nome: str
    email: str
    senha: str

@app.post("/usuarios")
def criar_usuario(usuario: Usuario):
    conn = conectar()
    cursor = conn.cursor()

    try:
        sql = "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)"
        valores = (usuario.nome, usuario.email, usuario.senha)

        cursor.execute(sql, valores)
        conn.commit()

        return {"mensagem": "Usuario criado com sucesso!"}
    finally:
        cursor.close()
        conn.close()

@app.get("/usuarios")
def listar_usuarios():
    conn = conectar()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT id, nome, email FROM usuarios")
        usuarios = cursor.fetchall()

        return usuarios
    finally:
        cursor.close()
        conn.close()

@app.delete("/usuarios/{usuario_id}")
def deletar_usuario(usuario_id: int):
    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM usuarios WHERE id = %s", (usuario_id,))
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuario nao encontrado")

        return {"mensagem": "Usuario deletado com sucesso!"}
    finally:
        cursor.close()
        conn.close()
