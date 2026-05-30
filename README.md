# Banco de Dados

Aplicacao simples para cadastrar, listar e remover usuarios usando HTML, CSS, JavaScript, FastAPI e MySQL.

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

### 2. Instalar dependencias do backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Executar API

```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

A documentacao da API fica em:

```text
http://127.0.0.1:8000/docs
```

### 4. Executar front-end

Em outro terminal:

```bash
cd frontend
python -m http.server 5500 --bind 127.0.0.1
```

Depois abra:

```text
http://127.0.0.1:5500/
```

## Funcionalidades

- Criar usuario
- Listar usuarios
- Remover usuarios
- Contador de cadastros
- Mensagens de sucesso e erro
