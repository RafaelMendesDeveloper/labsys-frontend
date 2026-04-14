# labsys

Frontend do sistema **labsys**, construído com React + TypeScript + Vite.

## Stack

- **React 19** + **TypeScript**
- **Vite** — bundler e dev server
- **Tailwind CSS** — estilização
- **TanStack Query** — cache e sincronização de dados com a API
- **Zustand** — estado global
- **React Hook Form** + **Zod** — formulários e validação
- **Axios** — cliente HTTP com instância centralizada
- **React Router v7** — roteamento

## Pré-requisitos

- Node.js >= 20
- pnpm >= 9

## Instalação

```bash
pnpm install
```

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

| Variável       | Descrição            | Padrão                      |
| -------------- | -------------------- | --------------------------- |
| `VITE_API_URL` | URL base da API REST | `http://localhost:3000/api` |

## Scripts

| Comando              | Descrição                             |
| -------------------- | ------------------------------------- |
| `pnpm dev`           | Inicia o servidor de desenvolvimento  |
| `pnpm build`         | Build de produção                     |
| `pnpm preview`       | Serve o build de produção localmente  |
| `pnpm test`          | Roda os testes em modo watch          |
| `pnpm test:run`      | Roda os testes uma única vez          |
| `pnpm test:coverage` | Gera relatório de cobertura           |
| `pnpm lint`          | Verifica linting                      |
| `pnpm lint:fix`      | Corrige erros de lint automaticamente |
| `pnpm typecheck`     | Verifica tipos TypeScript             |
| `pnpm format`        | Formata o código com Prettier         |

## Estrutura de pastas

```
src/
├── assets/         # Imagens e ícones estáticos
├── components/
│   ├── ui/         # Primitivos do Design System (Button, Input…)
│   └── shared/     # Componentes compostos reutilizáveis (Header, Sidebar…)
├── features/       # Módulos por domínio de negócio
├── hooks/          # Custom hooks globais
├── pages/          # Páginas e rotas
├── services/       # Instância Axios e funções de API globais
├── store/          # Estado global (Zustand)
├── styles/         # Tokens CSS e tema global
├── types/          # Tipos e interfaces globais
└── utils/          # Funções utilitárias puras
```

## Qualidade de código

O projeto usa Husky para automatizar verificações em cada commit/push:

| Hook         | O que roda                 |
| ------------ | -------------------------- |
| `pre-commit` | ESLint + Prettier (staged) |
| `commit-msg` | Commitlint                 |
| `pre-push`   | Testes unitários           |

As mensagens de commit seguem o padrão **Conventional Commits** em português:

```
feat(auth): adiciona fluxo de login
fix(dashboard): corrige cálculo de totais
chore: atualiza dependências
```

Veja [conventions.md](conventions.md) para o guia completo de convenções do projeto.
