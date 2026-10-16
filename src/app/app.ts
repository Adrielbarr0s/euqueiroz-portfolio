import { Component, signal, computed, HostListener } from '@angular/core';

export type ServiceCategory = 'todos' | 'institucional' | 'socialpro' | 'audiovisual';

export interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<ServiceCategory, 'todos'>;
  description: string;
  tag: string;
  mediaType: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  scope?: string;
}

export interface ServiceCard {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  badge: string;
  whatsappMessage: string;
  fullExplanation: string;
  deliverables: string[];
}

export interface QuoteOption {
  id: string;
  label: string;
  category: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly phoneNumber = '558899981195';

  sliderPos = signal<number>(50);
  activeFilter = signal<ServiceCategory>('todos');
  selectedItem = signal<PortfolioItem | null>(null);

  // Controle de expansão do acordeão
  expandedService = signal<ServiceCategory | null>(null);

  // Estados do Modal de Orçamento
  isQuoteModalOpen = signal<boolean>(false);
  selectedServices = signal<string[]>(['Social PRO - Empresas']);
  projectScope = signal<string>('comercial');

  quoteOptions: QuoteOption[] = [
    { id: 'institucional', label: 'Comunicação Institucional', category: 'Posicionamento' },
    { id: 'socialpro', label: 'Social PRO - Empresas', category: 'Gestão & Redes' },
    { id: 'audiovisual', label: 'Audiovisual Freelancer', category: 'Captação & Vídeo' }
  ];

  services: ServiceCard[] = [
    {
      id: 'institucional',
      title: 'Comunicação Institucional',
      subtitle: 'Assessoria de imagem corporativa, tom de voz e relações institucionais',
      badge: 'Corporativo',
      whatsappMessage: 'Olá Queiroz! Gostaria de conversar sobre Comunicação Institucional.',
      fullExplanation: 'Estruturação da reputação e autoridade da marca. Alinha a mensagem transmitida ao mercado, à imprensa e aos parceiros com consistência e padrão executivo.',
      deliverables: [
        'Diagnóstico e alinhamento de posicionamento de marca',
        'Definição de tom de voz e diretrizes oficiais',
        'Redação e assessoria de comunicados e notas públicas',
        'Comunicação institucional interna e externa'
      ]
    },
    {
      id: 'socialpro',
      title: 'Social PRO - Empresas',
      subtitle: 'Estratégia de posicionamento digital, autoridade de marca e redes sociais',
      badge: 'Empresas',
      whatsappMessage: 'Olá Queiroz! Tenho interesse em contratar o Social PRO para a minha empresa.',
      fullExplanation: 'Gestão executiva e estratégica de redes sociais para empresas. Transforma perfis institucionais em canais de alto valor percebido que transmitem credibilidade e convertem clientes.',
      deliverables: [
        'Planejamento de linha editorial estratégica',
        'Produção visual e audiovisual de alta qualidade',
        'Otimização de perfil para conversão e autoridade',
        'Acompanhamento de métricas e posicionamento de mercado'
      ]
    },
    {
      id: 'audiovisual',
      title: 'Audiovisual Freelancer',
      subtitle: 'Captação 4K, edição de alta performance, Reels cinematográficos e eventos',
      badge: 'Produção',
      whatsappMessage: 'Olá Queiroz! Preciso de um orçamento para trabalho Audiovisual Freelancer.',
      fullExplanation: 'Produção em vídeo de nível cinematográfico sob demanda. Atendimento a agências, produtoras e marcas com rigor estético desde a captação até a gradação final de cores.',
      deliverables: [
        'Captação 4K com equipamento cinematográfico profissional',
        'Direção de cena, iluminação e enquadramento',
        'Edição ágil voltada para retenção (Reels, Comerciais e Institucionais)',
        'Color grading autoral e tratamento sonoro'
      ]
    }
  ];

  // Vitrine com suporte a Vídeo 9:16 e Imagens
  portfolioItems = signal<PortfolioItem[]>([
    {
      id: 1,
      title: 'Produção Audiovisual Cinematográfica',
      category: 'audiovisual',
      mediaType: 'video',
      imageUrl: '/foto-color.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Direção, captação 4K com movimentos dinâmicos e color grading autoral voltado para alto engajamento.',
      tag: 'Reels / Vídeo',
      scope: 'Roteiro · Captação 4K · Edição Dinâmica · Color Grading'
    },
    {
      id: 2,
      title: 'Estratégia Social PRO Corporativa',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/logo.png',
      description: 'Transformação do perfil corporativo em canal de autoridade e atração de clientes com design consistente.',
      tag: 'Social PRO',
      scope: 'Linha Editorial · Planejamento Estratégico · Identidade Digital'
    },
    {
      id: 3,
      title: 'Posicionamento Institucional de Marca',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/foto-pb.jpg',
      description: 'Estruturação de narrativa e imagem para apresentação corporativa de alto impacto no mercado.',
      tag: 'Institucional',
      scope: 'Alinhamento Estratégico · Tom de Voz · Comunicação Corporativa'
    }
  ]);

  filteredItems = computed(() => {
    const current = this.activeFilter();
    if (current === 'todos') {
      return this.portfolioItems();
    }
    return this.portfolioItems().filter(item => item.category === current);
  });

  generatedWhatsAppUrl = computed(() => {
    const servicos = this.selectedServices().join(', ');
    const tipo = this.projectScope() === 'comercial' ? 'Empresa / Negócio' : 'Projeto Individual';

    const texto = `Olá Queiroz! Vim através do teu portfólio.\n\n` +
      `Gostaria de solicitar uma proposta:\n` +
      `• *Serviço(s):* ${servicos || 'A definir'}\n` +
      `• *Tipo de demanda:* ${tipo}\n\n` +
      `Podemos conversar sobre agenda e alinhamento de escopo?`;

    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(texto)}`;
  });

  // Rolagem suave até a vitrine de trabalhos
  scrollToPortfolio(): void {
    const section = document.getElementById('portfolio-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleServiceExplanation(id: ServiceCategory): void {
    if (this.expandedService() === id) {
      this.expandedService.set(null);
    } else {
      this.expandedService.set(id);
    }
  }

  onSliderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.sliderPos.set(Number(target.value));
  }

  setFilter(category: ServiceCategory): void {
    this.activeFilter.set(category);
  }

  openLightbox(item: PortfolioItem): void {
    this.selectedItem.set(item);
  }

  closeLightbox(): void {
    this.selectedItem.set(null);
  }

  openQuoteModal(): void {
    this.isQuoteModalOpen.set(true);
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen.set(false);
  }

  toggleServiceSelection(label: string): void {
    const current = this.selectedServices();
    if (current.includes(label)) {
      this.selectedServices.set(current.filter(item => item !== label));
    } else {
      this.selectedServices.set([...current, label]);
    }
  }

  setProjectScope(scope: string): void {
    this.projectScope.set(scope);
  }

  @HostListener('window:keydown.escape')
  handleKeyboardEscape(): void {
    if (this.selectedItem()) {
      this.closeLightbox();
    }
    if (this.isQuoteModalOpen()) {
      this.closeQuoteModal();
    }
  }

  openWhatsApp(customText?: string): void {
    const text = encodeURIComponent(customText || 'Olá Queiroz! Vim pelo seu portfólio e gostaria de um orçamento.');
    window.open(`https://wa.me/${this.phoneNumber}?text=${text}`, '_blank');
  }

  askAboutProject(item: PortfolioItem): void {
    const text = `Olá Queiroz! Vi o trabalho "${item.title}" no seu portfólio e gostaria de uma solução similar.`;
    this.openWhatsApp(text);
  }
}