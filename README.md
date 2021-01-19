<div align="center">
  <h1 id="title">John Bot</h1>
  <div align="center">
    <a href="https://www.travis-ci.com/github/pedrinholemes/john-bot/branches"><img alt="Travis Build" src="https://img.shields.io/travis/com/pedrinholemes/john-bot/master?style=flat-square"></a>&nbsp;
    <a href="https://github.com/pedrinholemes/john-bot/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/pedrinholemes/john-bot?style=flat-square"></a>&nbsp;
	  <a href="https://github.com/pedrinholemes/john-bot"><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/pedrinholemes/john-bot?style=flat-square"></a>&nbsp;
  	<a href="https://github.com/pedrinholemes/john-bot"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/pedrinholemes/john-bot?style=flat-square"></a>&nbsp;
  	<a href="https://github.com/pedrinholemes/john-bot/releases"><img alt="GitHub latest release" src="https://img.shields.io/github/v/release/pedrinholemes/john-bot?include_prereleases&style=flat-square"></a>&nbsp;
	  <a href="https://discord.js.org/"><img alt="Lib" src="https://img.shields.io/badge/lib-Discord.JS-blue?style=flat-square"></a>&nbsp;
  	<a href="https://john-bot.pedrinholemes.repl.co/invite"><img alt="Bot Status" src="https://img.shields.io/website?down_color=red&down_message=offline&style=flat-square&up_color=blue&up_message=online&url=https%3A%2F%2Fjohn-bot.pedrinholemes.repl.co%2F&label=bot%20status"></a>&nbsp;
  	<a href="https://github.com/pedrinholemes/john-bot"><img alt="GitHub license" src="https://img.shields.io/github/license/pedrinholemes/john-bot?style=flat-square"></a>&nbsp;
  	<a href="#suporte"><img alt="Support Server" src="https://img.shields.io/badge/dynamic/json?label=Support&query=$.name&url=https%3A%2F%2Fdiscord.com%2Fapi%2Fguilds%2F793638053729533972%2Fwidget.json&style=flat-square&logo=discord&logoColor=white"></a>&nbsp;
    <a href="https://john-bot.pedrinholemes.repl.co"><img alt="Uptime Robot ratio (7 days)" src="https://img.shields.io/uptimerobot/ratio/7/m786506436-9fd0e0b245bdc136b88a0a29?style=flat-square"></a>
    <a href="#como-contribuir-para-o-projeto"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=flat-square" alt="Commitizen Friendly"/></a>
  </div>
  <p align="center">Um bot de utilidades para seu servidor no Discord </p>
</div>

<h4 id="status" align="center">
	🚧 Projeto em beta... 🚧
</h4>

<h2 id="tabela-de-conteúdo" align="center">Tópicos</h2>
<p align="center"> 
	<a href="#objetivo">Objetivo</a> • 
	<a href="#roadmap">Roadmap</a> • 
	<a href="#tecnologias">Tecnologias</a> • 
	<a href="#como-contribuir-para-o-projeto">Contribuição</a> • 
	<a href="#instalacao">Instalação</a> •  
	<a href="#suporte">Suporte</a> •
	<a href="#licença">Licença</a>
</p>

<h3 id="roadmap">Roadmap</h3>

- Comandos
  - [x] Help
  - [x] Ping
  - [x] Reply
  - [x] Ideia
- Grupos
  - [x] Musica
    - [x] Play
    - [ ] Pause
    - [ ] Add
    - [ ] Remove
    - [x] Skip
    - [ ] Go Back
    - [x] Queue
    - [x] Now
  - [ ] Moderação
    - [x] Kick
    - [ ] Unkick
    - [ ] Ban
    - [ ] Unban
    - [ ] Mute
    - [ ] Unmute

<h3 id="tecnologias">Oque foi usado?</h3>

As seguintes ferramentas foram usadas na construção do projeto:

