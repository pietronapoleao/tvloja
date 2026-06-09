import { 
  Users, DollarSign, TrendingUp, TrendingDown, AlertTriangle,
  UserPlus, ArrowUpRight, ArrowDownRight,
  Activity, XCircle, Globe, CreditCard
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';

const mrrData = [
  { month: 'Jul', value: 12400 },
  { month: 'Ago', value: 14800 },
  { month: 'Set', value: 16200 },
  { month: 'Out', value: 18900 },
  { month: 'Nov', value: 21500 },
  { month: 'Dez', value: 24100 },
  { month: 'Jan', value: 28700 },
];

const recentActivity = [
  { type: 'signup', text: 'Novo cadastro: Loja da Ana', time: '2h atrás', icon: UserPlus, color: 'indigo' },
  { type: 'payment', text: 'Pagamento confirmado: TechStore BR (R$ 99,00)', time: '3h atrás', icon: CreditCard, color: 'emerald' },
  { type: 'domain', text: 'SSL emitido: modaplus.com.br', time: '5h atrás', icon: Globe, color: 'blue' },
  { type: 'overdue', text: 'Fatura vencida: Fitness Shop (D+5)', time: '8h atrás', icon: AlertTriangle, color: 'amber' },
  { type: 'blocked', text: 'Bloqueio automático: Livraria Online (D+10)', time: '1d atrás', icon: XCircle, color: 'red' },
  { type: 'payment', text: 'Pagamento confirmado: Pet World (R$ 49,00)', time: '1d atrás', icon: CreditCard, color: 'emerald' },
];

const systemStatus = [
  { name: 'API Node.js', status: 'up', latency: '23ms' },
  { name: 'PostgreSQL', status: 'up', latency: '5ms' },
  { name: 'Redis/BullMQ', status: 'up', latency: '1ms' },
  { name: 'Let\'s Encrypt', status: 'up', latency: '—' },
];

const topTenants = [
  { name: 'TechStore BR', slug: 'techstore', plan: 'Business', mrr: 99 },
  { name: 'Doces da Bel', slug: 'doces-bel', plan: 'Pro', mrr: 49 },
  { name: 'Pet World', slug: 'pet-world', plan: 'Pro', mrr: 49 },
  { name: 'Loja da Ana', slug: 'loja-ana', plan: 'Pro', mrr: 49 },
  { name: 'Casa Decor', slug: 'casa-decor', plan: 'Business', mrr: 99 },
];

export function AdminDashboard() {
  const kpis = [
    { 
      label: 'MRR', 
      value: 'R$ 28.700', 
      change: '+12,4%', 
      trend: 'up' as const,
      icon: DollarSign, 
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      badgeColor: 'text-emerald-700 bg-emerald-100',
    },
    { 
      label: 'Clientes Ativos', 
      value: '542', 
      change: '+23 este mês', 
      trend: 'up' as const,
      icon: Users, 
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      badgeColor: 'text-indigo-700 bg-indigo-100',
    },
    { 
      label: 'Churn Rate', 
      value: '2,3%', 
      change: '-0,5%', 
      trend: 'down' as const,
      icon: TrendingDown, 
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      badgeColor: 'text-emerald-700 bg-emerald-100',
    },
    { 
      label: 'Faturas Pendentes', 
      value: '12', 
      change: 'R$ 4.850 total', 
      trend: 'up' as const,
      icon: AlertTriangle, 
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      badgeColor: 'text-amber-700 bg-amber-100',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', kpi.bgColor)}>
                <kpi.icon className={cn('w-6 h-6', kpi.iconColor)} />
              </div>
              <span className={cn(
                "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                kpi.badgeColor
              )}>
                {kpi.trend === 'up' 
                  ? <ArrowUpRight className="w-3.5 h-3.5" /> 
                  : <ArrowDownRight className="w-3.5 h-3.5" />
                }
                {kpi.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts + Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MRR Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Receita Recorrente (MRR)</h3>
              <p className="text-sm text-gray-500">Evolução dos últimos 7 meses</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              +132%
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrData}>
                <defs>
                  <linearGradient id="adminMrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'MRR']}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#adminMrrGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Atividade Recente</h3>
          </div>
          <div className="divide-y divide-gray-50 max-h-[380px] overflow-y-auto">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-6 py-3.5 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                  activity.color === 'indigo' && 'bg-indigo-100 text-indigo-600',
                  activity.color === 'emerald' && 'bg-emerald-100 text-emerald-600',
                  activity.color === 'blue' && 'bg-blue-100 text-blue-600',
                  activity.color === 'amber' && 'bg-amber-100 text-amber-600',
                  activity.color === 'red' && 'bg-red-100 text-red-600',
                )}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Tenants */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Top Clientes por MRR</h3>
            <Link to="/admin/tenants" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase text-left">Cliente</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase text-left">Plano</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase text-right">MRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topTenants.map((tenant) => (
                  <tr key={tenant.slug} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-indigo-600">{tenant.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tenant.name}</p>
                          <p className="text-xs text-gray-400">{tenant.slug}.tvloja.com.br</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'px-2 py-1 rounded-lg text-xs font-bold',
                        tenant.plan === 'Business' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'
                      )}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      R$ {tenant.mrr},00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-gray-900">Saúde do Sistema</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
              Operacional
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {systemStatus.map((service) => (
              <div key={service.name} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    service.status === 'up' ? 'bg-emerald-500' : 'bg-red-500'
                  )} />
                  <span className="text-sm font-medium text-gray-700">{service.name}</span>
                </div>
                <span className="text-sm text-gray-400">{service.latency}</span>
              </div>
            ))}
          </div>

          {/* Uptime bar */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Uptime · 30 dias</span>
              <span className="text-xs font-bold text-emerald-600">99,98%</span>
            </div>
            <div className="flex gap-[2px] h-5">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 rounded-[2px]',
                    i === 17 ? 'bg-amber-300' : 'bg-emerald-300'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Alert counts */}
          <div className="px-6 pb-6 grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <p className="text-lg font-bold text-emerald-700">542</p>
              <p className="text-xs text-emerald-600">Ativos</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <p className="text-lg font-bold text-amber-700">15</p>
              <p className="text-xs text-amber-600">Bloqueados</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-700">60</p>
              <p className="text-xs text-gray-500">Cancelados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
