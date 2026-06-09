import { 
  Plus, Save, Eye, EyeOff, Monitor, Smartphone, 
  ChevronLeft, Settings, Layers, Trash2, GripVertical,
  Type, Image as ImageIcon, ShoppingBag, Layout
} from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import { useEditorStore, SectionType, Section } from '../../store/useEditorStore';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../utils/cn';

// --- Sub-componente: Sortable Section Item ---
function SortableSection({ section }: { section: Section }) {
  const { activeSectionId, setActiveSection, removeSection } = useEditorStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const isActive = activeSectionId === section.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative border-2 transition-all",
        isActive ? "border-indigo-600 ring-2 ring-indigo-600/20" : "border-transparent hover:border-indigo-300",
        isDragging && "opacity-50 grayscale"
      )}
      onClick={() => setActiveSection(section.id)}
    >
      {!isDragging && (
        <div className="absolute -left-10 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div {...attributes} {...listeners} className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
            className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white">
        <SectionRenderer section={section} />
      </div>
    </div>
  );
}

// --- Componente de Renderização de Seção ---
function SectionRenderer({ section }: { section: Section }) {
  const { type, content } = section;

  switch (type) {
    case 'hero':
      return (
        <div className="relative h-[400px] flex items-center justify-center text-center px-8 overflow-hidden">
          <img src={content.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg opacity-90 mb-8">{content.subtitle}</p>
            <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg">{content.buttonText}</button>
          </div>
        </div>
      );
    case 'benefits':
      return (
        <div className="py-16 px-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.items.map((item: any, i: number) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'products':
      return (
        <div className="py-16 px-8">
          <h2 className="text-2xl font-bold text-center mb-12">{content.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gray-100 aspect-square rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div className="p-8 text-center text-gray-400 bg-gray-50 italic">Seção: {type}</div>;
  }
}

// --- Main Page Component ---
export function EditorPage() {
  const { 
    sections, 
    addSection, 
    reorderSections, 
    isPreviewMode, 
    togglePreviewMode,
    isSaving,
    setSaving
  } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 800));
    toast('success', 'Layout salvo!', `${sections.length} seções salvas com sucesso.`);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col z-[100]">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="h-6 w-px bg-gray-200" />
          <h1 className="font-bold text-gray-900">Construtor de Site</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button className="p-2 rounded-lg bg-white shadow-sm text-indigo-600"><Monitor className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700"><Smartphone className="w-4 h-4" /></button>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <Button variant="outline" size="sm" onClick={togglePreviewMode} leftIcon={isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}>
            {isPreviewMode ? 'Editar' : 'Visualizar'}
          </Button>
          <Button size="sm" onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            Salvar Alterações
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {!isPreviewMode && (
          <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Adicionar Seções</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'hero' as SectionType, label: 'Hero', icon: Layout },
                  { type: 'benefits' as SectionType, label: 'Benefícios', icon: Layers },
                  { type: 'products' as SectionType, label: 'Produtos', icon: ShoppingBag },
                  { type: 'gallery' as SectionType, label: 'Galeria', icon: ImageIcon },
                  { type: 'text' as SectionType, label: 'Texto', icon: Type },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => addSection(item.type)}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
                  >
                    <item.icon className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 mb-2" />
                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        <main className={cn(
          "flex-1 overflow-y-auto p-12 transition-all duration-300",
          isPreviewMode ? "bg-white" : "bg-gray-100"
        )}>
          <div className={cn(
            "mx-auto bg-white transition-all shadow-2xl",
            isPreviewMode ? "max-w-full min-h-full" : "max-w-[1000px] min-h-[800px] rounded-lg border border-gray-200"
          )}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col">
                  {sections.length > 0 ? (
                    sections.map((section) => (
                      <SortableSection key={section.id} section={section} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-40 px-8 text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Plus className="w-10 h-10 text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Seu site está vazio</h3>
                      <p className="text-gray-500 max-w-sm mx-auto">Clique nos componentes da barra lateral para começar a construir sua loja.</p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </main>

        {!isPreviewMode && (
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-gray-900">Configurações</span>
            </div>
            <div className="p-6">
              <p className="text-center text-gray-400 text-sm italic">
                Selecione uma seção no site para editar suas propriedades.
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

