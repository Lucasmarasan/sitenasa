# NASA APOD Project

Este projeto consiste em uma aplicação web que consome a API da NASA (Astronomy Picture of the Day - APOD) para exibir imagens e informações astronômicas baseadas em uma data selecionada.

## Estrutura do Projeto

- `backend/`: API em FastAPI que gerencia as requisições para a NASA.
- `frontend/`: Interface web simples (HTML, CSS, JS).

## Pré-requisitos

- Python 3.x
- Navegador Web (Chrome, Firefox, Edge, etc.)
- Chave de API da NASA (obtida em [api.nasa.gov](https://api.nasa.gov/))

---

## Passo a Passo para Iniciar

### 1. Configuração do Backend

O backend utiliza o ambiente virtual do Python para gerenciar dependências.

#### Ativar o Ambiente Virtual (venv)

No terminal, navegue até a pasta `backend`:

- **Windows:**
  ```powershell
  cd backend
  .\venv\Scripts\activate
  ```

- **Linux/macOS:**
  ```bash
  cd backend
  source venv/bin/activate
  ```

#### Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env` dentro da pasta `backend` (se ainda não existir) e adicione sua chave da NASA:

```env
NASA_API_KEY=SUA_CHAVE_AQUI
```

#### Iniciar o Servidor Backend

Com o ambiente virtual ativado, execute:

```powershell
python main.py
```

O servidor estará rodando em `http://localhost:8000`.

---

### 2. Configuração do Frontend

O frontend é composto por arquivos estáticos e pode ser aberto diretamente.

1. Navegue até a pasta `frontend`.
2. Abra o arquivo `index.html` em seu navegador de preferência.
   - Alternativamente, você pode usar extensões como "Live Server" no VS Code para uma melhor experiência de desenvolvimento.

---

## Tecnologias Utilizadas

- **Backend:** FastAPI, Requests, Python-dotenv.
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla).

---

## Solução de Problemas Comuns

### Erro: [Errno 10048] (Porta 8000 já em uso)
Este erro ocorre quando o backend não foi fechado corretamente e ainda está ocupando a porta 8000.

**Como resolver no Windows (PowerShell):**
```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess -Force
```
Após rodar o comando acima, você poderá iniciar o `main.py` novamente.

### Erro de SSL (CERTIFICATE_VERIFY_FAILED)
O código já possui um contorno para isso ignorando a verificação (`verify=False`). Se o erro persistir, certifique-se de que seu Python está atualizado.
