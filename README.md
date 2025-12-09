# Planify - WEB

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)

Frontend do **Planify**, uma aplicação web progressiva (PWA) para gestão de agendamentos, clientes, serviços e pacotes voltada para profissionais da beleza.  
Desenvolvido com **Next.js + TypeScript**, interface responsiva e experiência similar a aplicativos nativos.

---

## Tecnologias Utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **PWA**
- **Redux / Context API (se aplicável)**
- **Axios**
- **Firebase Push Notification**
- **Icones / UI Library (caso utilize)**
- **Git para versionamento**

---

## Funcionalidades Principais

- Interface web responsiva, instalável como PWA
- Autenticação com **JWT** e **Google OAuth2**
- Gestão de **clientes**, **serviços** e **pacotes**
- Visualização e controle de **agenda e horários**
- Criação, edição e cancelamento de **agendamentos**
- **Notificações push** via Firebase
- Rotas protegidas e persistência de sessão
- Integração com o backend do Planify

---

## Estrutura do Projeto (sugestão)

```bash
planify-frontend/
├── public/              # assets, ícones, manifest.json, service-worker
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # componentes reutilizáveis
│   ├── pages/           # se usar pages router
│   ├── services/        # axios, api config
│   ├── store/           # estado global
│   ├── hooks/
│   ├── styles/
│   └── utils/
├── package.json
├── tailwind.config.js
├── next.config.js
├── README.md
└── LICENSE
```

## Início Rápido

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Deploy on Vercel

### Deploy
Hospedado em Vercel:

🔗 Acesse: https://planify-appointments.vercel.app/

## Como USar
- Ao Acessar a aplicação Web
- Acessar com a conta sua google, caso não tenha, cadastre seu perfil em (Cadastrar)

### Para fazer uma agendamento você precisa fazer alguns passos antes 
- Cadastrar horários de atendimento para liberar a agenda em (Meu Calendário)
- Cadastrar um tipo de Serviço em (Serviços)
- Caso queira cadastra um pacote de serviços, cadastre um Pacote de Serviços em ( Pacotes de Serviços)
  └── Obs: Ao cadastrar um contato ou cliente, você pode vincular um pacote a este cliente, porém deve cadatrar o pacote antes.
- Cadastrar um cliente ou Contato em (Meus Clientes)

### Fazer um agendamento para usar suas funcinalidades
- Em "Início" clicar em Agenda ou clicar em Agenda no "Sidebar"
- Clicar no botão "+"
- Escolher um "Cliente" para fazer um agendamento
  └── Você pode clicar no ":" e escolher uma opção no Popup "Editar Contato", "Agendar Atendiemnto" ou "inativar Contato"
  └── Porém se você clicar no cliente você vai navegar para a tela de detalhes para poder agendar um atendimento
  └── Tela de Detalhes, você pode clicar em "Agendamento" ou "->"
  └── Navegando para a próxima tela você pode escolher um horário no carrocel de horários os quais você ja liberou no seu calendário,
      ou você tambem pode clicar no ícone de calendário e escolher por lá também.
  └── Selecionar um serviço
  └── Clicar em "Agendar" . Assim você vai navegar de volta a tela de detalhes e o horário já vai estar agendado.
  └── Você pode voltar atravéz da Arrow "<", ou pode clicar direto em "Agenda" ou "Início" e verá a lista de agendamentos
  └── A Agenda é ordenada por data e hora "CRESCENTE" por dia e hora.
  └── Finalizar, Cancelar ou confirmar um agendamento. Em "Agenda" clicar no ":" e no popup escolha um status.
- Notificações - Toda e qualquer movimentação feita com a agenda o profissional recebe uma notificação via Push
  └── O Profissional pode clicar em "Notificações" e verficar suas notificações


## Para mais detalhes de deploy:
https://nextjs.org/docs/app/building-your-application/deploying


## 📄 License

Este projeto está licenciado sob os termos da **MIT License**.  
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.


## Autora

Cícera Ribeiro
Desenvolvedora Fullstack
Planify – Sistema de Gestão de Agendamentos para Profissionais da Beleza
Análise e Desenvolvimento de Sistemas(ADS) - Ulbra Torres
