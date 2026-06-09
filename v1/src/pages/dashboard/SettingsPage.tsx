import { useState } from 'react';
import { User, Mail, Phone, Globe, Bell, Shield, Save } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const TABS = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'site', label: 'Site', icon: Globe },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'security', label: 'Segurança', icon: Shield },
];

export function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || 'Usuário Demo');
  const [email, setEmail] = useState(user?.email || 'demo@tvloja.com.br');
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [siteName, setSiteName] = useState(user?.tenant?.name || 'Minha Loja Demo');
  const [siteDescription, setSiteDescription] = useState('A melhor loja online da região.');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [whatsappNumber, setWhatsappNumber] = useState('5511999999999');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifBilling, setNotifBilling] = useState(true);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    toast('success', 'Configurações salvas!', 'Suas alterações foram aplicadas.');
    setIsSaving(false);
  };

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#1e293b'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-500 text-sm">Gerencie seu perfil, site e preferências.</p>
        </div>
        <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
          Salvar alterações
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-px">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn('flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap',
              activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            )}>
            <tab.icon className="w-4 h-4" />{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {activeTab === 'profile' && (
          <div className="p-6 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg">Dados Pessoais</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">{name[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{email}</p>
                <button className="text-sm text-indigo-600 font-medium mt-1 hover:underline">Alterar foto</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} leftIcon={<User className="w-4 h-4" />} />
              <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="w-4 h-4" />} />
              <Input label="WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} leftIcon={<Phone className="w-4 h-4" />} />
            </div>
          </div>
        )}

        {activeTab === 'site' && (
          <div className="p-6 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg">Informações do Site</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome do Site / Marca" value={siteName} onChange={(e) => setSiteName(e.target.value)} leftIcon={<Globe className="w-4 h-4" />} />
              <Input label="WhatsApp do Site" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} leftIcon={<Phone className="w-4 h-4" />} hint="Número com código do país (ex: 5511999999999)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição do Site</label>
              <textarea value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={3}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Cor Principal</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button key={c} onClick={() => setPrimaryColor(c)}
                    className={cn('w-10 h-10 rounded-xl transition-all', primaryColor === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105')}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg">Preferências de Notificação</h3>
            <div className="space-y-4">
              {[
                { label: 'Notificações por E-mail', desc: 'Receba avisos de faturas e atualizações no e-mail.', checked: notifEmail, onChange: setNotifEmail },
                { label: 'Notificações por WhatsApp', desc: 'Receba lembretes e alertas no seu WhatsApp.', checked: notifWhatsapp, onChange: setNotifWhatsapp },
                { label: 'Alertas de Cobrança', desc: 'Avisos sobre faturas próximas do vencimento.', checked: notifBilling, onChange: setNotifBilling },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button onClick={() => item.onChange(!item.checked)}
                    className={cn('w-12 h-7 rounded-full transition-colors relative', item.checked ? 'bg-indigo-600' : 'bg-gray-300')}>
                    <div className={cn('w-5 h-5 bg-white rounded-full shadow absolute top-1 transition-transform', item.checked ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="p-6 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg">Segurança da Conta</h3>
            <div className="space-y-4">
              <Input label="Senha Atual" type="password" placeholder="••••••••" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nova Senha" type="password" placeholder="Mínimo 8 caracteres" />
                <Input label="Confirmar Nova Senha" type="password" placeholder="Repita a nova senha" />
              </div>
              <Button onClick={() => toast('success', 'Senha alterada!', 'Sua senha foi atualizada com sucesso.')}>
                Alterar senha
              </Button>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Sessões Ativas</h4>
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Este dispositivo</p>
                  <p className="text-sm text-gray-500">Chrome · São Paulo, BR · Ativo agora</p>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Atual</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
