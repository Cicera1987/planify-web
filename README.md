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
