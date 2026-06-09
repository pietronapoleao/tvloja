import { useState } from 'react';
import { Bell, X, CreditCard, UserPlus, AlertTriangle, Globe, Package } from 'lucide-react';
import { cn } from '../../utils/cn';

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'payment', title: 'Pagamento confirmado', description: 'Fatura de Março paga com sucesso.', time: '2h atrás', read: false, icon: CreditCard, color: 'emerald' },
  { id: '2', type: 'alert', title: 'Fatura vencendo', description: 'Sua fatura de Abril vence em 3 dias.', time: '5h atrás', read: false, icon: AlertTriangle, color: 'amber' },
  { id: '3', type: 'domain', title: 'SSL renovado', description: 'Certificado SSL renovado automaticamente.', time: '1d atrás', read: true, icon: Globe, color: 'blue' },
  { id: '4', type: 'product', title: 'Novo produto', description: 'Produto "Camiseta Premium" publicado.', time: '2d atrás', read: true, icon: Package, color: 'indigo' },
];

const ADMIN_NOTIFICATIONS = [
  { id: '1', type: 'signup', title: 'Novo cadastro', description: 'Loja "Casa Decor" se cadastrou no plano Free.', time: '1h atrás', read: false, icon: UserPlus, color: 'indigo' },
  { id: '2', type: 'overdue', title: 'Fatura vencida', description: 'Fitness Shop está com fatura D+5.', time: '3h atrás', read: false, icon: AlertTriangle, color: 'red' },
  { id: '3', type: 'payment', title: 'Pagamento recebido', description: 'TechStore BR pagou R$ 99,00.', time: '5h atrás', read: false, icon: CreditCard, color: 'emerald' },
  { id: '4', type: 'domain', title: 'SSL emitido', description: 'Certificado para modaplus.com.br.', time: '8h atrás', read: true, icon: Globe, color: 'blue' },
];

interface NotificationPanelProps {
  variant?: 'default' | 'admin';
}

export function NotificationPanel({ variant = 'default' }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = variant === 'admin' ? ADMIN_NOTIFICATIONS : MOCK_NOTIFICATIONS;
  const unreadCount = notifications.filter(n => !n.read).length;


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className={cn(
            "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white rounded-full px-1",
            variant === 'admin' ? 'bg-rose-500' : 'bg-red-500'
          )}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Notificações</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-bold rounded-full",
                    variant === 'admin' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
                  )}>
                    {unreadCount} novas
                  </span>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-3",
                    !notif.read && "bg-gray-50/80"
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                    notif.color === 'emerald' && 'bg-emerald-100 text-emerald-600',
                    notif.color === 'amber' && 'bg-amber-100 text-amber-600',
                    notif.color === 'red' && 'bg-red-100 text-red-600',
                    notif.color === 'blue' && 'bg-blue-100 text-blue-600',
                    notif.color === 'indigo' && 'bg-indigo-100 text-indigo-600',
                  )}>
                    <notif.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                      {!notif.read && (
                        <span className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          variant === 'admin' ? 'bg-rose-500' : 'bg-indigo-500'
                        )} />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
              <button className={cn(
                "w-full text-center text-sm font-medium py-1.5 rounded-lg transition-colors",
                variant === 'admin' 
                  ? 'text-rose-600 hover:bg-rose-50' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              )}>
                Marcar todas como lidas
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
