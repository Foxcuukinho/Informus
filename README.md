# Informus

<div align="center">
  <img src="front-end/informus_favicon.svg" width="80" alt="Informus logo"/>
  
  **Best fact-checker**
  
  ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-5-000000?style=flat&logo=express&logoColor=white)
  ![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-7B61FF?style=flat)
  ![Serper](https://img.shields.io/badge/Serper-Search-4285F4?style=flat)
</div>

---

> ⚠️ **Informus não pode ser considerado um medidor de verdade absoluta.**

---

## O que é

O **Informus** é uma aplicação web com o objetivo de combater a desinformação digital. Com a velocidade que informações falsas se espalham nas redes sociais, ficou cada vez mais difícil saber o que é verdade. O Informus foi criado para ajudar nisso.

O usuário digita uma afirmação ou pergunta — pode ser uma ou várias ao mesmo tempo, como *"A Terra é plana e a NASA está escondendo isso de nós"* — e o sistema automaticamente:

1. Identifica e extrai cada claim verificável do texto
2. Busca em fontes confiáveis e oficiais na web
3. Analisa o conteúdo encontrado
4. Retorna um veredito fundamentado para cada afirmação

Todas as regras do sistema são bem definidas para garantir o melhor funcionamento possível — desde a extração dos claims até a seleção das fontes e a geração do veredito final.

---

## Como funciona tecnicamente

```
Input do usuário
      ↓
Análise pela IA (OpenRouter / Llama 3.3 70B)
      ↓
Extração dos claims verificáveis
      ↓
Match com categorias e fontes confiáveis
      ↓
Busca no Google via Serper API (site:dominio claim)
      ↓
Extração de conteúdo relevante das páginas
      ↓
Veredito final gerado pela IA
```

---

## Tecnologias

| Camada      | Tecnologia                                    |
|-------------|-----------------------------------------------|
| Back-end    | Node.js + Express 5                           |
| IA          | OpenRouter (Llama 3.3 70B + fallback)         |
| Busca       | Serper API (Google Search)                    |
| Scraping    | Cheerio                                       |
| Front-end   | HTML, CSS, JavaScript puro                    |
| Config      | dotenv                                        |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- Chave de API do [OpenRouter](https://openrouter.ai/keys)
- Chave de API do [Serper](https://serper.dev)

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Foxcuukinho/Informus.git
cd Informus
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
IA_API_KEY=sua_chave_openrouter_aqui
SERPER_API_KEY=sua_chave_serper_aqui
```

> Obtenha sua chave do OpenRouter em [openrouter.ai/keys](https://openrouter.ai/keys)  
> Obtenha sua chave do Serper em [serper.dev](https://serper.dev)

### 4. Inicie o servidor

```bash
node back-end/server.js
```

### 5. Acesse no navegador

```
http://localhost:3000
```

---

## Estrutura do projeto

```
Informus/
├── back-end/
│   ├── server.js             # Servidor Express, rotas e lógica principal
│   ├── prompts.js            # Prompts da IA separados do código
│   └── sources.json          # Fontes confiáveis por categoria
├── front-end/
│   ├── index.html            # Interface do usuário
│   ├── script.js             # Lógica do front-end
│   ├── style.css             # Estilos
│   └── informus_favicon.svg  # Logo/favicon
├── .env                      # Variáveis de ambiente (não commitado)
├── .gitignore
└── README.md
```

---

## Fontes confiáveis suportadas

| Categoria            | Fontes                                      |
|----------------------|---------------------------------------------|
| Saúde e Medicina     | WHO, Ministério da Saúde, BVS               |
| Ciência e Tecnologia | NASA, MCTI                                  |
| História             | Britannica, IPHAN                           |
| Política e Leis      | Planalto, Senado, STF, Câmara               |
| Meio Ambiente        | IBAMA, IPCC, INPE                           |
| Economia             | Banco Central, IBGE, FMI, IPEA             |
| Vacinas              | Ministério da Saúde, WHO Immunization       |
| Espaço e Astronomia  | NASA, ESA                                   |

---

## API

### `POST /startsearch`

Recebe um texto e retorna a análise dos claims verificáveis.

**Request:**
```json
{
  "text": "A Terra é plana e a NASA está escondendo isso"
}
```

**Response (checkable):**
```json
{
  "checkable": true,
  "matched": true,
  "claims": [
    {
      "claimText": "The Earth is flat",
      "urls": ["https://www.nasa.gov"],
      "searchUrls": [
        "https://www.nasa.gov/earth-shape",
        "https://www.nasa.gov/solar-system"
      ]
    },
    {
      "claimText": "NASA is hiding that the Earth is flat",
      "urls": ["https://www.nasa.gov"],
      "searchUrls": [
        "https://www.nasa.gov/fact-or-fiction"
      ]
    }
  ]
}
```

**Response (não verificável):**
```json
{
  "checkable": false,
  "matched": false,
  "claims": []
}
```

---

## Observações

- O arquivo `.env` **não deve ser commitado** — já está no `.gitignore`
- O projeto usa **ES Modules** (`"type": "module"`), use `import/export` em vez de `require`
- O modelo principal é o `meta-llama/llama-3.3-70b-instruct:free` com fallback automático para `openrouter/free`
- A Serper busca dentro do domínio das fontes confiáveis usando `site:dominio claim`

---

## To-do

- [ ] FastSearch — verificação rápida sem busca web
- [ ] Extração de conteúdo das páginas com Cheerio
- [ ] Veredito final gerado pela IA com base no conteúdo extraído
- [ ] Interface de resultado mais detalhada
