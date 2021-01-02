<div align="center">
  <h1 id="title">John Bot</h1>
  <div id="badges">
	  <a href="https://www.travis-ci.com/github/pedrinholemes/john-bot/branches"><img alt="Travis Build" src="https://img.shields.io/travis/com/pedrinholemes/john-bot/master?style=flat-square"></a>
    <a href="https://github.com/pedrinholemes/john-bot/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/pedrinholemes/john-bot?style=flat-square"></a>
	  <a href="https://github.com/pedrinholemes/john-bot"><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/pedrinholemes/john-bot?style=flat-square"></a>
	  <a href="https://github.com/pedrinholemes/john-bot"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/pedrinholemes/john-bot?style=flat-square"></a>
	  <a href="https://github.com/pedrinholemes/john-bot/releases"><img alt="GitHub latest release" src="https://img.shields.io/github/v/release/pedrinholemes/john-bot?include_prereleases&style=flat-square"></a>
  	<a href="https://discord.js.org/"><img alt="Lib" src="https://img.shields.io/badge/lib-Discord.JS-blue?style=flat-square"></a>
  	<a href="https://john-bot.pedrinholemes.repl.co/invite"><img alt="Bot Status" src="https://img.shields.io/website?down_color=red&down_message=offline&style=flat-square&up_color=blue&up_message=online&url=https%3A%2F%2Fjohn-bot.pedrinholemes.repl.co%2F&label=bot%20status"></a>
  	<a href="https://github.com/pedrinholemes/john-bot"><img alt="GitHub license" src="https://img.shields.io/github/license/pedrinholemes/john-bot?style=flat-square"></a>
  	<a href="https://discord.com/invite/ynP3CdMx"><img alt="Support Server" src="https://img.shields.io/badge/dynamic/json?label=Support&query=$.name&url=https%3A%2F%2Fdiscord.com%2Fapi%2Fguilds%2F793638053729533972%2Fwidget.json&style=flat-square&logo=discord&logoColor=white"></a>
  </div>
  <p align="center" id="mini-description">Um bot de utilidades para seu servidor no Discord </p>
</div>

<h4 id="status" align="center">
	🚧 Projeto em desenvolvimento… 🚧
</h4>

<h2 id="tabela-de-conteudo" align="center">Tópicos</h2>
<p align="center"> 
	<a href="#objetivo">Objetivo</a> • 
	<a href="#roadmap">Roadmap</a> • 
	<a href="#tecnologias">Tecnologias</a> • 
	<a href="#contribuição">Contribuição</a> • 
	<a href="#Instalação">Instalação</a> • 
	<a href="#licença">Licença</a>
</p>

### Objetivo 

### Roadmap

- Comandos
  - [x] Help
  - [x] Ping
