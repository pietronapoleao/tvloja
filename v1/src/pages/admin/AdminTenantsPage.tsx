import { useState } from 'react';
import { 
  Search, ChevronLeft, ChevronRight,
  MoreHorizontal, Ban, Play, ExternalLink, Eye
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

interface TenantRow {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  plan: string;
  status: 'active' | 'blocked' | 'trialing' | 'cancelled';
  mrr: number;
  productsCount: number;
  createdAt: string;
}

const MOCK_TENANTS: TenantRow[] = [
  { id: '1', name: 'Loja da Ana', slug: 'loja-ana', ownerName: 'Ana Silva', ownerEmail: 'ana@email.com', plan: 'Pro', status: 'active', mrr: 49, productsCount: 34, createdAt: '15/01/2024' },
  { id: '2', name: 'TechStore BR', slug: 'techstore', ownerName: 'Carlos Tech', ownerEmail: 'carlos@tech.com', plan: 'Business', status: 'active', mrr: 99, productsCount: 128, createdAt: '20/02/2024' },
  { id: '3', name: 'Moda Plus', slug: 'moda-plus', ownerName: 'Maria Moda', ownerEmail: 'maria@moda.com', plan: 'Free', status: 'trialing', mrr: 0, productsCount: 8, createdAt: '10/03/2024' },
  { id: '4', name: 'Pet World', slug: 'pet-world', ownerName: 'João Pet', ownerEmail: 'joao@pet.com', plan: 'Pro', status: 'active', mrr: 49, productsCount: 45, createdAt: '22/03/2024' },
  { id: '5', name: 'Casa Decor', slug: 'casa-decor', ownerName: 'Paula Casa', ownerEmail: 'paula@casa.com', plan: 'Free', status: 'trialing', mrr: 0, productsCount: 3, createdAt: '01/04/2024' },
  { id: '6', name: 'Fitness Shop', slug: 'fitness-shop', ownerName: 'André Fit', ownerEmail: 'andre@fit.com', plan: 'Business', status: 'blocked', mrr: 0, productsCount: 67, createdAt: '05/11/2023' },
  { id: '7', name: 'Doces da Bel', slug: 'doces-bel', ownerName: 'Isabela Doces', ownerEmail: 'bel@doces.com', plan: 'Pro', status: 'active', mrr: 49, productsCount: 22, createdAt: '30/01/2024' },
  { id: '8', name: 'Livraria Online', slug: 'livraria', ownerName: 'Roberto Livro', ownerEmail: 'roberto@livro.com', plan: 'Pro', status: 'cancelled', mrr: 0, productsCount: 0, createdAt: '12/09/2023' },
];

export function AdminTenantsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const filtered = MOCK_TENANTS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.ownerEmail.toLowerCase().includes(search.toLowerCase()) ||
                          t.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'trialing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'blocked': return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-50 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'trialing': return 'Trial';
      case 'blocked': return 'Bloqueado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getPlanStyle = (plan: string) => {
    switch (plan) {
      case 'Business': return 'bg-purple-100 text-purple-700';
      case 'Pro': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h1>
          <p className="text-gray-500 text-sm">{MOCK_TENANTS.length} lojas cadastradas na plataforma</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome, slug ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'trialing', 'blocked', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-bold transition-all border",
                statusFilter === s
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              )}
            >
              {s === 'all' ? 'Todos' : getStatusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Loja</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Plano</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">MRR</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Produtos</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Criado em</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-indigo-600">{tenant.name[0]}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{tenant.name}</p>
                        <p className="text-xs text-gray-400">{tenant.ownerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", getStatusStyle(tenant.status))}>
                      {getStatusLabel(tenant.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-1 rounded-lg text-xs font-bold", getPlanStyle(tenant.plan))}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {tenant.mrr > 0 ? `R$ ${tenant.mrr}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tenant.productsCount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tenant.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setActionMenuId(actionMenuId === tenant.id ? null : tenant.id)}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {actionMenuId === tenant.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActionMenuId(null)} />
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl py-1 z-20 shadow-lg">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <Eye className="w-4 h-4" /> Ver detalhes
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" /> Acessar como
                            </button>
                            {tenant.status === 'active' ? (
                              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <Ban className="w-4 h-4" /> Bloquear
                              </button>
                            ) : tenant.status === 'blocked' ? (
                              <button className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2">
                                <Play className="w-4 h-4" /> Desbloquear
                              </button>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500">Exibindo {filtered.length} de {MOCK_TENANTS.length} clientes</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
