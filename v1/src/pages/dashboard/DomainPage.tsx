import { useState } from 'react';
import { 
  Globe, CheckCircle, Clock, AlertTriangle, 
  Search, ExternalLink, Shield, RefreshCw, Copy, Lock, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../utils/cn';

export function DomainPage() {
  const { toast } = useToast();
  const [searchDomain, setSearchDomain] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { available: boolean; price: number }>(null);
  const [connectDomain, setConnectDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Simulated user plan — in production from AuthContext/API
  const userPlan: string = 'pro'; // 'free' | 'pro' | 'business'
  const canUseDomain = userPlan === 'pro' || userPlan === 'business';
  const canBuyDomain = userPlan === 'business';

  const currentDomains = [
    { domain: 'minha-loja.tvloja.com.br', type: 'subdomain' as const, isPrimary: true, dnsStatus: 'active' as const, sslStatus: 'issued' as const },
  ];

  const handleSearchDomain = async () => {
    if (!searchDomain.trim()) return;
    setIsSearching(true);
    setSearchResult(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSearchResult({ available: Math.random() > 0.3, price: 4990 });
    setIsSearching(false);
  };

  const handleBuyDomain = () => {
    if (!canBuyDomain) {
      toast('warning', 'Plano Business necessário', 'A compra de domínio via painel está disponível apenas no plano Business.');
      return;
    }
    toast('info', 'Processando compra...', 'Você será redirecionado para o pagamento do domínio.');
  };

  const handleVerifyDns = async () => {
    if (!connectDomain.trim()) {
      toast('error', 'Domínio vazio', 'Digite o domínio que deseja conectar.');
      return;
    }
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast('warning', 'DNS não propagado', 'Os registros DNS ainda não foram detectados. Tente novamente em algumas horas.');
    setIsVerifying(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('success', 'Copiado!', text);
  };

  // If user is on Free plan, show upgrade prompt
  if (!canUseDomain) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Domínio próprio</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Para usar um domínio próprio, você precisa de um plano <strong>Pro</strong> ou <strong>Business</strong>. 
            Seu plano atual (Free) inclui apenas o subdomínio <strong>minha-loja.tvloja.com.br</strong>.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-gray-900">Seu subdomínio atual</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="font-mono text-sm text-gray-700 flex-1">minha-loja.tvloja.com.br</span>
              <button onClick={() => copyToClipboard('minha-loja.tvloja.com.br')} className="p-1 text-gray-400 hover:text-gray-600">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 border-2 border-indigo-200 bg-indigo-50 rounded-2xl text-left">
              <p className="font-bold text-indigo-800 mb-1">Pro · R$ 49/mês</p>
              <p className="text-xs text-indigo-600 mb-3">Conecte seu próprio domínio</p>
              <Link to="/dashboard/billing">
                <Button size="sm" className="w-full" leftIcon={<Zap className="w-4 h-4" />}>Upgrade</Button>
              </Link>
            </div>
            <div className="p-4 border-2 border-purple-200 bg-purple-50 rounded-2xl text-left">
              <p className="font-bold text-purple-800 mb-1">Business · R$ 99/mês</p>
              <p className="text-xs text-purple-600 mb-3">Compre domínio pelo painel</p>
              <Link to="/dashboard/billing">
                <Button size="sm" variant="outline" className="w-full">Upgrade</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuração de Domínio</h1>
        <p className="text-gray-500">Gerencie domínios e subdomínios do seu site.</p>
      </div>

      {/* Current Domains */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Seus Domínios</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {currentDomains.map((d) => (
            <div key={d.domain} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', d.type === 'subdomain' ? 'bg-indigo-100' : 'bg-purple-100')}>
                  <Globe className={cn('w-5 h-5', d.type === 'subdomain' ? 'text-indigo-600' : 'text-purple-600')} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{d.domain}</p>
                    {d.isPrimary && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">Principal</span>}
                    <button onClick={() => copyToClipboard(d.domain)} className="p-1 text-gray-400 hover:text-gray-600"><Copy className="w-4 h-4" /></button>
                  </div>
                  <p className="text-sm text-gray-500">{d.type === 'subdomain' ? 'Subdomínio TVLoja' : 'Domínio próprio'}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-sm">
                  {d.dnsStatus === 'active' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                  <span className={d.dnsStatus === 'active' ? 'text-emerald-600' : 'text-amber-600'}>DNS {d.dnsStatus === 'active' ? 'Ativo' : 'Pendente'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  {d.sslStatus === 'issued' ? <Shield className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                  <span className={d.sslStatus === 'issued' ? 'text-emerald-600' : 'text-amber-600'}>SSL {d.sslStatus === 'issued' ? 'Ativo' : 'Pendente'}</span>
                </div>
                <a href={`https://${d.domain}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><ExternalLink className="w-5 h-5" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Domain (Business only) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Comprar Domínio</h2>
              <p className="text-sm text-gray-500 mt-1">Consulte a disponibilidade e compre pelo painel.</p>
            </div>
            {!canBuyDomain && <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Plano Business</span>}
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="meudominio.com.br" value={searchDomain} onChange={(e) => setSearchDomain(e.target.value)} leftIcon={<Search className="w-4 h-4" />} disabled={!canBuyDomain} />
            </div>
            <Button onClick={handleSearchDomain} isLoading={isSearching} disabled={!canBuyDomain || !searchDomain.trim()}>Verificar</Button>
          </div>
          {!canBuyDomain && (
            <p className="mt-3 text-sm text-amber-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Disponível apenas no plano Business. <Link to="/dashboard/billing" className="underline font-medium">Fazer upgrade</Link>
            </p>
          )}
          {searchResult && (
            <div className={cn('mt-6 p-4 rounded-xl border-2', searchResult.available ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
              {searchResult.available ? (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                    <div>
                      <p className="font-semibold text-emerald-800">{searchDomain} está disponível!</p>
                      <p className="text-sm text-emerald-600">R$ {(searchResult.price / 100).toFixed(2)}/ano</p>
                    </div>
                  </div>
                  <Button onClick={handleBuyDomain}>Comprar Domínio</Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-800">{searchDomain} não disponível</p>
                    <p className="text-sm text-red-600">Tente outra variação.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connect External Domain (Pro + Business) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Conectar Domínio Externo</h2>
          <p className="text-sm text-gray-500 mt-1">Já possui um domínio? Aponte-o para o TVLoja.</p>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Configure estes registros no DNS do seu domínio:</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="font-bold text-gray-500 w-16">Tipo A</span>
                <span className="text-gray-900 w-12">@</span>
                <span className="text-gray-400">→</span>
                <span className="text-indigo-600 flex-1">191.232.169.89</span>
                <button onClick={() => copyToClipboard('191.232.169.89')} className="text-gray-400 hover:text-gray-600"><Copy className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-gray-200">
                <span className="font-bold text-gray-500 w-16">CNAME</span>
                <span className="text-gray-900 w-12">www</span>
                <span className="text-gray-400">→</span>
                <span className="text-indigo-600 flex-1">cdn.tvloja.com.br</span>
                <button onClick={() => copyToClipboard('cdn.tvloja.com.br')} className="text-gray-400 hover:text-gray-600"><Copy className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="meudominio.com.br" value={connectDomain} onChange={(e) => setConnectDomain(e.target.value)} />
            </div>
            <Button variant="outline" onClick={handleVerifyDns} isLoading={isVerifying} leftIcon={<RefreshCw className="w-4 h-4" />}>Verificar DNS</Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Após configurar os registros, clique em "Verificar DNS". A propagação pode levar até 24h. O SSL será emitido automaticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
