import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Settings, CreditCard, Globe, 
  Users, LogOut, Menu, X, ChevronDown, 
  ExternalLink, AlertTriangle, CheckCircle,
  Pencil, ShoppingBag, FileText, Zap, MessageCircle, Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { NotificationPanel } from '../../components/ui/NotificationPanel';
import { cn } from '../../utils/cn';
import { PLANS, formatPrice } from '../../lib/constants';

const navItems = [
  { icon: LayoutDashboard, label: 'Início', href: '/dashboard', exact: true },
  { icon: Pencil, label: 'Editar Site', href: '/dashboard/editor' },
  { icon: Package, label: 'Produtos', href: '/dashboard/products' },
  { icon: Globe, label: 'Domínio', href: '/dashboard/domain' },
  { icon: CreditCard, label: 'Financeiro', href: '/dashboard/billing' },
  { icon: Users, label: 'Equipe', href: '/dashboard/team' },
  { icon: Settings, label: 'Configurações', href: '/dashboard/settings' },
];

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isHome = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">TV</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">TV</span>
              <span className="font-bold text-indigo-600">Loja</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = item.exact 
              ? location.pathname === item.href 
              : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all',
                  active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 space-y-3 border-t border-gray-100 shrink-0">
          <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-sm">Upgrade para Pro</span>
            </div>
            <p className="text-xs text-indigo-100 mb-3">Domínio próprio e sem marca TVLoja</p>
            <Link to="/dashboard/billing" onClick={() => setSidebarOpen(false)}>
              <Button variant="secondary" size="sm" className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                Ver planos
              </Button>
            </Link>
          </div>

          {/* Admin access */}
          <Link 
            to="/admin" 
            onClick={() => setSidebarOpen(false)}
            className="flex items-center space-x-3 w-full px-4 py-2.5 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"
          >
            <Shield className="w-4 h-4" />
            <span className="font-medium text-sm">Super Admin</span>
          </Link>

          <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-2.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {navItems.find(i => i.exact ? location.pathname === i.href : location.pathname.startsWith(i.href))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationPanel />
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name || 'Usuário Demo'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'demo@tvloja.com.br'}</p>
                    </div>
                    <Link to="/dashboard/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm">
                      <Settings className="w-4 h-4" /> Configurações
                    </Link>
                    <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 text-sm">
                      <Shield className="w-4 h-4" /> Super Admin
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm">
                        <LogOut className="w-4 h-4" /> Sair da conta
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {isHome ? <DashboardHome user={user} /> : <Outlet />}
        </main>
      </div>

      {/* WhatsApp */}
      <a href="https://wa.me/5511999999999?text=Preciso%20de%20ajuda%20com%20minha%20conta%20TVLoja" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}

function DashboardHome({ user }: { user: any }) {
  const plan = PLANS.pro;
  const nextBillingDate = new Date();
  nextBillingDate.setDate(nextBillingDate.getDate() + 15);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bem-vindo de volta, {user?.name?.split(' ')[0] || 'Usuário'}!</h2>
              <p className="text-gray-500">Aqui está o resumo da sua conta.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> Conta Ativa
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Plano Atual</p>
              <p className="text-lg font-bold text-indigo-600">{plan.name}</p>
              <p className="text-sm text-gray-500">{formatPrice(plan.price)}/mês</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Seu Site</p>
              <p className="text-lg font-bold text-gray-900">{user?.tenant?.slug || 'minha-loja'}</p>
              <p className="text-sm text-gray-500">.tvloja.com.br</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Próxima Cobrança</p>
              <p className="text-lg font-bold text-gray-900">{nextBillingDate.toLocaleDateString('pt-BR')}</p>
              <p className="text-sm text-gray-500">{formatPrice(plan.price)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5" /><span className="font-bold">Seu Site</span>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-sm mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-300" /><span className="text-indigo-100">Publicado</span>
            </div>
            <p className="font-semibold">{user?.tenant?.slug || 'minha-loja'}.tvloja.com.br</p>
          </div>
          <Link to="/demo-loja" className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors font-medium">
            <ExternalLink className="w-4 h-4" /> Visualizar Site
          </Link>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800">1 notificação pendente</p>
          <p className="text-sm text-amber-700">Sua fatura de Janeiro vence em 3 dias. <Link to="/dashboard/billing" className="underline font-medium">Ver fatura</Link></p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Pencil, label: 'Editar meu site', href: '/dashboard/editor', color: 'indigo' },
            { icon: Package, label: 'Meus produtos', href: '/dashboard/products', color: 'purple' },
            { icon: FileText, label: 'Ver faturas', href: '/dashboard/billing', color: 'emerald' },
            { icon: Globe, label: 'Configurar domínio', href: '/dashboard/domain', color: 'amber' },
          ].map((action) => (
            <Link key={action.label} to={action.href}
              className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-3',
                action.color === 'indigo' && 'bg-indigo-100 text-indigo-600',
                action.color === 'purple' && 'bg-purple-100 text-purple-600',
                action.color === 'emerald' && 'bg-emerald-100 text-emerald-600',
                action.color === 'amber' && 'bg-amber-100 text-amber-600',
              )}>
                <action.icon className="w-6 h-6" />
              </div>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Produtos na Vitrine</h3>
            <Link to="/dashboard/products" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Ver todos</Link>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">produtos ativos</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-500">100</p>
                <p className="text-sm text-gray-400">limite do plano</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="w-[12%] h-full bg-indigo-600 rounded-full" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Solicitações WhatsApp</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-6">
              <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Nenhuma solicitação recente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
