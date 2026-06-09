import { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

interface InvoiceRow {
  id: string;
  tenantName: string;
  tenantSlug: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
}

const MOCK_INVOICES: InvoiceRow[] = [
  { id: 'INV-2024-001', tenantName: 'Loja da Ana', tenantSlug: 'loja-ana', amount: 4900, status: 'paid', dueDate: '10/04/2024', paidAt: '09/04/2024' },
  { id: 'INV-2024-002', tenantName: 'TechStore BR', tenantSlug: 'techstore', amount: 9900, status: 'paid', dueDate: '10/04/2024', paidAt: '10/04/2024' },
  { id: 'INV-2024-003', tenantName: 'Fitness Shop', tenantSlug: 'fitness-shop', amount: 9900, status: 'overdue', dueDate: '28/03/2024' },
  { id: 'INV-2024-004', tenantName: 'Pet World', tenantSlug: 'pet-world', amount: 4900, status: 'pending', dueDate: '15/04/2024' },
  { id: 'INV-2024-005', tenantName: 'Doces da Bel', tenantSlug: 'doces-bel', amount: 4900, status: 'paid', dueDate: '05/04/2024', paidAt: '05/04/2024' },
  { id: 'INV-2024-006', tenantName: 'Livraria Online', tenantSlug: 'livraria', amount: 4900, status: 'cancelled', dueDate: '15/03/2024' },
  { id: 'INV-2024-007', tenantName: 'Moda Plus', tenantSlug: 'moda-plus', amount: 4900, status: 'pending', dueDate: '18/04/2024' },
  { id: 'INV-2024-008', tenantName: 'Casa Decor', tenantSlug: 'casa-decor', amount: 9900, status: 'paid', dueDate: '12/04/2024', paidAt: '12/04/2024' },
];

export function AdminInvoicesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = MOCK_INVOICES.filter(inv => {
    const matchesSearch = inv.tenantName.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = MOCK_INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalPending = MOCK_INVOICES.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const totalOverdue = MOCK_INVOICES.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) { case 'paid': return 'Pago'; case 'pending': return 'Pendente'; case 'overdue': return 'Vencido'; case 'cancelled': return 'Cancelado'; default: return status; }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-500 text-sm">Gestão de faturas e cobranças de todos os clientes.</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>Exportar CSV</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6 text-emerald-600" /></div>
          <div>
            <p className="text-sm text-gray-500">Total Recebido</p>
            <p className="text-xl font-bold text-gray-900">R$ {(totalPaid / 100).toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-amber-600" /></div>
          <div>
            <p className="text-sm text-gray-500">Pendente</p>
            <p className="text-xl font-bold text-gray-900">R$ {(totalPending / 100).toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
          <div>
            <p className="text-sm text-gray-500">Em Atraso</p>
            <p className="text-xl font-bold text-gray-900">R$ {(totalOverdue / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Buscar por fatura ou cliente..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'paid', 'pending', 'overdue', 'cancelled'].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-2 rounded-xl text-xs font-bold transition-all border",
                statusFilter === s ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              )}>
              {s === 'all' ? 'Todas' : getStatusLabel(s)}
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
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Fatura</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Vencimento</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{inv.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-800">{inv.tenantName}</p>
                    <p className="text-xs text-gray-400">{inv.tenantSlug}.tvloja.com.br</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", getStatusStyle(inv.status))}>
                      {getStatusLabel(inv.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inv.dueDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">R$ {(inv.amount / 100).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500">Exibindo {filtered.length} de {MOCK_INVOICES.length} faturas</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
