import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type SectionType = 'hero' | 'products' | 'gallery' | 'contact' | 'text' | 'benefits';

export interface Section {
  id: string;
  type: SectionType;
  content: any;
  settings: {
    backgroundColor?: string;
    padding?: 'sm' | 'md' | 'lg';
    isVisible: boolean;
  };
}

interface EditorState {
  sections: Section[];
  activeSectionId: string | null;
  isPreviewMode: boolean;
  isSaving: boolean;
  
  // Actions
  addSection: (type: SectionType, index?: number) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, content: any, settings?: any) => void;
  reorderSections: (oldIndex: number, newIndex: number) => void;
  setActiveSection: (id: string | null) => void;
  togglePreviewMode: () => void;
  setSections: (sections: Section[]) => void;
  setSaving: (isSaving: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  sections: [],
  activeSectionId: null,
  isPreviewMode: false,
  isSaving: false,

  addSection: (type, index) => set((state) => {
    const newSection: Section = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
      settings: {
        backgroundColor: '#ffffff',
        padding: 'md',
        isVisible: true,
      },
    };
    
    const newSections = [...state.sections];
    if (index !== undefined) {
      newSections.splice(index, 0, newSection);
    } else {
      newSections.push(newSection);
    }
    
    return { sections: newSections, activeSectionId: newSection.id };
  }),

  removeSection: (id) => set((state) => ({
    sections: state.sections.filter((s) => s.id !== id),
    activeSectionId: state.activeSectionId === id ? null : state.activeSectionId,
  })),

  updateSection: (id, content, settings) => set((state) => ({
    sections: state.sections.map((s) => 
      s.id === id ? { ...s, content: { ...s.content, ...content }, settings: { ...s.settings, ...settings } } : s
    ),
  })),

  reorderSections: (oldIndex, newIndex) => set((state) => {
    const newSections = [...state.sections];
    const [moved] = newSections.splice(oldIndex, 1);
    newSections.splice(newIndex, 0, moved);
    return { sections: newSections };
  }),

  setActiveSection: (id) => set({ activeSectionId: id }),
  
  togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),
  
  setSections: (sections) => set({ sections }),
  
  setSaving: (isSaving) => set({ isSaving }),
}));

function getDefaultContent(type: SectionType) {
  switch (type) {
    case 'hero':
      return {
        title: 'Sua Loja, Suas Regras',
        subtitle: 'Crie um site profissional para o seu negócio em minutos.',
        buttonText: 'Ver Produtos',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600',
      };
    case 'products':
      return {
        title: 'Destaques da Semana',
        displayCount: 4,
      };
    case 'benefits':
      return {
        items: [
          { title: 'Entrega Rápida', description: 'Enviamos para todo o Brasil.', icon: 'truck' },
          { title: 'Compra Segura', description: 'Seus dados estão protegidos.', icon: 'shield' },
          { title: 'Atendimento', description: 'Suporte humanizado via WhatsApp.', icon: 'message' },
        ]
      };
    default:
      return {};
  }
}
