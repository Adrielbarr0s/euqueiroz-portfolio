import { Component, signal, computed, HostListener } from '@angular/core';

export type ServiceCategory = 'institucional' | 'socialpro' | 'audiovisual';

export interface InstitutionalProject {
  id: number;
  title: string;
  entity: string;
  tag: string;
  description: string;
  highlight: string;
  instagramUrl: string;
  scope: string;
}

export interface VideoProject {
  id: number;
  title: string;
  tag: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  scope: string;
}

export interface PhotoItem {
  id: number;
  title: string;
  category: 'Batizado' | 'Ensaio Infantil' | 'Festa Temática' | 'Ensaio Externo';
  imageUrl: string;
  description: string;
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
  expandedService = signal<ServiceCategory | null>(null);

  // Paginação da galeria de fotos (exibe 6 inicialmente)
  visiblePhotosCount = signal<number>(6);

  // Janela modal (Lightbox de fotos)
  selectedPhoto = signal<PhotoItem | null>(null);

  // Modal de Orçamento
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

  // 1. PROJETOS INSTITUCIONAIS REAIS (VALIDAÇÃO OFICIAL)
  institutionalProjects: InstitutionalProject[] = [
    {
      id: 1,
      title: 'Campanha Institucional · Assistência Social',
      entity: 'Secretaria Municipal de Cidadania',
      tag: 'Reel Oficial',
      description: 'Captação audiovisual e roteiro dinâmico valorizando as ações de acolhimento público e apoio à comunidade.',
      highlight: 'Órgão Municipal',
      instagramUrl: 'https://www.instagram.com/reel/DavHUB3u9Mg/?obrf=eDFrbmtwOGRkc2Fw',
      scope: 'Captação de Campo · Edição para Reels · Roteiro Oficial'
    },
    {
      id: 2,
      title: 'Programa Acredita no Primeiro Passo',
      entity: 'Ação Social Governamental',
      tag: 'Cobertura Oficial',
      description: 'Registo ágil e dinâmico de evento institucional com presença de lideranças comunitárias e equipa técnica.',
      highlight: 'Iniciativa Governamental',
      instagramUrl: 'https://www.instagram.com/reel/DavI3rTuuzw/?vrfl=MjAwaXQ1enlrcTdh',
      scope: 'Cobertura em Tempo Real · Captação de Áudio Direto · Finalização Ágil'
    },
    {
      id: 3,
      title: 'Registo Arquitetónico de Obras Públicas',
      entity: 'Infraestrutura & Governo',
      tag: 'Documentação Fotográfica',
      description: 'Documentação rigorosa de infraestrutura pública. Fotografias que foram formalmente reconhecidas e elogiadas pelo Governador Rafael Fonteles.',
      highlight: 'Elogio do Governador Rafael Fonteles',
      instagramUrl: 'https://www.instagram.com/p/DSDkkl6Em9W/?img_index=11&rpxt=Mjl1OXp5ZTl3M2Q0',
      scope: 'Fotografia de Infraestrutura · Tratamento Fino de Luz · Divulgação Oficial'
    }
  ];

  // 2. VÍDEOS AUDIOVISUAIS FREELANCER
  videoProjects: VideoProject[] = [
    {
      id: 1,
      title: 'Arraiá Aurenivia Ribeiro',
      tag: 'Cobertura Audiovisual',
      description: 'Captação noturna com foco no movimento, cores vivas de palco e ritmo festivo comunitário.',
      videoUrl: '/portfolio/video-arraia.mp4',
      posterUrl: '/portfolio/foto-11.jpeg',
      scope: 'Captação 4K Noturna · Edição com Batida Musical · Color Grading Vibrante'
    },
    {
      id: 2,
      title: 'Fronteiras · Produção Cinematográfica',
      tag: 'Produção Regional',
      description: 'Planos abertos, texturas naturais e narrativa cinematográfica para valorização cultural e de marca.',
      videoUrl: '/portfolio/video-fronteiras.mp4',
      posterUrl: '/portfolio/foto-20.jpeg',
      scope: 'Direção de Fotografia · Planos Abertos 4K · Sound Design Imersivo'
    }
  ];

