// Planos conforme documentação
export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    slug: 'free',
    price: 0,
    priceYearly: 0,
    description: 'Subdomínio gratuito, site básico com seções limitadas.',
    features: [
      'Subdomínio .tvloja.com.br',
      'Máximo 5 seções',
      'Logo e cores básicas',
      'Marca TVLoja no rodapé',
      'Até 10 produtos na vitrine',
    ],
    limits: {
      maxSections: 5,
      maxProducts: 10,
      allowCustomDomain: false,
      removeBranding: false,
      maxUsers: 1,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    slug: 'pro',
    price: 4900, // centavos
    priceYearly: 47000,
    description: 'Site completo, domínio próprio, sem anúncios.',
    popular: true,
    features: [
      'Subdomínio ou domínio próprio',
      'Seções ilimitadas',
      'Remoção da marca TVLoja',
      'Suporte prioritário',
      'Até 100 produtos na vitrine',
      'SSL automático',
    ],
    limits: {
      maxSections: null,
      maxProducts: 100,
      allowCustomDomain: true,
      removeBranding: true,
      maxUsers: 1,
    },
  },
  business: {
    id: 'business',
    name: 'Business',
    slug: 'business',
    price: 9900,
    priceYearly: 95000,
    description: 'Recursos avançados, múltiplos usuários, API de domínio.',
    features: [
      'Tudo do Pro',
      'Compra/consulta domínio via API',
      'Até 5 usuários no painel',
      'Relatórios financeiros',
      'Produtos ilimitados',
      'Suporte premium 24h',
    ],
    limits: {
      maxSections: null,
      maxProducts: null,
      allowCustomDomain: true,
      removeBranding: true,
      maxUsers: 5,
    },
  },
};

// Tipos de layout do site
export const LAYOUT_TYPES = {
  landing: { id: 'landing', name: 'Landing Page', description: 'Página única com foco em conversão' },
  institutional: { id: 'institutional', name: 'Institucional', description: 'Site com múltiplas páginas informativas' },
  showcase: { id: 'showcase', name: 'Vitrine', description: 'Catálogo de produtos com WhatsApp' },
};

// Status de tenant
export const TENANT_STATUS = {
  active: { label: 'Ativo', color: 'emerald' },
  blocked: { label: 'Bloqueado', color: 'red' },
  cancelled: { label: 'Cancelado', color: 'gray' },
};

// Status de fatura
export const INVOICE_STATUS = {
  pending: { label: 'Pendente', color: 'amber' },
  paid: { label: 'Pago', color: 'emerald' },
  overdue: { label: 'Vencido', color: 'red' },
  cancelled: { label: 'Cancelado', color: 'gray' },
};

// Status de DNS/SSL
export const DNS_STATUS = {
  pending: { label: 'Pendente', color: 'amber' },
  active: { label: 'Ativo', color: 'emerald' },
  error: { label: 'Erro', color: 'red' },
};

// Régua de cobrança conforme documentação
export const BILLING_RULES = [
  { day: -7, event: 'invoice_generated', channels: ['email', 'whatsapp'], description: 'Fatura gerada' },
  { day: -3, event: 'reminder', channels: ['whatsapp'], description: 'Lembrete de vencimento' },
  { day: 0, event: 'due_date', channels: ['email', 'whatsapp'], description: 'Dia do vencimento' },
  { day: 1, event: 'overdue_notice', channels: ['email', 'whatsapp'], description: 'Aviso de atraso' },
  { day: 5, event: 'block_warning', channels: ['email', 'whatsapp'], description: 'Alerta de bloqueio' },
  { day: 10, event: 'account_blocked', channels: ['email', 'whatsapp'], description: 'Bloqueio automático' },
];

// Eventos de notificação
export const NOTIFICATION_EVENTS = {
  signup_completed: { whatsapp: true, email: true, description: 'Cadastro realizado' },
  welcome: { whatsapp: true, email: true, description: 'Boas-vindas' },
  invoice_generated: { whatsapp: true, email: true, description: 'Fatura gerada' },
  payment_reminder: { whatsapp: true, email: false, description: 'Lembrete vencimento' },
  overdue_d1: { whatsapp: true, email: true, description: 'Atraso D+1' },
  block_warning: { whatsapp: true, email: true, description: 'Alerta bloqueio D+5' },
  account_blocked: { whatsapp: true, email: true, description: 'Conta bloqueada' },
  payment_confirmed: { whatsapp: true, email: true, description: 'Pagamento confirmado' },
  domain_configured: { whatsapp: false, email: true, description: 'Domínio configurado' },
  domain_expiring: { whatsapp: true, email: true, description: 'Domínio expirando' },
};

// Tipos de seção do editor
export const SECTION_TYPES = [
  { type: 'hero', name: 'Hero', icon: 'Layout', description: 'Banner principal com CTA' },
  { type: 'about', name: 'Sobre', icon: 'User', description: 'Sobre a empresa' },
  { type: 'services', name: 'Serviços', icon: 'Briefcase', description: 'Lista de serviços' },
  { type: 'products', name: 'Produtos', icon: 'ShoppingBag', description: 'Vitrine de produtos' },
  { type: 'gallery', name: 'Galeria', icon: 'Image', description: 'Galeria de imagens' },
  { type: 'testimonials', name: 'Depoimentos', icon: 'MessageSquare', description: 'Avaliações de clientes' },
  { type: 'contact', name: 'Contato', icon: 'Mail', description: 'Formulário de contato' },
  { type: 'faq', name: 'FAQ', icon: 'HelpCircle', description: 'Perguntas frequentes' },
  { type: 'video', name: 'Vídeo', icon: 'Play', description: 'YouTube ou Vimeo' },
  { type: 'map', name: 'Mapa', icon: 'MapPin', description: 'Localização no Google Maps' },
];

export const formatPrice = (cents: number): string => {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
};
