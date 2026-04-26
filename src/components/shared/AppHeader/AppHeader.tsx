import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Bell, Settings, ChevronDown, User, Menu, X } from 'lucide-react'
import logoPng from '../../../assets/logo.png'

export interface NavItem {
  label: string
  to: string
  children?: Omit<NavItem, 'children'>[]
}

export interface AppHeaderProps {
  userName?: string
  userRole?: string
  items?: NavItem[]
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Ordem de Serviço', to: '/ordem-de-servico' },
  { label: 'Financeiro', to: '/financeiro' },
  { label: 'Estoque', to: '/estoque' },
]

export function AppHeader({
  userName = 'Laboratório',
  userRole = 'Administrador',
  items = DEFAULT_ITEMS,
}: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full">
      <header style={{ backgroundColor: 'var(--color-primary)' }} className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <img src={logoPng} alt="LabSys" className="h-20 w-auto" />

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              className="text-white/60 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 relative"
              aria-label="Notificações"
            >
              <Bell size={18} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-label-size font-semibold flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary-mid)' }}
              >
                3
              </span>
            </button>

            <button
              className="hidden sm:flex text-white/60 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
              aria-label="Configurações"
            >
              <Settings size={18} />
            </button>

            <div className="hidden sm:block w-px h-6 bg-white/20 mx-1" />

            <button className="flex items-center gap-2 hover:bg-white/10 rounded-md px-2 py-1.5 transition-colors">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              >
                <User size={15} color="white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-white text-xs font-semibold leading-tight">{userName}</p>
                <p className="text-white/60 text-[11px] leading-tight">{userRole}</p>
              </div>
              <ChevronDown size={14} className="text-white/60 hidden md:block" />
            </button>

            <button
              className="sm:hidden text-white/60 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 ml-1"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <nav className="hidden sm:block w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center justify-center gap-0.5 h-11">
            {items.map((item) => (
              <li key={item.to} className="relative group">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-1 px-3.5 h-11 text-sm font-medium transition-colors border-b-2',
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300',
                    ].join(' ')
                  }
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      className="opacity-60 group-hover:rotate-180 transition-transform"
                    />
                  )}
                </NavLink>

                {item.children && (
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                    <ul className="bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-44">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              [
                                'block px-4 py-2 text-sm transition-colors',
                                isActive
                                  ? 'text-primary bg-primary-bg'
                                  : 'text-text-muted hover:text-text-main hover:bg-gray-50',
                              ].join(' ')
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="sm:hidden bg-white border-b border-gray-200 shadow-sm">
          <ul className="px-4 py-2 flex flex-col">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'block px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary bg-primary-bg'
                        : 'text-text-muted hover:text-text-main hover:bg-gray-50',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>

                {item.children && (
                  <ul className="ml-4 border-l border-gray-100 pl-3 mb-1">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            [
                              'block px-3 py-2 rounded-md text-sm transition-colors',
                              isActive
                                ? 'text-primary bg-primary-bg'
                                : 'text-text-muted hover:text-text-main hover:bg-gray-50',
                            ].join(' ')
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
