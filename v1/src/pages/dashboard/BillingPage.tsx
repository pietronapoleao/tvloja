import { useState } from 'react';
import { 
  CreditCard, CheckCircle, AlertCircle, Clock, 
  Download, ArrowUpRight, ShieldCheck, Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../utils/cn';

// Demo data - in production, fetched from API
const DEMO_SUBSCRIPTION = {
  planName: 'Pro',
  planSlug: 'pro',
  status: 'active' as const,
  currentPeriodEnd: new Date(Date.now() + 15 * 86400000).toISOString(),
  cancelAtPeriodEnd: false,
  amount: 4900,
  interval: 'month' as const,
};

const DEMO_INVOICES = [
  { id: 'INV-2024-003', amount: 4900, status: 'paid' as const, dueDate: '2024-03-10', paidAt: '2024-03-09' },
  { id: 'INV-2024-002', amount: 4900, status: 'paid' as const, dueDate: '2024-02-10', paidAt: '2024-02-10' },
  { id: 'INV-2024-001', amount: 4900, status: 'paid' as const, dueDate: '2024-01-10', paidAt: '2024-01-08' },
];

export function BillingPage() {
  const [subscription] = useState(DEMO_SUBSCRIPTION);
  const [invoices] = useState(DEMO_INVOICES);
  const { toast } = useToast();
  const isLoading = false;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50 border-green-100';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'overdue': return 'Atrasado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assinatura e Faturamento</h1>
        <p className="text-gray-500">Gerencie seu plano, faturas e métodos de pagamento.</p>
      </div>

      {/* Subscription Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Plano Atual</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {subscription?.planName || 'Plano Starter'}
                  </h2>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                    {subscription?.interval === 'month' ? 'MENSAL' : 'ANUAL'}
                  </span>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm",
                subscription?.status === 'active' ? "text-green-700 bg-green-50 border-green-200" : "text-amber-700 bg-amber-50 border-amber-200"
              )}>
                {subscription?.status === 'active' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {subscription?.status === 'active' ? 'Assinatura Ativa' : 'Aguardando Pagamento'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Próxima cobrança</p>
                <p className="font-semibold text-gray-900">
                  {subscription?.currentPeriodEnd 
                    ? new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                    : '---'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Valor do plano</p>
                <p className="font-semibold text-gray-900">
                  R$ {subscription?.amount ? (subscription.amount / 100).toFixed(2) : '49,00'} / mês
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Método de pagamento</p>
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span>Cartão •••• 4242</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {subscription?.cancelAtPeriodEnd 
                ? "Sua assinatura será cancelada ao fim do período." 
                : "Sua assinatura será renovada automaticamente."}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => toast('warning', 'Tem certeza?', 'Entre em contato com o suporte para cancelar.')}>Cancelar Assinatura</Button>
              <Button size="sm" leftIcon={<Zap className="w-4 h-4" />} onClick={() => toast('info', 'Em breve!', 'Upgrade de plano será habilitado em breve.')}>Fazer Upgrade</Button>
            </div>
          </div>
        </div>

        {/* Support/Info Card */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg shadow-indigo-200">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Segurança Garantida</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Seus pagamentos são processados via Mercado Pago com criptografia de ponta a ponta.
            </p>
          </div>
          <button className="flex items-center justify-between w-full p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors mt-8 group">
            <span className="text-sm font-medium">Precisa de ajuda com faturas?</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">Histórico de Faturamento</h3>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={() => toast('success', 'Exportação iniciada', 'O arquivo CSV será baixado em instantes.')}>
            Exportar tudo
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fatura</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.length > 0 ? invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Download className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="font-medium text-gray-900">#{invoice.id.slice(0, 8)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold border",
                      getStatusColor(invoice.status)
                    )}>
                      {getStatusLabel(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    R$ {(invoice.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {(invoice.status as string) === 'pending' ? (
                      <Button size="sm" onClick={() => toast('info', 'Redirecionando...', 'Você será levado ao Mercado Pago.')}>Pagar agora</Button>
                    ) : (
                      <button onClick={() => toast('success', 'Download iniciado', 'Recibo salvo.')} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                // Mock rows if empty for visualization
                [1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Download className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-900">#INV-2024-00{i}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold border text-green-600 bg-green-50 border-green-100"
                      )}>
                        Pago
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      10/0{i}/2024
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      R$ 49,00
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support Section */}
      <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-amber-800 font-bold mb-1">Atenção com faturas pendentes</h4>
          <p className="text-amber-700 text-sm">
            Faturas vencidas há mais de 5 dias resultam na suspensão automática do seu site. 
            Mantenha seus pagamentos em dia para evitar interrupções no serviço.
          </p>
        </div>
      </div>
    </div>
  );
}