- Grupos
  - [ ] Musica
    - [ ] Play
    - [ ] Pause
    - [ ] Add
    - [ ] Remove
    - [ ] Skip
    - [ ] Go Back
    - [ ] Join
    - [ ] Leave
  - [ ] Moderação
    - [x] Kick
    - [ ] Unkick
    - [ ] Ban
    - [ ] Unban
    - [ ] Mute
    - [ ] Unmute

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Discord.JS](https://discord.js.org/)
- [Express](http://expressjs.com/)
- [date-fns](http://date-fns.org/)
- [dotEnv](https://github.com/motdotla/dotenv#readme)
- [Sucrase](https://sucrase.io/)
<!-- - [@discordjs/opus](https://github.com/discordjs/opus#readme) -->
<!-- - [TypeScript](https://www.typescriptlang.org/) -->

## Instalação

### Pré-requisitos

#### Ferramentas

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[**Git**](https://git-scm.com), [**Node.js**](https://nodejs.org/pt-br/), [**Yarn**](https://yarnpkg.com/). Além disto é bom ter um editor para trabalhar com o código como [**VSCode**](https://code.visualstudio.com/).

#### Tokens

Você tambem precisará de um token para o seu bot. Para conseguir um token, entre no [Portal do Desenvolvedor](https://discord.com/developers/applications) no site oficial do Discord, selecione uma **aplicação** - _se nessesário crie uma clicando no botão **New Application**_ - então clique em **Bot**, se nessesário clique em **Add Bot** e confirme que deseja criar um Bot em **Yes, do it!**.

<p style="color: red; font-weight: 600;">⚠️ Não se esqueça que essa ação é irreversivel, se você criar o Bot, não tem como exclui-lo, a não ser o App por completo. ⚠️</p>

Depois que seu bot foi criado, clique em **Copy** para copiar o token do seu Bot.

<p style="color: red; font-weight: 600;">⚠️ O token é particular de cada Bot, com ele é possivel logar como seu Bot utilizando libs de conexão com a Discord Bot API, sendo ela via JDA no Java, discord.py no Python, Discord.JS no JavaScript ou Typescript, entre outras. Se por um acaso você vazou ele, clique em <b>Regenerate</b> para gerar outro token e em <b>Copy</b> para copia-lo. ⚠️</p>

### Iniciando o seu Bot

```bash
# Clone este repositório
$ git clone https://github.com/pedrinholemes/john-bot meu-bot

# Acesse a pasta do projeto no terminal/cmd
$ cd meu-bot

# Copie o template de variaveis ambiente
$ cp .env.example .env

# E coloque os valores utilizando:
# - Vim
$ vim .env
# - VSCode - abra o Vscode na pasta do projeto e edite o `.env`
$ code . 
# - NotePad
$ notepad .env
# - Nano
$ nano .env

# Instale as dependências
$ yarn install

# Execute a aplicação
# Em modo de desenvolvimento 
$ yarn dev

# Ou em modo de produção
# Faça o Build
$ yarn build
# Rode o Script
$ yarn start

# O servidor inciará na porta 3000, e Bot já estará logado no Discord
```

<!-- ALL-CONTRIBUTORS-BADGE:START -->
<!-- [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors) -->
<!-- ALL-CONTRIBUTORS-BADGE:END --> 

## Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

## Autor

<a href="https://github.com/pedrinholemes">
 <img style="border-radius: 50%;" src="https://github.com/pedrinholemes.png" width="100px;" alt=""/>
 <br />
 <sub><b>Pedro Henrique Lemes</b></sub></a> <a href="https://pedrinholemes.vercel.app/" title="Meu Site">🚀</a>
 <br />

[![Twitter Badge](https://img.shields.io/badge/-@pedrinho_lemes-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/pedrinho_lemes)](https://twitter.com/pedrinho_lemes)
[![Gmail Badge](https://img.shields.io/badge/-pedroca21265@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:pedroca21265@gmail.com)](mailto:pedroca21265@gmail.com)
[![Instagram Badge](https://img.shields.io/badge/-@pedrinho.lemes-5851DB?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/pedrinho.lemes/)](https://www.instagram.com/pedrinho.lemes/)
[![Discord Badge](https://img.shields.io/badge/-@pedrinho.lemes-7289DA?style=flat-square&logo=Discord&logoColor=white&link=https://discordapp.com/users/700327812950786048)](https://discordapp.com/users/700327812950786048) 
[![Rocketseat Badge](https://img.shields.io/badge/-@pedrinholemes-8257e6?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGRSURBVHgB7ZiBTcMwEEV/mKAjhA1ggzIB3YBsQDeIN4ANygYRE3QEYAJng3aD405xVMs41FES55B40peVNK5/z3fnKsA/0yiQGSIqebCsT1br6b0oihZrIuZYluLssTZsohkw1wzNWXyLefFnHkrWF+sQeaRl3fP2npEbNlfTde6wBrIwpXFiHbMavVIMQ+yQCxeRMRjkgtLyzqdBLnixisZhqWvcWcxJ3p1oHCXmgr9s40zI+OJ+fe3dszSOeU8OuiR+LEqWxvGaum7ySSLGeNhgOi2fGrepD9+kPERdrsxijvWAJWCThsYjc96862WbMXUF8fGLIfmsdmMVzMtzUlBXsdLvbGBOIjVHGkw2eGA9uaj022egBTazd6bEaAltsKmtt61WoglNeBH0OS4VzaQ+GPAYXJ+dai1FUgVtpcTauNbS97fSqVERMcFVrI+ewnDR+lEUyERKkWwj91pogeL/9XRscdCUewy0ECkOAy1EisNAE0FDNtAGXV5fGGjE5Z+BRtjYTq05gXK+afrrfAMkwQ4y3On//AAAAABJRU5ErkJggg==&logoColor=white&link=https://app.rocketseat.com.br/me/pedrinholemes)](https://app.rocketseat.com.br/me/pedrinholemes) 

## Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Pedro Henrique 👋🏽 [Entre em contato!](https://discordapp.com/users/700327812950786048)