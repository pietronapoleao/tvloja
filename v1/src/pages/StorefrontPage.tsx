import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Star, Phone, Mail, MapPin,
  ArrowRight, MessageCircle, Menu, X, Lock, AlertTriangle, Zap
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from '../components/ui/Button';

// Demo tenant - in production fetched from API by slug/subdomain
const DEMO_STORE = {
  name: 'Moda Plus',
  slug: 'moda-plus',
  primaryColor: '#6366f1',
  whatsappNumber: '5511999999999',
  layoutType: 'showcase' as const,
  planSlug: 'pro',
  planStatus: 'active',
  isPublished: true,
  hasDomain: true,
};

const DEMO_SECTIONS = [
  { id: '1', type: 'hero', content: { title: 'Nova Coleção Verão 2025', subtitle: 'Peças exclusivas que combinam conforto e elegância.', buttonText: 'Ver Catálogo', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600' } },
  { id: '2', type: 'about', content: { title: 'Sobre Nós', text: 'Somos especializados em moda feminina, trazendo as melhores tendências com qualidade e preço justo. Mais de 10 anos de experiência no mercado.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=600' } },
  { id: '3', type: 'products', content: { title: 'Nossos Produtos', subtitle: 'Confira os destaques e solicite pelo WhatsApp' } },
  { id: '4', type: 'testimonials', content: { title: 'Avaliações de clientes', items: [{ name: 'Carla M.', text: 'Roupas de qualidade! Já sou cliente há 3 anos.', rating: 5 }, { name: 'Fernanda S.', text: 'Atendimento nota 10, sempre ajudam a escolher.', rating: 5 }, { name: 'Juliana R.', text: 'Entrega rápida e embalagem caprichada.', rating: 5 }] } },
  { id: '5', type: 'contact', content: { title: 'Entre em Contato', address: 'Rua das Flores, 123 - São Paulo/SP', phone: '(11) 9 9999-9999', email: 'contato@modaplus.com.br', hours: 'Seg-Sex: 9h-18h | Sáb: 9h-13h' } },
];

const DEMO_PRODUCTS = [
  { id: '1', name: 'Vestido Floral', desc: 'Vestido midi estampa floral', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400', featured: true },
  { id: '2', name: 'Blusa Premium', desc: 'Blusa algodão premium', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400', featured: true },
  { id: '3', name: 'Calça Skinny', desc: 'Jeans skinny cintura alta', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400', featured: false },
  { id: '4', name: 'Saia Midi', desc: 'Saia plissada elegante', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=400', featured: true },
  { id: '5', name: 'Jaqueta Couro', desc: 'Jaqueta couro sintético', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400', featured: false },
  { id: '6', name: 'Bolsa Tiracolo', desc: 'Couro ecológico premium', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400', featured: true },
];

// Page rendered when tenant has no active plan or domain
function InactiveStorePage({ reason }: { reason: 'no_plan' | 'no_domain' | 'blocked' | 'not_found' }) {
  const messages = {
    no_plan: { title: 'Site ainda não ativado', desc: 'O proprietário desta loja precisa ativar um plano para publicar o site.', icon: Lock },
    no_domain: { title: 'Domínio não configurado', desc: 'Este domínio ainda não foi vinculado a uma loja TVLoja.', icon: AlertTriangle },
    blocked: { title: 'Site temporariamente suspenso', desc: 'Esta loja está temporariamente indisponível. Entre em contato com o proprietário.', icon: AlertTriangle },
    not_found: { title: 'Loja não encontrada', desc: 'Não encontramos nenhuma loja com esse endereço.', icon: AlertTriangle },
  };
  const msg = messages[reason];
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <msg.icon className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{msg.title}</h1>
        <p className="text-gray-600 mb-8">{msg.desc}</p>
        <div className="space-y-3">
          <Link to="/auth/register">
            <Button className="w-full" rightIcon={<Zap className="w-4 h-4" />}>Criar sua própria loja</Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">Voltar para TVLoja</Button>
          </Link>
        </div>
        <p className="mt-8 text-xs text-gray-400">
          Powered by <Link to="/" className="text-indigo-500 hover:underline">TVLoja</Link>
        </p>
      </div>
    </div>
  );
}

export function StorefrontPage() {
  const { slug } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const isDemo = !slug; // /demo-loja has no slug param

  // In production: fetch tenant by slug from API
  // If not found or inactive, show InactiveStorePage
  const store = DEMO_STORE;
  
  // Simulated validation
  if (!isDemo && slug === 'bloqueada') return <InactiveStorePage reason="blocked" />;
  if (!isDemo && slug === 'sem-plano') return <InactiveStorePage reason="no_plan" />;
  if (!store.isPublished && !isDemo) return <InactiveStorePage reason="no_plan" />;
  if (!store.hasDomain && !isDemo) return <InactiveStorePage reason="no_domain" />;

  const whatsappUrl = `https://wa.me/${store.whatsappNumber}`;
  const sections = DEMO_SECTIONS;
  const products = DEMO_PRODUCTS;

  return (
    <div className="min-h-screen bg-white">
      {/* Demo banner */}
      {isDemo && (
        <div className="bg-indigo-600 text-white text-center py-2 px-4 text-sm font-medium">
          🎯 Esta é uma <strong>demonstração</strong> de vitrine. 
          <Link to="/auth/register" className="underline ml-1">Crie a sua gratuitamente →</Link>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: store.primaryColor }}>
                {store.name[0]}
              </div>
              <span className="text-lg font-bold text-gray-900">{store.name}</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#inicio" className="text-gray-600 hover:text-gray-900 text-sm">Início</a>
              <a href="#sobre" className="text-gray-600 hover:text-gray-900 text-sm">Sobre</a>
              <a href="#produtos" className="text-gray-600 hover:text-gray-900 text-sm">Produtos</a>
              <a href="#contato" className="text-gray-600 hover:text-gray-900 text-sm">Contato</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
              {['Início', 'Sobre', 'Produtos', 'Contato'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">{l}</a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Sections */}
      {sections.map((section) => {
        const c = section.content;
        switch (section.type) {
          case 'hero':
            return (
              <section key={section.id} id="inicio" className="relative h-[65vh] min-h-[450px] flex items-center">
                <img src={c.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-lg">{c.title}</h1>
                  <p className="text-lg text-white/80 mb-8 max-w-md">{c.subtitle}</p>
                  <a href="#produtos" className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl" style={{ backgroundColor: store.primaryColor }}>
                    {c.buttonText} <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </section>
            );
          case 'about':
            return (
              <section key={section.id} id="sobre" className="py-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-5">{c.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{c.text}</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl"><img src={c.imageUrl} className="w-full h-[320px] object-cover" alt="" /></div>
                </div>
              </section>
            );
          case 'products':
            return (
              <section key={section.id} id="produtos" className="py-20 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{c.title}</h2>
                    <p className="text-gray-500">{c.subtitle}</p>
                  </div>
                  <div className="flex justify-center gap-2 mb-8">
                    <button onClick={() => setFilter('all')} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", filter === 'all' ? 'text-white' : 'bg-white text-gray-600 border border-gray-200')} style={filter === 'all' ? { backgroundColor: store.primaryColor } : {}}>Todos</button>
                    <button onClick={() => setFilter('featured')} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", filter === 'featured' ? 'text-white' : 'bg-white text-gray-600 border border-gray-200')} style={filter === 'featured' ? { backgroundColor: store.primaryColor } : {}}>Destaques</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => filter === 'all' || p.featured).map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
                        <div className="aspect-[4/5] overflow-hidden relative">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          {p.featured && <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1"><Star className="w-3 h-3" /> Destaque</div>}
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                          <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                          <a href={`${whatsappUrl}?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${p.name}`)}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
                            <MessageCircle className="w-4 h-4" /> Solicitar via WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'testimonials':
            return (
              <section key={section.id} className="py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{c.title}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {(c.items || []).map((item: any, i: number) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex gap-1 mb-3">{[...Array(item.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                        <p className="text-gray-700 mb-4 italic text-sm">"{item.text}"</p>
                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'contact':
            return (
              <section key={section.id} id="contato" className="py-20 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">{c.title}</h2>
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-white rounded-2xl"><Phone className="w-7 h-7 mx-auto mb-3" style={{ color: store.primaryColor }} /><p className="font-semibold text-gray-900 text-sm">{c.phone}</p></div>
                    <div className="p-6 bg-white rounded-2xl"><Mail className="w-7 h-7 mx-auto mb-3" style={{ color: store.primaryColor }} /><p className="font-semibold text-gray-900 text-sm">{c.email}</p></div>
                    <div className="p-6 bg-white rounded-2xl"><MapPin className="w-7 h-7 mx-auto mb-3" style={{ color: store.primaryColor }} /><p className="font-semibold text-gray-900 text-sm">{c.address}</p></div>
                  </div>
                  <p className="text-gray-500 text-sm">{c.hours}</p>
                </div>
              </section>
            );
          default: return null;
        }
      })}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: store.primaryColor }}>{store.name[0]}</div>
            <span className="text-lg font-bold">{store.name}</span>
          </div>
          <p className="text-gray-400 text-sm">
            Feito com <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium">TVLoja</Link>
          </p>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all z-50">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
