# 🌍 LangUp - Seu Vocabulário ao Próximo Nível

O **LangUp** é uma aplicação web progressiva (PWA) projetada para ajudar estudantes de idiomas a organizar, expandir e revisar seu vocabulário de forma eficiente. O projeto utiliza técnicas de repetição através de Flashcards interativos e consumo de APIs para enriquecimento de dados.

## ✒️ Autor

- **Nome:** Sara Pereira de Almeida

---

## 🔗 Links Importantes

- **📱 Prototipação no Figma:** [Ver Design no Figma](https://www.figma.com/design/5LnKaMg7GQc4M9ZiOci7CG/Untitled?m=auto&t=ybOCIGHXYd55Xa4H-6)
- **💻 Site em Produção (GitHub Pages):** [Acessar Aplicação Online](https://saraalmeida07.github.io/LangUp/)
- **📂 Repositório:** [Acessar Código Fonte](https://github.com/SaraAlmeida07/LangUp)

> **⚠️ Nota sobre o GitHub Pages:** Como esta aplicação utiliza uma API local (`json-server`) para persistência de dados, as funcionalidades de cadastro e login **não funcionarão** na versão online do GitHub Pages. Para testar a aplicação completa, siga as instruções de execução local abaixo.

---

## 🚀 Funcionalidades

- **Cadastro e Autenticação:** Criação de conta com validação de senha segura (Hash SHA-256) e máscara de telefone automática.
- **Gestão de Vocabulário:** CRUD completo (Criar, Ler, Deletar) de palavras via API.
- **Dicionário Integrado:** Busca automática de definições em inglês consumindo a **Free Dictionary API**.
- **Flashcards Interativos:** Modo de estudo com animações de virar card e feedback de dificuldade.
- **Dashboard Dinâmica:** Visualização de estatísticas em tempo real e saudação personalizada.
- **Responsividade Total:** Layout adaptável para Desktop, Tablet e Mobile.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido para a disciplina de Frameworks Web, aplicando:

- **Front-end:** HTML5 Semântico, CSS3
- **Estilização:** [Sass (SCSS)](https://sass-lang.com/) com arquitetura modular (7-1 pattern) e [Bootstrap 5](https://getbootstrap.com/) (Grid System, Componentes).
- **Lógica:** JavaScript (ES6+) com Programação Orientada a Objetos (Classes).
- **Bibliotecas:**
    - [jQuery](https://jquery.com/) (Manipulação de DOM e Animações `fadeIn`).
    - [jQuery Mask Plugin](https://igorescobar.github.io/jQuery-Mask-Plugin/) (Máscaras de input).
- **Back-end (Simulado):** [JSON Server](https://github.com/typicode/json-server) para persistência de dados (POST/GET/DELETE).
- **Ferramentas:** Git, Node.js, NPM, Prettier.

---

## 📦 Como Rodar o Projeto Localmente (Obrigatório para RA5)

Para que o sistema de login e cadastro funcione, é necessário rodar a API Fake localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) e NPM instalados.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/SaraAlmeida07/LangUp.git](https://github.com/SaraAlmeida07/LangUp.git)
    ```

2.  **Instale as dependências:**
    Abra a pasta do projeto no terminal e execute:

    ```bash
    npm install
    ```

3.  **Inicie o JSON Server:**
    Mantenha este terminal **aberto** enquanto utiliza o site. Você pode usar o script configurado no `package.json`:

    ```bash
    npx json-server --watch db.json --port 3000
    ```

4.  **Abra a Aplicação:**
    Utilize a extensão **Live Server** do VS Code no arquivo `index.html`.

---

## ✅ Checklist de Avaliação (RA1 a RA5)

O projeto cumpre os seguintes requisitos da disciplina:

- [x] **RA1 - Layout e Estilização:**
    - Layout responsivo (Grid/Flexbox) e Fluido (`rem`).
    - Design System consistente implementado com **Sass**.
    - Imagens responsivas (`img-fluid`) e otimizadas (`<picture>`).
- [x] **RA2 - Formulários:**
    - Validação HTML5 (`required`, `minlength`) e Regex customizado.
    - Feedback visual de validação (bordas coloridas).
- [x] **RA3 - Ferramentas:**
    - Configuração de ambiente Node.js/NPM e versionamento Git.
    - Formatação automática com **Prettier**.
- [x] **RA4 - Bibliotecas JS:**
    - Uso de **jQuery** para animações de interface.
    - Uso de **Plugin** para máscara de telefone.
- [x] **RA5 - Requisições Assíncronas (API):**
    - [x] **GET/POST/DELETE** para API Local (`json-server`) para persistir usuários e palavras.
    - [x] **GET** para API Pública (`dictionaryapi.dev`) para buscar definições.

---

**Desenvolvido por Sara Pereira de Almeida.**
