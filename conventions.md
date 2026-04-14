# 📐 Guia de Convenções — Frontend

> Documento de referência para padronização do desenvolvimento frontend.  
> Stack: **React + TypeScript**  
> Atualizado por: _[seu nome]_ | Versão: 1.0.0

---

## Sumário

1. [Estrutura de Pastas](#1-estrutura-de-pastas)
2. [Nomenclatura](#2-nomenclatura)
3. [Componentes](#3-componentes)
4. [TypeScript](#4-typescript)
5. [Hooks](#5-hooks)
6. [Estado Global](#6-estado-global)
7. [Chamadas de API](#7-chamadas-de-api)
8. [Estilo e CSS](#8-estilo-e-css)
9. [Commits e Git](#9-commits-e-git)
10. [Testes](#10-testes)
11. [Ferramentas de Qualidade](#11-ferramentas-de-qualidade)

---

## 1. Estrutura de Pastas

```
src/
├── assets/               # Imagens, fontes, ícones estáticos
├── components/
│   ├── ui/               # Primitivos do Design System (Button, Input, Modal…)
│   └── shared/           # Componentes compostos reutilizáveis (Header, Sidebar…)
├── features/             # Módulos por domínio de negócio
│   └── [feature-name]/
│       ├── components/   # Componentes exclusivos da feature
│       ├── hooks/        # Hooks exclusivos da feature
│       ├── services/     # Chamadas de API da feature
│       ├── types/        # Tipos e interfaces da feature
│       └── index.ts      # Barrel de exportações públicas
├── hooks/                # Custom hooks globais
├── services/             # Instância Axios e funções de API globais
├── store/                # Estado global (Zustand)
├── types/                # Tipos e interfaces globais
├── utils/                # Funções utilitárias puras
├── pages/                # Páginas / rotas (React Router)
└── styles/               # Tokens CSS e tema global
```

### Regras da estrutura

- **Features não importam umas das outras.** Comunicação entre features passa pelo estado global.
- **Só suba para a pasta raiz** quando mais de uma feature precisar do mesmo código.
- **Cada componente tem sua própria pasta** com arquivo principal, testes e barrel `index.ts`.

---

## 2. Nomenclatura

| Contexto            | Padrão                     | Exemplo                 |
| ------------------- | -------------------------- | ----------------------- |
| Componentes React   | PascalCase                 | `UserProfileCard.tsx`   |
| Hooks               | camelCase + prefixo `use`  | `useUserData.ts`        |
| Interfaces / Types  | PascalCase                 | `interface UserProfile` |
| Constantes globais  | SCREAMING_SNAKE_CASE       | `MAX_RETRY_COUNT`       |
| Funções utilitárias | camelCase                  | `formatDate.ts`         |
| Arquivos de serviço | camelCase                  | `userService.ts`        |
| Pastas de features  | kebab-case                 | `user-profile/`         |
| Variáveis e funções | camelCase                  | `const handleSubmit`    |
| Booleanos           | prefixo `is`, `has`, `can` | `isLoading`, `hasError` |

---

## 3. Componentes

### Estrutura padrão de um componente

```tsx
// components/ui/Button/Button.tsx

import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css' // ou classes Tailwind

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button disabled={disabled || isLoading} aria-busy={isLoading} {...rest}>
      {isLoading ? <span>Carregando...</span> : children}
    </button>
  )
}
```

```ts
// components/ui/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

### Regras de componentes

- **Sem lógica de negócio em componentes `ui/`.** Eles recebem dados via props e disparam callbacks.
- **Prefira `function` ao invés de `const` + arrow function** para componentes (melhor stack trace).
- **Props sempre tipadas com `interface`**, nunca com `type` inline anônimo.
- **Evite `React.FC`** — use tipagem explícita nos argumentos. É mais legível.
- **Componentes de página** ficam em `pages/` e são os únicos que orquestram lógica de negócio e chamadas de API.
- **Máximo de 200 linhas por componente.** Se passar, quebre em subcomponentes.

---

## 4. TypeScript

### Boas práticas

```tsx
// ✅ CORRETO — interface exportada e tipagem explícita
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

// ✅ CORRETO — generics em funções utilitárias
function getFirstItem<T>(list: T[]): T | undefined {
  return list[0]
}

// ✅ CORRETO — type guard
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'email' in value
}

// ❌ ERRADO — never use any
const data: any = response.data

// ❌ ERRADO — casting desnecessário sem type guard
const user = data as User
```

### Regras de tipagem

- **Proibido `any`.** Use `unknown` quando o tipo não for conhecido e faça type guard.
- **Prefira `interface` a `type`** para objetos. Use `type` para unions, intersections e aliases.
- **Tipos de retorno explícitos** em funções de serviço e hooks públicos.
- **Enums somente quando necessário.** Prefira `union types`: `'admin' | 'editor'`.
- **Nunca use `!` (non-null assertion)** sem comentário justificando.

---

## 5. Hooks

### Estrutura padrão de um hook

```ts
// hooks/useLocalStorage.ts

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`useLocalStorage: erro ao salvar "${key}"`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

### Regras de hooks

- **Um hook por arquivo.**
- **Hooks de features** ficam em `features/[feature]/hooks/`. Hooks globais ficam em `hooks/`.
- **Sempre tipagem de retorno explícita** ou `as const` em arrays.
- **Separe lógica de UI de lógica de dados.** Um hook não deve retornar JSX.

---

## 6. Estado Global

Usamos **Zustand** para estado global de aplicação.

### O que vai no estado global

| Vai para o Zustand                      | Não vai para o Zustand                       |
| --------------------------------------- | -------------------------------------------- |
| Dados do usuário autenticado            | Dados vindos de API (usar React Query)       |
| Preferências de UI (tema, idioma)       | Estado de formulários (usar React Hook Form) |
| Estado de modais e notificações globais | Estado local de um componente                |

### Estrutura padrão de uma store

```ts
// store/useAuthStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  setUser: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)
```

---

## 7. Chamadas de API

Usamos **Axios** (instância centralizada) + **TanStack Query** (React Query).

### Instância Axios

```ts
// services/api.ts

import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
```

### Service function

```ts
// features/users/services/userService.ts

import { api } from '@/services/api'
import type { User } from '@/types'

export const userService = {
  getById: (id: string): Promise<User> => api.get<User>(`/users/${id}`).then((r) => r.data),

  update: (id: string, data: Partial<User>): Promise<User> =>
    api.patch<User>(`/users/${id}`, data).then((r) => r.data),
}
```

### Hook com React Query

```ts
// features/users/hooks/useUser.ts

import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  })
}
```

### Regras de API

- **Nenhuma chamada `fetch` ou `axios` direta dentro de componentes.** Sempre via hooks React Query.
- **Query keys seguem a hierarquia:** `['resource', id, 'sub-resource']`.
- **Nunca guarde dados de API no Zustand.** O cache do React Query já faz isso.

---

## 8. Estilo e CSS

Usamos **Tailwind CSS** com **shadcn/ui** como base de componentes.

### Regras de estilo

- **Sem estilos inline** (`style={{}}`), exceto para valores dinâmicos que não existem como classe Tailwind.
- **Sem classes globais genéricas.** Cada componente é responsável pelo seu próprio estilo.
- **Tokens de design** (cores, espaçamentos, tipografia) definidos em `tailwind.config.ts` e usados via classes, nunca hardcodados.
- **Breakpoints padrão Tailwind:** `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- **Mobile-first:** escreva o estilo base para mobile e sobrescreva para desktop com prefixos.

```tsx
// ✅ CORRETO — mobile-first com breakpoints semânticos
<div className="flex flex-col gap-4 md:flex-row md:gap-8">

// ❌ ERRADO — estilo inline para algo que cabe em Tailwind
<div style={{ display: 'flex', gap: '16px' }}>
```

---

## 9. Commits e Git

Usamos **Conventional Commits** com verificação via **Commitlint + Husky**.

### Formato

```
<tipo>(<escopo>): <descrição curta em português>

[corpo opcional]

[rodapé opcional]
```

### Tipos permitidos

| Tipo       | Quando usar                         |
| ---------- | ----------------------------------- |
| `feat`     | Nova funcionalidade                 |
| `fix`      | Correção de bug                     |
| `refactor` | Refatoração sem nova feature ou fix |
| `style`    | Mudanças de formatação, sem lógica  |
| `test`     | Adição ou correção de testes        |
| `chore`    | Configurações, dependências, CI     |
| `docs`     | Documentação                        |
| `perf`     | Melhoria de performance             |

### Exemplos

```bash
feat(auth): adiciona fluxo de login com Google OAuth
fix(dashboard): corrige cálculo de total no relatório mensal
refactor(button): extrai lógica de loading para hook próprio
chore: atualiza dependências e configura Husky
```

### Regras de branch

```
main          → produção (protegida, merge via PR)
develop       → desenvolvimento (base para features)
feature/nome  → nova feature
fix/nome      → correção de bug
chore/nome    → tarefas de configuração
```

---

## 10. Testes

Usamos **Vitest** + **Testing Library**.

### O que testar

- **Componentes `ui/`:** renderização, variantes de props, interações básicas.
- **Hooks customizados:** comportamento e retornos com `renderHook`.
- **Funções utilitárias:** testes unitários puros.
- **Não teste:** implementação interna, estilos, ou o que o React Query / Zustand já testam.

### Estrutura básica de teste

```tsx
// components/ui/Button/Button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

  it('fica desabilitado quando isLoading=true', () => {
    render(<Button isLoading>Salvar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('chama onClick ao ser clicado', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Salvar</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## 11. Ferramentas de Qualidade

| Ferramenta      | Finalidade                       |
| --------------- | -------------------------------- |
| ESLint          | Linting de código                |
| Prettier        | Formatação automática            |
| TypeScript      | Tipagem estática                 |
| Husky           | Git hooks automatizados          |
| Commitlint      | Validação de mensagens de commit |
| Vitest          | Testes unitários                 |
| Testing Library | Testes de componentes            |

### Hooks do Husky

| Hook         | O que roda                |
| ------------ | ------------------------- |
| `pre-commit` | ESLint + TypeScript check |
| `commit-msg` | Commitlint                |
| `pre-push`   | Testes unitários          |

---

> **Dúvidas ou sugestões?** Abra uma discussão ou PR neste repositório. Este documento é vivo e evolui com o time. 🚀
