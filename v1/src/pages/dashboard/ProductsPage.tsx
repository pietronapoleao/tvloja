import { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Package, 
  Star, StarOff, Eye, EyeOff, MoreHorizontal,
  Image as ImageIcon, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { cn } from '../../utils/cn';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  category?: string;
  createdAt: string;
}

const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Camiseta Premium', 
    slug: 'camiseta-premium',
    description: 'Camiseta 100% algodão de alta qualidade',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200'],
    isFeatured: true,
    isActive: true,
    category: 'Vestuário',
    createdAt: '2024-01-15'
  },
  { 
    id: '2', 
    name: 'Tênis Esportivo', 
    slug: 'tenis-esportivo',
    description: 'Tênis ideal para corrida e academia',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200'],
    isFeatured: true,
    isActive: true,
    category: 'Calçados',
    createdAt: '2024-01-20'
  },
  { 
    id: '3', 
    name: 'Relógio Clássico', 
    slug: 'relogio-classico',
    description: 'Relógio analógico com pulseira de couro',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=200'],
    isFeatured: false,
    isActive: true,
    category: 'Acessórios',
    createdAt: '2024-02-01'
  },
  { 
    id: '4', 
    name: 'Bolsa Feminina', 
    slug: 'bolsa-feminina',
    description: 'Bolsa de couro sintético com alça removível',
    images: [],
    isFeatured: false,
    isActive: false,
    category: 'Acessórios',
    createdAt: '2024-02-10'
  },
];

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [, setShowAddModal] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const toggleActive = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setActionMenuId(null);
  };

  const featuredCount = products.filter(p => p.isFeatured).length;
  const activeCount = products.filter(p => p.isActive).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos da Vitrine</h1>
          <p className="text-gray-500 text-sm">
            {activeCount} produtos ativos · {featuredCount} em destaque
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          Adicionar Produto
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Package className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="font-semibold text-indigo-800">Vitrine sem carrinho de compras</p>
          <p className="text-sm text-indigo-600">
            Seus produtos são exibidos com um botão "Solicitar via WhatsApp". O cliente entra em contato diretamente com você.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar produto pelo nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option>Todas as categorias</option>
          <option>Vestuário</option>
          <option>Calçados</option>
          <option>Acessórios</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className={cn(
              "bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md",
              product.isActive ? "border-gray-100" : "border-gray-200 opacity-60"
            )}
          >
            {/* Image */}
            <div className="aspect-square bg-gray-100 relative">
              {product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                </div>
              )}

              {/* Featured Badge */}
              {product.isFeatured && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Destaque
                </div>
              )}

              {/* Status Badge */}
              {!product.isActive && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-xs font-bold rounded-lg">
                  Inativo
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => toggleFeatured(product.id)}
                  className="p-2 bg-white rounded-lg hover:bg-amber-50"
                  title={product.isFeatured ? 'Remover destaque' : 'Destacar'}
                >
                  {product.isFeatured ? (
                    <StarOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Star className="w-5 h-5 text-amber-500" />
                  )}
                </button>
                <button 
                  onClick={() => toggleActive(product.id)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-50"
                  title={product.isActive ? 'Desativar' : 'Ativar'}
                >
                  {product.isActive ? (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-emerald-500" />
                  )}
                </button>
                <button className="p-2 bg-white rounded-lg hover:bg-indigo-50">
                  <Edit2 className="w-5 h-5 text-indigo-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{product.category}</p>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setActionMenuId(actionMenuId === product.id ? null : product.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {actionMenuId === product.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setActionMenuId(null)} />
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-xl py-1 z-20 shadow-lg">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Edit2 className="w-4 h-4" /> Editar
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Product Card */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
            <Plus className="w-7 h-7 text-gray-400 group-hover:text-indigo-600" />
          </div>
          <span className="font-medium text-gray-500 group-hover:text-indigo-600">Adicionar produto</span>
        </button>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Exibindo {filteredProducts.length} de {products.length} produtos</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