- **Base**
  - [Node.js](https://nodejs.org/pt-br/)
  - [MongoDB](https://mongodb.com/)
- **Bot**
  - [discord.JS](http://npmjs.com/package/discord.JS)
  - [@discordjs/opus](http://npmjs.com/package/@discordjs/opus)
  - [yt-search](http://npmjs.com/package/yt-search)
  - [ytdl-core-discord](http://npmjs.com/package/ytdl-core-discord)
- **Web**
  - [react](http://npmjs.com/package/react)
  - [react-dom](http://npmjs.com/package/react-dom)
  - [styled-components](http://npmjs.com/package/styled-components)
  - [@primer/components](http://npmjs.com/package/@primer/components)
- **API**
  - [express](http://npmjs.com/package/express)
  - [morgan](http://npmjs.com/package/morgan)
  - [cors](http://npmjs.com/package/cors)
  - [discord-oauth2](http://npmjs.com/package/discord-oauth2)
  - [passport](http://npmjs.com/package/passport)
  - [passport-local](http://npmjs.com/package/passport-local)
  - [cookie](http://npmjs.com/package/cookie)
  - [@hapi/iron](http://npmjs.com/package/@hapi/iron)
- **Shared**
  - **CodeStyle**
    - [eslint](http://npmjs.com/package/eslint)
    - [prettier](http://npmjs.com/package/prettier)
  - **Prod**
    - [chalk](http://npmjs.com/package/chalk)
    - [axios](http://npmjs.com/package/axios)
    - [uuid](http://npmjs.com/package/uuid)
    - [dotenv](http://npmjs.com/package/dotenv)
    - [mongoose](http://npmjs.com/package/mongoose)
    - [date-fns](http://npmjs.com/package/date-fns)
  - **Dev**
    - [typescript](http://npmjs.com/package/typescript)
    - [nodemon](http://npmjs.com/package/nodemon)
    - [sucrase](http://npmjs.com/package/sucrase)

<h2 id="instalacao">Instalação</h2>

<h3 id="pre-requisitos">Pré-requisitos</h3>

<h3 id="ferramentas">Ferramentas</h3>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[**Git**](https://git-scm.com), [**Node.js**](https://nodejs.org/pt-br/), [**Yarn**](https://yarnpkg.com/). Além disto é bom ter um editor para trabalhar com o código como [**VSCode**](https://code.visualstudio.com/).

<h4 id="tokens">Tokens</h4>

Você também precisará de um token para o seu bot. Para conseguir um token, entre no [Portal do Desenvolvedor](https://discord.com/developers/applications) no site oficial do Discord, selecione uma **aplicação** - _se necessário crie uma clicando no botão **New Application**_ - então clique em **Bot**, se necessário clique em **Add Bot** e confirme que deseja criar um Bot em **Yes, do it!**.

<p style="color: red; font-weight: 600;">⚠️ Não se esqueça que essa ação é irreversível, se você criar o Bot, não tem como exclui-lo, a não ser o App por completo. ⚠️</p>

Depois que seu bot foi criado, clique em **Copy** para copiar o token do seu Bot.

<p style="color: red; font-weight: 600;">⚠️ O token é particular de cada Bot, com ele é possível logar como seu Bot utilizando libs de conexão com a Discord Bot API, sendo ela via JDA no Java, discord.py no Python, Discord.JS no JavaScript ou Typescript, entre outras. Se por um acaso você vazou ele, clique em <b>Regenerate</b> para gerar outro token e em <b>Copy</b> para copia-lo. ⚠️</p>

<h3 id="iniciando-o-seu-bot">Iniciando o seu Bot</h3>

```bash
# Clone este repositório
$ git clone https://github.com/pedrinholemes/john-bot.git -b master
# para dev troque: master -> dev

# Acesse a pasta do projeto no terminal
$ cd john-bot

# Instale as dependências
$ yarn install

# Entre na pasta desejada
$ cd packages/<bot | web | api>

# Copie o template de variáveis ambiente
$ cp .env.example .env

# E popule o `.env` com os valores desejados:
# - Vim
$ vim .env
# - VSCode - abra o Vscode na pasta do projeto e edite o `.env`
$ code .

# Execute a aplicação
# Em modo de desenvolvimento
$ yarn dev

# Ou em modo de produção
# Se for WEB execute:
$ yarn build && yarn start
# senão simplesmente:
$ yarn start

# Veja os logs para entender oque o package esta fazendo:
# Bot: estará logado automaticamente sem um servidor HTTP
# Web: estará disponível em seu `localhost:3000`
# API: estará disponível em seu `localhost:3333/api`
```

<!-- ALL-CONTRIBUTORS-BADGE:START -->
<!-- [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange?style=flat-square)](#contributors) -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<h2 id="como-contribuir-para-o-projeto">Como contribuir para o projeto</h2>

[![Commitizen-friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen?style=flat-square)](http://commitizen.github.io/cz-cli/)

- 1. Faça um **fork** do projeto.
- 2. Crie uma nova branch com as suas alterações: `git checkout -b feature/my-feature`
- 3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit`
  - 3.1. Espere o `lint-staged` fazer o lint dos arquivos.
  - 3.2. Selecione as configurações desejadas para o commit.
  - 3.3. Espere o `commit-lint` fazer o lint do seu commit.
- 4. Envie as suas alterações: `git push origin feature/my-feature`
  <!-- > Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md) -->

<h2 id="suporte">Suporte</h2>

Entre em nosso servidor de suporte: [&nbsp;John Bot Server&nbsp;](https://discord.gg/7T44HpVVxK)

## Autor

<img src="https://github.com/pedrinholemes.png" style="border-radius: 50%" width="150" /><br>
<b>Pedro Henrique Lemes<a href="https://pedrinholemes.vercel.app/" title="Meu Website">🚀</a></b>

[![Twitter]](https://twitter.com/pedrinho_lemes)&nbsp;[![Gmail]](mailto:pedroca21265@gmail.com)&nbsp;[![Instagram]](https://www.instagram.com/pedrinho.lemes/)<br>[![Discord]](https://discordapp.com/users/700327812950786048)&nbsp;[![Rocketseat]](https://app.rocketseat.com.br/me/pedrinholemes)

## Licença

Este projeto esta sobe a licença [Mozilla Public License 2.0](./LICENSE).

---

Feito com ❤️ por Pedro Henrique 👋🏽 [Entre em contato!](https://discordapp.com/users/700327812950786048)

[twitter]: https://img.shields.io/badge/-@pedrinho_lemes-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/pedrinho_lemes
[gmail]: https://img.shields.io/badge/-pedroca21265@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:pedroca21265@gmail.com
[instagram]: https://img.shields.io/badge/-@pedrinho.lemes-5851DB?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/pedrinho.lemes/
[discord]: https://img.shields.io/badge/-@pedrinho.lemes-7289DA?style=flat-square&logo=Discord&logoColor=white&link=https://discordapp.com/users/700327812950786048
[rocketseat]: https://img.shields.io/badge/-@pedrinholemes-8257e6?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGRSURBVHgB7ZiBTcMwEEV/mKAjhA1ggzIB3YBsQDeIN4ANygYRE3QEYAJng3aD405xVMs41FES55B40peVNK5/z3fnKsA/0yiQGSIqebCsT1br6b0oihZrIuZYluLssTZsohkw1wzNWXyLefFnHkrWF+sQeaRl3fP2npEbNlfTde6wBrIwpXFiHbMavVIMQ+yQCxeRMRjkgtLyzqdBLnixisZhqWvcWcxJ3p1oHCXmgr9s40zI+OJ+fe3dszSOeU8OuiR+LEqWxvGaum7ySSLGeNhgOi2fGrepD9+kPERdrsxijvWAJWCThsYjc96862WbMXUF8fGLIfmsdmMVzMtzUlBXsdLvbGBOIjVHGkw2eGA9uaj022egBTazd6bEaAltsKmtt61WoglNeBH0OS4VzaQ+GPAYXJ+dai1FUgVtpcTauNbS97fSqVERMcFVrI+ewnDR+lEUyERKkWwj91pogeL/9XRscdCUewy0ECkOAy1EisNAE0FDNtAGXV5fGGjE5Z+BRtjYTq05gXK+afrrfAMkwQ4y3On//AAAAABJRU5ErkJggg==&logoColor=white&link=https://app.rocketseat.com.br/me/pedrinholemes
