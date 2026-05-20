
# Projeto Cadastro de Usuários

## Tecnologias
- HTML
- CSS
- JavaScript
- Python FastAPI
- MySQL

## Como executar

### 1. Criar banco MySQL
Execute o arquivo:

```sql
database.sql
```

Se o banco ja existia antes e aparecer o erro `Unknown column 'senha' in 'field list'`, execute:

```sql
add_senha.sql
```

### 2. Instalar dependências do backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Executar API

```bash
uvicorn main:app --reload
```

### 4. Executar Front-end

Em outro terminal, execute:

```bash
cd frontend
python -m http.server 8000
```

Depois abra:

```
http://127.0.0.1:8000
```

## Funcionalidades
- Criar usuário
- Listar usuários
- Deletar usuário
