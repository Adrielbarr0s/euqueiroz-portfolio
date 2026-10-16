# 🎬 euqueiroz · Direção Criativa & Estratégia Visual

<p align="center">
  <a href="https://euqueiroz.vercel.app">
    <img src="https://img.shields.io/badge/Demo-euqueiroz.vercel.app-2563eb?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Demo" />
  </a>
  <img src="https://img.shields.io/badge/Angular-22.0-dd0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 22" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Status-Produção-10b981?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <strong>Plataforma e portfólio digital de Jorge Queiroz</strong>, focado em posicionamento institucional, produções audiovisuais cinematográficas e gestão de presença visual para empresas e eventos de alto padrão.
</p>

---

## 🌐 Visite o Projeto Online
Acesse a aplicação em produção hospedada na Vercel:  
👉 **[euqueiroz.vercel.app](https://euqueiroz.vercel.app)**

---

## 🎯 Proposta de Valor & Estrutura Visual

A vitrine foi desenhada sob um conceito **cinematográfico escuro (*Dark Studio*)**, com luzes ambientais difusas, foco na retenção do visitante e uma divisão hierárquica clara em três pilares:

### 1. 🏛️ Comunicação Institucional & Governamental
- Espaço dedicado para projetos de validação oficial e secretarias públicas.
- Destaques em cartões dourados com selos de credibilidade e escopo de atuação.
- Acesso direto às publicações oficiais e reportagens no Instagram.

### 2. 🎥 Audiovisual Freelancer (Cinema & 4K)
- Mostra de produções de vídeo de nível cinematográfico (*Arraiá Aurenivia Ribeiro* e *Fronteiras*).
- Reprodutores nativos HTML5 em proporção panorâmica uniforme **16:9** (*widescreen*).
- Vídeos codificados com **`+faststart`** e taxa de bits otimizada para carregamento imediato sem *buffering* em redes móveis.

### 3. 📸 Social PRO & Cobertura Fotográfica
- Vitrine autoral organizada em grelha responsiva estilo *masonry*.
- 26 fotografias com classificação temática autêntica:
  - *Batizados & Celebrações Litúrgicas*
  - *Ensaios Infantis & Estúdio*
  - *Festas & Aniversários Temáticos*
  - *Ensaios Externos ao Pôr do Sol (Golden Hour)*
- Paginação dinâmica sob demanda (*Carregar mais*) e visualização em janela modal (*Lightbox*).

---

## ✨ Principais Funcionalidades

- **Comparador RAW / Color Grading**: Ferramenta interativa no topo da página (*Hero*) com moldura de visor de câmara 4K HUD, permitindo arrastar o slider para comparar o antes e depois da gradação de cor em tempo real.
- **Configurador Interativo de Orçamento**: Modal dinâmico onde o cliente seleciona os serviços desejados e o perfil de contratante (Empresarial ou Pessoal), gerando uma mensagem estruturada e personalizada diretamente para o WhatsApp oficial.
- **Direcionamento Específico por Fotografia**: Cada imagem na galeria permite ao visitante solicitar um orçamento focado exatamente no estilo e padrão daquela foto.
- **Microinterações & Performance**: Efeitos de *hover*, iluminação dinâmica, cantos angulados de foco de câmara e transições fluidas sem dependências externas pesadas.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **Angular 22** | Arquitetura moderna baseada em *Standalone Components* e nova sintaxe de controlo de fluxo (`@if`, `@for`). |
| **Angular Signals** | Gestão de estado reativa de alta performance (`signal`, `computed`). |
| **TypeScript** | Tipagem estática rigorosa para projetos, fotografias e orçamentos. |
| **Vanilla CSS Moderno** | Design responsivo *mobile-first*, paleta HSL balanceada, efeitos de *glassmorphism* e gradientes radiais ambientais. |
| **FFmpeg (Pipeline)** | Otimização de mídia com compressão H.264, recorte de bordas pretas (*crop*) e *moov atom faststart*. |
| **Vercel** | Hospedagem global e integração contínua (CI/CD) via Git. |

---

## 📂 Estrutura do Projeto

```text
euqueiroz-portfolio/
├── public/
│   ├── foto-color.jpg         # Imagem pós-color grading para o slider
│   ├── foto-pb.jpg            # Imagem RAW/P&B para o slider
│   └── portfolio/             # Acervo de mídia
│       ├── foto-01.jpeg ...   # Fotos reais organizadas da galeria
│       ├── video-arraia.mp4   # Vídeo otimizado Full HD (16:9 faststart)
│       └── video-fronteiras.mp4 # Produção cinematográfica Full HD (16:9)
├── src/
│   ├── app/
│   │   ├── app.ts             # Lógica reativa, dados tipados e handlers de contato
│   │   ├── app.html           # Template semântico estruturado em 3 blocos
│   │   ├── app.css            # Design system, layout dos players e animações
│   │   ├── app.config.ts      # Configuração global da aplicação Angular
│   │   └── app.spec.ts        # Testes unitários
│   ├── index.html             # HTML base com fontes e meta tags
│   ├── main.ts                # Inicialização standalone da aplicação
│   └── styles.css             # Estilos globais e reset
├── package.json
└── README.md
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior recomendado)
- **npm** (v9 ou superior)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Adrielbarr0s/euqueiroz-portfolio.git
   cd euqueiroz-portfolio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   npx ng serve
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:4200](http://localhost:4200) para visualizar o projeto localmente com *hot-reload*.

---

## 📦 Compilação para Produção

Para gerar o pacote otimizado de produção:

```bash
npm run build
```

Os arquivos compilados serão gerados no diretório `dist/euqueiroz-portfolio`.

---

## 📱 Contato & Redes

- **Instagram Profissional:** [@jorgequeirozl_](https://www.instagram.com/jorgequeirozl_)
- **WhatsApp Oficial:** Atendimento e orçamentos via plataforma

---

<p align="center">
  <sub>Desenvolvido com excelência visual e rigor técnico · 2026 euqueiroz</sub>
</p>
