#!/bin/bash

# Criar o diretório do projeto
mkdir meu-app-react && cd meu-app-react

# Inicializar o projeto com Vite + React + TypeScript
npm create vite@latest . -- --template react-ts

# Remover o package.json gerado pelo Vite
rm package.json

# Criar o package.json personalizado
cat <<EOL > package.json
{
  "name": "sandbox-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build:pwa": "workbox generateSW"
  }
}
EOL

# Instalar dependências essenciais
npm install

# Instalar React Router
npm install react-router-dom

# Instalar Auth0 para autenticação JWT
npm install @auth0/auth0-react

# Instalar loglevel para tratamento de erros
npm install loglevel

# Instalar Material-UI e dependências relacionadas
npm install @mui/material @emotion/react @emotion/styled

# Instalar Redux Toolkit e React-Redux
npm install @reduxjs/toolkit react-redux

# Instalar React Query para requisições de dados
npm install @tanstack/react-query

# Instalar Socket.IO para comunicação em tempo real
npm install socket.io-client

# Instalar Dexie.js para IndexedDB
npm install dexie

# Instalar React Window para manipulação de grandes listas
npm install react-window

# Instalar React Hook Form para manipulação de formulários
npm install react-hook-form

# Instalar Storybook para documentação
npx storybook init

# Instalar Jest e React Testing Library para testes
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Configurar Jest (Opcional, se não estiver configurado automaticamente)
npx ts-jest config:init

# Instalar Workbox para PWA
npm install workbox-cli --global

# Instalação completa
echo "Instalação completa! Execute 'npm run dev' para iniciar o projeto."
