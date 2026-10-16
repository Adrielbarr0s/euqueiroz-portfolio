import { Component, signal, computed, HostListener } from '@angular/core';

export type ServiceCategory = 'todos' | 'institucional' | 'socialpro' | 'audiovisual';

export interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<ServiceCategory, 'todos'>;
  description: string;
  tag: string;
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  instagramUrl?: string;
  scope?: string;
  highlightBadge?: string;
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

  visibleCount = signal<number>(6);
  expandedService = signal<ServiceCategory | null>(null);

  isQuoteModalOpen = signal<boolean>(false);
  selectedServices = signal<string[]>(['Comunicação Institucional']);
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
        'Planeamento de linha editorial estratégica',
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

  portfolioItems = signal<PortfolioItem[]>([
    {
      id: 1,
      title: 'Campanha Institucional · Secretaria de Assistência Social',
      category: 'institucional',
      mediaType: 'video',
      imageUrl: '/portfolio/foto-01.jpeg',
      instagramUrl: 'https://www.instagram.com/reel/DavHUB3u9Mg/?obrf=eDFrbmtwOGRkc2Fw',
      description: 'Produção e captação audiovisual oficial para a Secretaria Municipal de Assistência Social e Cidadania, valorizando as ações públicas de acolhimento.',
      tag: 'Reel Oficial',
      highlightBadge: 'Secretaria Municipal',
      scope: 'Captação Dinâmica · Roteiro Institucional · Montagem para Instagram'
    },
    {
      id: 2,
      title: 'Acredita no Primeiro Passo · Cobertura Oficial',
      category: 'institucional',
      mediaType: 'video',
      imageUrl: '/portfolio/foto-02.jpeg',
      instagramUrl: 'https://www.instagram.com/reel/DavI3rTuuzw/?vrfl=MjAwaXQ1enlrcTdh',
      description: 'Registo ágil e dinâmico de evento institucional com presença de lideranças comunitárias e equipa técnica governamental.',
      tag: 'Reel Oficial',
      highlightBadge: 'Ação Social',
      scope: 'Cobertura Audiovisual · Edição de Ritmo · Captação de Áudio Direto'
    },
    {
      id: 3,
      title: 'Registo Arquitetónico de Obras Públicas',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-04.jpeg',
      instagramUrl: 'https://www.instagram.com/p/DSDkkl6Em9W/?img_index=11&rpxt=Mjl1OXp5ZTl3M2Q0',
      description: 'Documentação visual de infraestrutura com iluminação natural rigorosa. Fotografias reconhecidas e elogiadas formalmente pelo Governador Rafael Fonteles.',
      tag: 'Fotografia Oficial',
      highlightBadge: 'Destaque Estadual',
      scope: 'Fotografia de Infraestrutura · Tratamento Fino · Documentação'
    },
    {
      id: 4,
      title: 'Campanha Social PRO para Negócios',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-03.jpeg',
      description: 'Produção e direção de conteúdo estratégico voltado para conversão.',
      tag: 'Social PRO',
      scope: 'Linha Editorial · Direção de Arte · Captação'
    },
    {
      id: 5,
      title: 'Produção Publicitária para Redes Sociais',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-05.jpeg',
      description: 'Estética cinematográfica adaptada aos padrões de retenção do Instagram.',
      tag: 'Social PRO',
      scope: 'Estratégia Visual · Roteiro de Conteúdo'
    },
    {
      id: 6,
      title: 'Color Grading & Pós-Produção Fina',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-06.jpeg',
      description: 'Tratamento de cor profissional realçando a atmosfera de cena.',
      tag: 'Audiovisual',
      scope: 'Correção de Cor · Gradação Autoral · Finalização'
    },
    {
      id: 7,
      title: 'Identidade e Comunicação Corporativa',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-07.jpeg',
      description: 'Padronização de imagem institucional para marcas em expansão.',
      tag: 'Institucional',
      scope: 'Diretrizes Visuais · Consultoria de Imagem'
    },
    {
      id: 8,
      title: 'Editorial Social PRO de Marca',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-08.jpeg',
      description: 'Fotografia e direção visual para fortalecimento de presença digital.',
      tag: 'Social PRO',
      scope: 'Ensaio Comercial · Curadoria de Feed'
    },
    {
      id: 9,
      title: 'Captação Dinâmica de Imagem',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-09.jpeg',
      description: 'Movimentos de câmara e ângulos assertivos para projetos pontuais.',
      tag: 'Audiovisual',
      scope: 'Operação de Câmara · Estabilização'
    },
    {
      id: 10,
      title: 'Comunicação Oficial & Relações Públicas',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-10.jpeg',
      description: 'Documentação estratégica para relatórios e comunicados de imprensa.',
      tag: 'Institucional',
      scope: 'Fotodocumentarismo · Registo Institucional'
    },
    {
      id: 11,
      title: 'Ativação de Marca em Mídias Digitais',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-11.jpeg',
      description: 'Criação de narrativa e conteúdos de alto valor de engajamento.',
      tag: 'Social PRO',
      scope: 'Produção Audiovisual · Identidade de Campanha'
    },
    {
      id: 12,
      title: 'Iluminação & Estética Cinematográfica',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-12.jpeg',
      description: 'Desenho de luz personalizado para valorização de texturas e ambientes.',
      tag: 'Audiovisual',
      scope: 'Direção de Fotografia · Iluminação de Estúdio'
    },
    {
      id: 13,
      title: 'Retrato de Autoridade Institucional',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-13.jpeg',
      description: 'Posicionamento executivo de alto padrão para diretoria.',
      tag: 'Institucional',
      scope: 'Retrato de Estúdio · Retoque Fino'
    },
    {
      id: 14,
      title: 'Planeamento Visual Social PRO',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-14.jpeg',
      description: 'Construção contínua de credibilidade nas plataformas digitais.',
      tag: 'Social PRO',
      scope: 'Linha Gráfica · Gestão de Ativos Visuais'
    },
    {
      id: 15,
      title: 'Gravação Externa Freelance',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-15.jpeg',
      description: 'Captação em locação com adaptação dinâmica de luz natural.',
      tag: 'Audiovisual',
      scope: 'Captação Externa · Captação de Áudio Direto'
    },
    {
      id: 16,
      title: 'Apresentação Institucional de Empresa',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-16.jpeg',
      description: 'Imagens que traduzem a infraestrutura e solidez da organização.',
      tag: 'Institucional',
      scope: 'Registo de Infraestrutura · Imagem Corporativa'
    },
    {
      id: 17,
      title: 'Campanha de Produto Social PRO',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-17.jpeg',
      description: 'Foco nos atributos do produto com estética moderna e minimalista.',
      tag: 'Social PRO',
      scope: 'Still de Produto · Iluminação Dedicada'
    },
    {
      id: 18,
      title: 'Cobertura Audiovisual com Ritmo',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-18.jpeg',
      description: 'Edição dinâmica e montagem rápida para pós-evento.',
      tag: 'Audiovisual',
      scope: 'Same-day Edit · Reels de Alto Impacto'
    },
    {
      id: 19,
      title: 'Assessoria de Tom de Voz & Imagem',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-19.jpeg',
      description: 'Harmonização entre discurso corporativo e elementos visuais.',
      tag: 'Institucional',
      scope: 'Diagnóstico de Marca · Tom de Voz'
    },
    {
      id: 20,
      title: 'Série de Conteúdos Social PRO',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-20.jpeg',
      description: 'Produção seriada para frequência de publicação com consistência.',
      tag: 'Social PRO',
      scope: 'Direção Contínua · Otimização de Cronograma'
    },
    {
      id: 21,
      title: 'Direção Técnica em Estúdio',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-21.jpeg',
      description: 'Controlo rigoroso de áudio, enquadramento e teleprompter.',
      tag: 'Audiovisual',
      scope: 'Gravação em Estúdio · Monitorização 4K'
    },
    {
      id: 22,
      title: 'Divulgação Institucional Estratégica',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-22.jpeg',
      description: 'Fotografia pensada para suportes impressos e digitais.',
      tag: 'Institucional',
      scope: 'Alta Resolução · Preparação para Gráfica'
    },
    {
      id: 23,
      title: 'Design de Presença Digital Corporativa',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-23.jpeg',
      description: 'Evolução e sofisticação da perceção de marca na rede.',
      tag: 'Social PRO',
      scope: 'Consultoria Social PRO · Conversão'
    },
    {
      id: 24,
      title: 'Montagem & Pós-Produção Ágil',
      category: 'audiovisual',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-24.jpeg',
      description: 'Cortes precisos no tempo da batida e sound design imersivo.',
      tag: 'Audiovisual',
      scope: 'Montagem · Efeitos Sonoros · Trilha Comercial'
    },
    {
      id: 25,
      title: 'Reputação e Relações Corporativas',
      category: 'institucional',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-25.jpeg',
      description: 'Sustentação visual contínua para projetos de longo prazo.',
      tag: 'Institucional',
      scope: 'Assessoria Contínua · Posicionamento'
    },
    {
      id: 26,
      title: 'Direção Criativa Integral',
      category: 'socialpro',
      mediaType: 'image',
      imageUrl: '/portfolio/foto-26.jpeg',
      description: 'Alinhamento completo entre comunicação, redes sociais e vídeo.',
      tag: 'Social PRO',
      scope: 'Direção Geral · Entrega Estratégica'
    }
  ]);

  filteredItems = computed(() => {
    const current = this.activeFilter();
    if (current === 'todos') {
      return this.portfolioItems();
    }
    return this.portfolioItems().filter(item => item.category === current);
  });

  displayedItems = computed(() => {
    return this.filteredItems().slice(0, this.visibleCount());
  });

  loadMore(): void {
    this.visibleCount.update(count => count + 6);
  }

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
    this.visibleCount.set(6);
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

  // Envio da proposta formatada pelo WhatsApp
  sendQuoteWhatsApp(): void {
    const servicos = this.selectedServices().join(', ');
    const tipo = this.projectScope() === 'comercial' ? 'Empresa / Negócio' : 'Projeto Individual';

    const texto = `Olá Queiroz! Vim através do teu portfólio.\n\n` +
      `Gostaria de solicitar uma proposta:\n` +
      `• *Serviço(s):* ${servicos || 'A definir'}\n` +
      `• *Tipo de demanda:* ${tipo}\n\n` +
      `Podemos conversar sobre agenda e alinhamento de escopo?`;

    this.openWhatsApp(texto);
    this.closeQuoteModal();
  }

  openWhatsApp(customText?: string): void {
    const text = encodeURIComponent(customText || 'Olá Queiroz! Vim pelo seu portfólio e gostaria de um orçamento.');
    window.open(`https://wa.me/${this.phoneNumber}?text=${text}`, '_blank');
  }

  askAboutProject(item: PortfolioItem): void {
    const text = `Olá Queiroz! Vi o projeto "${item.title}" no seu portfólio e gostaria de solicitar uma proposta institucional.`;
    this.openWhatsApp(text);
  }
}