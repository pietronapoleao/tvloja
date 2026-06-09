import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, Activity,
  LogOut, Menu, X, ChevronDown, Shield, Settings, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationPanel } from '../../components/ui/NotificationPanel';
import { cn } from '../../utils/cn';

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', exact: true },
  { icon: Users, label: 'Clientes', href: '/admin/tenants' },
  { icon: CreditCard, label: 'Financeiro', href: '/admin/invoices' },
  { icon: Activity, label: 'Sistema', href: '/admin/system' },
  { icon: Settings, label: 'Configurações', href: '/admin/settings' },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('admin_dark_mode') === 'true';
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('admin_dark_mode', String(darkMode));
  }, [darkMode]);

  // Color scheme
  const c = darkMode ? {
    bg: 'bg-slate-950',
    sidebar: 'bg-slate-900 border-slate-800',
    sidebarBorder: 'border-slate-800',
    header: 'bg-slate-900 border-slate-800',
    main: '',
    text: 'text-white',
    textSecondary: 'text-slate-400',
    hover: 'hover:bg-slate-800',
    activeNav: 'bg-slate-800 text-white',
    inactiveNav: 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
    userBg: 'bg-rose-500/20',
    userText: 'text-rose-400',
    menuBg: 'bg-slate-800 border-slate-700',
    menuText: 'text-slate-300',
    menuHover: 'hover:bg-slate-700',
    overlay: 'bg-black/60',
  } : {
    bg: 'bg-gray-50',
    sidebar: 'bg-white border-gray-200',
    sidebarBorder: 'border-gray-100',
    header: 'bg-white border-gray-200',
    main: '',
    text: 'text-gray-900',
    textSecondary: 'text-gray-500',
    hover: 'hover:bg-gray-100',
    activeNav: 'bg-rose-50 text-rose-600',
    inactiveNav: 'text-gray-600 hover:bg-gray-50',
    userBg: 'bg-rose-100',
    userText: 'text-rose-600',
    menuBg: 'bg-white border-gray-100',
    menuText: 'text-gray-600',
    menuHover: 'hover:bg-gray-50',
    overlay: 'bg-black/50',
  };

  return (
    <div className={cn('min-h-screen', c.bg)}>
      {sidebarOpen && (
        <div className={cn('fixed inset-0 z-40 lg:hidden', c.overlay)} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-64 border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0',
        c.sidebar,
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className={cn('h-16 flex items-center justify-between px-4 border-b', c.sidebarBorder)}>
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className={cn('font-bold', c.text)}>TV</span>
              <span className="font-bold text-rose-500">Admin</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className={cn('lg:hidden p-2 rounded-lg', c.hover, c.textSecondary)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {adminNav.map((item) => {
            const active = item.exact
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href) && item.href !== '/admin';
            const isExactAdmin = item.exact && location.pathname === '/admin';
            const isActive = active || isExactAdmin;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all',
                  isActive ? c.activeNav : c.inactiveNav
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={cn('flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all', c.inactiveNav)}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium text-sm">{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>
          
          <Link to="/dashboard" className={cn('flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all text-sm', c.inactiveNav)}>
            <LayoutDashboard className="w-4 h-4" />
            <span className="font-medium">Painel Cliente</span>
          </Link>
          <button onClick={handleLogout} className={cn('flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all', c.inactiveNav, 'hover:!text-red-500')}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className={cn('h-16 border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30', c.header)}>
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className={cn('lg:hidden p-2 rounded-lg', c.hover, c.textSecondary)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className={cn('text-xl font-semibold', c.text)}>
                {adminNav.find(i => i.exact ? location.pathname === i.href : (location.pathname.startsWith(i.href) && i.href !== '/admin'))?.label || 'Dashboard'}
              </h1>
              <p className={cn('text-xs hidden sm:block', c.textSecondary)}>Painel Administrativo TVLoja</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationPanel variant="admin" />
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className={cn('flex items-center space-x-3 p-2 rounded-xl', c.hover)}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', c.userBg)}>
                  <span className={cn('text-sm font-semibold', c.userText)}>
                    {user?.name?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className={cn('text-sm font-medium', c.text)}>{user?.name || 'Admin'}</p>
                  <p className="text-xs text-rose-500 font-medium">Super Admin</p>
                </div>
                <ChevronDown className={cn('w-4 h-4', c.textSecondary)} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className={cn('absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg border py-2 z-20', c.menuBg)}>
                    <div className={cn('px-4 py-2 border-b', c.sidebarBorder)}>
                      <p className={cn('font-medium', c.text)}>{user?.name || 'Admin'}</p>
                      <p className={cn('text-sm', c.textSecondary)}>{user?.email || 'admin@tvloja.com.br'}</p>
                    </div>
                    <Link to="/admin/settings" onClick={() => setUserMenuOpen(false)} className={cn('block px-4 py-2', c.menuText, c.menuHover)}>Configurações</Link>
                    <button onClick={handleLogout} className={cn('w-full text-left px-4 py-2 text-red-500', c.menuHover)}>Sair</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
