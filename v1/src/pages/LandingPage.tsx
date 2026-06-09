import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Zap, Shield, Globe, Palette, 
  CreditCard, BarChart3, Smartphone, Star,
  Phone, Mail, ChevronRight, MessageCircle,
  Headphones, Award
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════ HEADER ═══════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">TV</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">TV</span>
                <span className="font-bold text-indigo-600">Loja</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#sobre" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Sobre</a>
              <a href="#recursos" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Recursos</a>
              <a href="#planos" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Planos</a>
              <a href="#depoimentos" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Depoimentos</a>
              <a href="#contato" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Contato</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/auth/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm">Criar loja grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Plataforma SaaS para criação de sites
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Crie seu site
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  profissional em minutos
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Vitrine, landing page ou site institucional. Sem código, sem complicação. 
                Seu negócio online com domínio próprio e WhatsApp integrado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/auth/register">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Começar grátis agora
                  </Button>
                </Link>
                <Link to="/demo-loja">
                  <Button size="lg" variant="outline">
                    Ver vitrine demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Sem cartão</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Subdomínio grátis</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> SSL incluído</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="h-8 bg-gray-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="flex-1 mx-8"><div className="h-4 bg-gray-200 rounded-full max-w-[200px] mx-auto" /></div>
                  </div>
                  <div className="p-4">
                    <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">Sua Loja Aqui</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-lg" />)}
                    </div>
                    <div className="h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Chamar no WhatsApp</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-100 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SOBRE / O QUE É ═══════════ */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">O que é o TVLoja?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma SaaS completa para criar sites profissionais. 
              Escolha entre <strong>vitrine</strong> (catálogo de produtos), <strong>landing page</strong> ou <strong>site institucional</strong> — 
              tudo com editor visual, domínio próprio e botão WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Vitrine / Catálogo', desc: 'Exiba seus produtos com fotos e descrição. Clientes solicitam via WhatsApp — sem carrinho ou checkout.', icon: Smartphone, color: 'indigo' },
              { title: 'Landing Page', desc: 'Página única de alta conversão para capturar leads, promover serviços ou divulgar eventos.', icon: Globe, color: 'purple' },
              { title: 'Site Institucional', desc: 'Apresente sua empresa com múltiplas seções: sobre, serviços, equipe, localização e contato.', icon: Award, color: 'emerald' },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${item.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' : item.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMO FUNCIONA ═══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Como funciona?</h2>
            <p className="text-xl text-gray-600">Do cadastro ao site publicado em 5 minutos</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Crie sua conta', desc: 'Escolha seu subdomínio e preencha seus dados.' },
              { step: '2', title: 'Personalize', desc: 'Use o editor visual para montar seu site com drag & drop.' },
              { step: '3', title: 'Adicione produtos', desc: 'Cadastre seus itens com foto, nome e descrição.' },
              { step: '4', title: 'Publique!', desc: 'Seu site fica online com SSL e botão WhatsApp.' },
            ].map((item) => (
              <div key={item.step} className="relative p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">{item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ RECURSOS ═══════════ */}
      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Recursos da plataforma</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tudo que você precisa em um só lugar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: 'Editor Visual', desc: 'Arraste e solte seções. Sem código.' },
              { icon: Globe, title: 'Domínio Próprio', desc: 'Use seu domínio ou nosso subdomínio gratuito.' },
              { icon: Shield, title: 'SSL Automático', desc: 'Certificado Let\'s Encrypt emitido automaticamente.' },
              { icon: MessageCircle, title: 'WhatsApp Integrado', desc: 'Botão flutuante em todas as páginas do site.' },
              { icon: CreditCard, title: 'Mercado Pago', desc: 'Cobranças via PIX, boleto e cartão.' },
              { icon: BarChart3, title: 'Painel Completo', desc: 'Métricas, faturas e gestão de produtos.' },
            ].map((f) => (
              <div key={f.title} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PLANOS ═══════════ */}
      <section id="planos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Planos e preços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comece grátis. Escale quando precisar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free', price: 'R$ 0', period: '/mês',
                desc: 'Para testar a plataforma',
                features: ['Subdomínio .tvloja.com.br', 'Máximo 5 seções', 'Até 10 produtos', 'Logo e cores básicas', 'Marca TVLoja no rodapé'],
                cta: 'Começar grátis', popular: false, note: 'Sem domínio próprio'
              },
              {
                name: 'Pro', price: 'R$ 49', period: '/mês',
                desc: 'Site completo para seu negócio',
                features: ['Domínio próprio ou subdomínio', 'Seções ilimitadas', 'Até 100 produtos', 'Remoção da marca TVLoja', 'SSL automático', 'Suporte prioritário'],
                cta: 'Assinar Pro', popular: true, note: 'Mais popular'
              },
              {
                name: 'Business', price: 'R$ 99', period: '/mês',
                desc: 'Para empresas em crescimento',
                features: ['Tudo do Pro', 'Produtos ilimitados', 'Compra de domínio via API', 'Até 5 usuários no painel', 'Relatórios financeiros', 'Suporte premium 24h'],
                cta: 'Assinar Business', popular: false, note: 'Mais completo'
              },
            ].map((plan) => (
              <div key={plan.name} className={`p-8 bg-white rounded-2xl border-2 relative ${plan.popular ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-gray-100'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-indigo-600 text-white text-sm font-bold rounded-full">Mais popular</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth/register">
                  <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>{plan.cta}</Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Important note about domains */}
          <div className="max-w-3xl mx-auto mt-10 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-indigo-800 mb-1">Sobre domínios próprios</p>
                <p className="text-sm text-indigo-700">
                  Domínio próprio está disponível nos planos <strong>Pro</strong> e <strong>Business</strong>. 
                  Você pode apontar um domínio que já possui ou comprar um novo diretamente pelo painel (Business). 
                  O SSL é emitido automaticamente via Let's Encrypt após a configuração do DNS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DEPOIMENTOS ═══════════ */}
      <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">O que dizem nossos clientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Maria Silva', role: 'Moda Plus · Plano Pro', text: 'Criei minha vitrine em 1 hora. Os clientes me chamam no WhatsApp o dia inteiro!', avatar: 'M' },
              { name: 'João Santos', role: 'TechStore · Plano Business', text: 'Configurei meu domínio próprio e a loja ficou super profissional. Recomendo.', avatar: 'J' },
              { name: 'Ana Costa', role: 'Doces da Bel · Plano Free', text: 'Comecei no Free e já estou pensando no upgrade. A plataforma é incrível.', avatar: 'A' },
            ].map((t) => (
              <div key={t.name} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              { q: 'Posso usar o TVLoja gratuitamente?', a: 'Sim! O plano Free inclui subdomínio gratuito, até 5 seções e 10 produtos na vitrine.' },
              { q: 'Como funciona o domínio próprio?', a: 'Nos planos Pro e Business, você pode apontar um domínio que já possui (configurando DNS) ou comprar um novo pelo painel (Business). O SSL é emitido automaticamente.' },
              { q: 'O site tem carrinho de compras?', a: 'Não. O TVLoja é uma vitrine/catálogo. Os clientes veem seus produtos e entram em contato pelo WhatsApp para solicitar.' },
              { q: 'Posso trocar de plano depois?', a: 'Sim! Você pode fazer upgrade a qualquer momento. A cobrança é proporcional ao período restante.' },
              { q: 'O que acontece se eu atrasar o pagamento?', a: 'Você recebe lembretes automáticos. Após 10 dias de atraso, o site é suspenso temporariamente até a regularização.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50">
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTATO ═══════════ */}
      <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Fale conosco</h2>
            <p className="text-gray-600">Dúvidas? Nossa equipe está pronta para ajudar.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'WhatsApp', info: '(11) 9 9999-9999', sub: 'Seg-Sex, 9h às 18h' },
              { icon: Mail, title: 'E-mail', info: 'suporte@tvloja.com.br', sub: 'Resposta em até 24h' },
              { icon: Headphones, title: 'Suporte', info: 'Central de ajuda', sub: 'Artigos e tutoriais' },
            ].map((c) => (
              <div key={c.title} className="p-6 bg-white rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-indigo-600 font-medium text-sm">{c.info}</p>
                <p className="text-gray-500 text-xs mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Pronto para criar seu site?</h2>
          <p className="text-xl text-indigo-100 mb-10">Comece grátis. Sem cartão de crédito. Publique em minutos.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Criar minha loja grátis
              </Button>
            </Link>
            <Link to="/demo-loja">
              <Button size="lg" variant="outline" className="!border-white/30 !text-white hover:!bg-white/10">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">TV</span>
                </div>
                <div>
                  <span className="font-bold text-white">TV</span>
                  <span className="font-bold text-indigo-400">Loja</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Plataforma SaaS para criação de sites profissionais com vitrine e WhatsApp.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#recursos" className="hover:text-white">Recursos</a></li>
                <li><a href="#planos" className="hover:text-white">Planos</a></li>
                <li><Link to="/demo-loja" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#sobre" className="hover:text-white">Sobre nós</a></li>
                <li><a href="#contato" className="hover:text-white">Contato</a></li>
                <li><a href="#depoimentos" className="hover:text-white">Depoimentos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 TVLoja. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
