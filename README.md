# Informus

Aplicação web com integração de IA via [OpenRouter](https://openrouter.ai/), construída com Node.js, Express e front-end em HTML/CSS/JS puro.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (já vem junto com o Node.js)
- Uma chave de API do [OpenRouter](https://openrouter.ai/)

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/foxcuukinho/Informus.git
cd Informus
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
OPENROUTER_API_KEY=sua_chave_aqui
```

> Você pode obter sua chave de API em [https://openrouter.ai/keys](https://openrouter.ai/keys)

### 4. Inicie o servidor

```bash
node back-end/server.js
```

> O caminho exato do arquivo principal pode variar. Se o comando acima não funcionar, verifique os arquivos dentro da pasta `back-end/`.

### 5. Acesse no navegador

Abra o navegador e acesse:

```
http://localhost:3000
```

---

## 📁 Estrutura do projeto

```
Informus/
├── back-end/        # Servidor Express e integração com a API
├── static/          # Arquivos estáticos (imagens, etc.)
├── style/           # Arquivos CSS
├── script.js        # Script principal do front-end
├── package.json     # Dependências do projeto
└── .env             # Variáveis de ambiente (não commitado)
```

---

## 🛠️ Tecnologias utilizadas

| Camada     | Tecnologia                  |
|------------|-----------------------------|
| Back-end   | Node.js + Express 5         |
| IA         | OpenRouter SDK              |
| Front-end  | HTML, CSS, JavaScript puro  |
| Config     | dotenv                      |

---

## ⚠️ Observações

- O arquivo `.env` **não deve ser commitado** no repositório (já está no `.gitignore`).
- O projeto usa **ES Modules** (`"type": "module"` no `package.json`), portanto utilize `import/export` em vez de `require`.