  // 3. AS 26 FOTOS COM CLASSIFICAÇÃO REAL E COERENTE
  photoGallery: PhotoItem[] = [
    // Batizado e Celebração Litúrgica (Fotos 01 a 06)
    { id: 1, title: 'Unção e Sacramento do Batismo', category: 'Batizado', imageUrl: '/portfolio/foto-01.jpeg', description: 'Registo do momento solene com respeito litúrgico e foco na emoção familiar.' },
    { id: 2, title: 'Bênção Batismal na Pia', category: 'Batizado', imageUrl: '/portfolio/foto-02.jpeg', description: 'Captação do gesto cerimonial com iluminação natural suave.' },
    { id: 3, title: 'Celebração da Vida e Sacramento', category: 'Batizado', imageUrl: '/portfolio/foto-03.jpeg', description: 'Expressão espontânea e acolhimento dos padrinhos.' },
    { id: 4, title: 'Acolhimento Familiar no Altar', category: 'Batizado', imageUrl: '/portfolio/foto-04.jpeg', description: 'Retrato solene de família reunida na igreja.' },
    { id: 5, title: 'Cumplicidade Materna em Cerimónia', category: 'Batizado', imageUrl: '/portfolio/foto-05.jpeg', description: 'Momento de carinho e afeto durante a celebração religiosa.' },
    { id: 6, title: 'Pormenor do Toque das Mãos', category: 'Batizado', imageUrl: '/portfolio/foto-06.jpeg', description: 'Plano de detalhe poético realçando laços e afeto.' },

    // Ensaio de Bebé e Estúdio (Fotos 07 a 10)
    { id: 7, title: 'Ensaio Bebé em Luz Neutra', category: 'Ensaio Infantil', imageUrl: '/portfolio/foto-07.jpeg', description: 'Fotografia infantil com paleta suave e luz difusa.' },
    { id: 8, title: 'Acompanhamento de Primeiros Meses', category: 'Ensaio Infantil', imageUrl: '/portfolio/foto-08.jpeg', description: 'Retrato de estúdio focado em expressões espontâneas.' },
    { id: 9, title: 'Retrato Infantil Clássico', category: 'Ensaio Infantil', imageUrl: '/portfolio/foto-09.jpeg', description: 'Composição minimalista focada no olhar e serenidade.' },
    { id: 10, title: 'Retrato de Mãe e Filha em Estúdio', category: 'Ensaio Infantil', imageUrl: '/portfolio/foto-10.jpeg', description: 'Esquema de luz acolhedor para memória de família.' },

    // Festas e Aniversários Temáticos (Fotos 11 a 16)
    { id: 11, title: 'Festa Temática · Celine 1º Ano', category: 'Festa Temática', imageUrl: '/portfolio/foto-11.jpeg', description: 'Cobertura viva com personagens e interação infantil.' },
    { id: 12, title: 'Cenografia e Decoração de Mesa', category: 'Festa Temática', imageUrl: '/portfolio/foto-12.jpeg', description: 'Valorização de detalhes cenográficos para organizadores e marcas.' },
    { id: 13, title: 'Personagens e Alegria no Salão', category: 'Festa Temática', imageUrl: '/portfolio/foto-13.jpeg', description: 'Captação espontânea de movimento durante o espetáculo.' },
    { id: 14, title: 'Pormenores da Decoração Infantil', category: 'Festa Temática', imageUrl: '/portfolio/foto-14.jpeg', description: 'Registo técnico de iluminação de mesas e doces.' },
    { id: 15, title: 'Painel Cenográfico com a Família', category: 'Festa Temática', imageUrl: '/portfolio/foto-15.jpeg', description: 'Fotografia de conjunto harmonizada com as cores do tema.' },
    { id: 16, title: 'Comemoração e Crianças Reunidas', category: 'Festa Temática', imageUrl: '/portfolio/foto-16.jpeg', description: 'Registo do momento festivo entre convidados.' },

    // Ensaios Externos ao Pôr do Sol (Fotos 17 a 26)
    { id: 17, title: 'Ensaio Externo · Golden Hour', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-17.jpeg', description: 'Luz dourada do entardecer realçando tons quentes e naturais.' },
    { id: 18, title: 'Afeto e Abraço Materno no Campo', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-18.jpeg', description: 'Retrato emotivo com desfoque de fundo harmonioso.' },
    { id: 19, title: 'Toque de Mãos em Contraluz', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-19.jpeg', description: 'Estética cinematográfica aproveitando a luz poética do sol poente.' },
    { id: 20, title: 'Olhares e Horizonte Aberto', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-20.jpeg', description: 'Composição ampla em harmonia com a natureza.' },
    { id: 21, title: 'Espontaneidade ao Ar Livre', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-21.jpeg', description: 'Captura sem poses rígidas, priorizando sorrisos naturais.' },
    { id: 22, title: 'Retrato de Irmãs na Relva', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-22.jpeg', description: 'Sessão descontraída em ambiente luminoso e acolhedor.' },
    { id: 23, title: 'Abraço Protetor em Luz Natural', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-23.jpeg', description: 'Teleobjetiva para foco estrito nas expressões de afeto.' },
    { id: 24, title: 'Gargalhada e Afeto Fraterno', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-24.jpeg', description: 'Instantâneo genuíno de alegria entre irmãs.' },
    { id: 25, title: 'Comemoração 5 Anos ao Pôr do Sol', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-25.jpeg', description: 'Sessão temática com balão dourado em ambiente de campo.' },
    { id: 26, title: 'Retrato Comemorativo no Banco de Madeira', category: 'Ensaio Externo', imageUrl: '/portfolio/foto-26.jpeg', description: 'Composição de aniversário com luz suave de fim de tarde.' }
  ];

  // Fotos fatiadas pela paginação
  displayedPhotos = computed(() => {
    return this.photoGallery.slice(0, this.visiblePhotosCount());
  });

  loadMorePhotos(): void {
    this.visiblePhotosCount.update(count => count + 6);
  }

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  openPhotoModal(photo: PhotoItem): void {
    this.selectedPhoto.set(photo);
  }

  closePhotoModal(): void {
    this.selectedPhoto.set(null);
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
    if (this.selectedPhoto()) {
      this.closePhotoModal();
    }
    if (this.isQuoteModalOpen()) {
      this.closeQuoteModal();
    }
  }

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

  askAboutPhoto(photo: PhotoItem): void {
    const text = `Olá Queiroz! Vi o trabalho "${photo.title}" no teu portfólio e gostaria de contratar uma cobertura fotográfica similar.`;
    this.openWhatsApp(text);
  }
}