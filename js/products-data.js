/**
 * HOMME GRAVATARIA (Hércules Gravataria)
 * Camada de Dados e Mapeamento Estrutural de Arquivos Locais
 * Diretório Raiz: tes11-hecules/
 */

const STORE_CONFIG = {
  brandName: "HOMME GRAVATARIA",
  legalName: "Hércules Gravataria — Moda Masculina Executiva & Alfaiataria",
  slogan: "Elegância que Impõe",
  whatsappNumber: "558981424736",
  whatsappDisplay: "+55 (89) 8142-4736",
  instagramUrl: "https://www.instagram.com/hommegravataria?psln=MWN0YTExMXdiNDR2YQ==",
  instagramHandle: "@hommegravataria",
  currency: "BRL",
  freeShippingThreshold: 199.90,
  defaultWhatsappTemplate: "simples",
  whatsappTemplates: {
    simples: {
      label: "Mensagem Simples e Direta",
      buildMessage: ({ productName, variationName, priceFormatted }) =>
        [
          `Olá! Vim pelo catálogo da *HOMME GRAVATARIA* e tenho interesse nesta peça:`,
          ``,
          `• *Peça:* ${productName}`,
          `• *Cor / Modelo:* ${variationName}`,
          `• *Valor:* ${priceFormatted}`,
          ``,
          `Poderia me confirmar se está disponível?`
        ].join("\n")
    }
  }
};

/**
 * 1. BANNERS INSTITUCIONAIS E IDENTIDADE VISUAL
 * Nota: Mapeado exatamente para o diretório local "hercules-gravataria-foto pricipais/"
 */
const INSTITUTIONAL_BANNERS = {
  folder: "hercules-gravataria-foto pricipais",
  heroLandscape: {
    id: "banner-hero-landscape",
    title: "Elegância que Impõe",
    subtitle: "Alta Gravataria, Camisaria em Fibra de Bambu e Acessórios Executivos",
    path: "hercules-gravataria-foto pricipais/ac4da71b-43b9-45a7-aa41-22b22b79095f.jpg",
    alt: "Banner Principal Homme Gravataria - Elegância que Impõe"
  },
  brandVertical: {
    id: "banner-identidade-vertical",
    title: "HOMME GRAVATARIA",
    subtitle: "Identidade Visual & Alfaiataria Contemporânea",
    path: "hercules-gravataria-foto pricipais/454a2f0e-28c2-41b2-8e12-6e5eff620af5.jpg",
    alt: "Identidade Visual Homme Gravataria"
  },
  catalogOverview: {
    id: "banner-catalogo-geral",
    title: "Catálogo Hércules Gravataria",
    subtitle: "Escolha Seu Item — Linha Completa de Alfaiataria e Acessórios",
    path: "hercules-gravataria-foto pricipais/27ced7d8-ef75-4fe2-b110-4f5b26b8573f.jpg",
    alt: "Catálogo Geral Hércules Gravataria com listagem de seções",
    sectionsListed: [
      "Gravatas Premium | Florais",
      "Gravatas Xadrez",
      "Gravatas Lisas",
      "Camisas Fibra de Bambu",
      "Bottons Instrumentos",
      "Broche de Lapela",
      "Prendedores de Gravata e Hinário",
      "Cintos",
      "Cinto Esticador",
      "Extensor de Colarinho",
      "Lenços"
    ]
  }
};

/**
 * 2. CATEGORIAS DO MENU E DESTAQUES
 */
const CATEGORIES = [
  {
    id: "todos",
    name: "Toda a Coleção",
    slug: "todos",
    description: "Catálogo completo de camisaria, gravataria e acessórios"
  },
  {
    id: "gravatas",
    name: "Gravatas",
    slug: "gravatas",
    description: "Linhas Supreme, Toque de Seda 8cm, Xadrez Tartan e Lisas",
    featuredImage: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.37.jpeg",
    subcategories: [
      { id: "gravata-supreme", name: "Linha Supreme", price: 29.90 },
      { id: "gravata-seda", name: "Toque de Seda 8cm", price: 29.90 },
      { id: "gravata-xadrez", name: "Xadrez Premium", price: 29.90 },
      { id: "gravata-lisa", name: "Lisas & Eventos", price: 20.00 }
    ]
  },
  {
    id: "camisas",
    name: "Camisas Fibra de Bambu",
    slug: "camisas",
    description: "Camisaria Nobre Slim Fit — Toque gelado, antibacteriana e passa fácil",
    featuredImage: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.30.jpeg"
  },
  {
    id: "cintos",
    name: "Cintos Catraca Couro",
    slug: "cintos",
    description: "Couro legítimo com ajuste milimétrico automático e fivelas de alta relojoaria",
    featuredImage: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.09 (1).jpeg"
  },
  {
    id: "acessorios",
    name: "Acessórios",
    slug: "acessorios",
    description: "Prendedores de gravata metálicos em banho prata ródio e dourado",
    featuredImage: "Prendedor de Gravata Metalico - 9.90/WhatsApp Image 2026-10-23 at 10.47.27.jpeg"
  }
];

/**
 * 3. CATÁLOGO DE PRODUTOS E VARIAÇÕES MAPEADAS DIRETAMENTE DAS PASTAS LOCAIS
 */
const PRODUCTS_CATALOG = [
  // =========================================================================
  // CATEGORIA: CAMISARIA NOBRE (Camisa Slim Fit Fibra de Bambu - 144.90)
  // =========================================================================
  {
    id: "camisa-slim-bambu-colecao",
    sku: "HG-CAM-001",
    title: "Camisa Social Slim Fit Fibra Natural de Bambu",
    category: "camisas",
    categoryLabel: "Camisaria Nobre",
    subcategory: "camisa-bambu",
    folder: "Camisa Slim Fit Fibra de Bambu - 144.90",
    price: 144.90,
    installments: "3x de R$ 48,30 sem juros",
    badge: "Best Seller",
    description: "Confeccionada em fibra natural de bambu com modelagem Slim Fit anatômica. Leve e refrescante, ação antibacteriana que inibe odores, toque macio acetinado e tecnologia Passa Fácil.",
    sizes: ["P (2 / Col 38)", "M (3 / Col 40)", "G (4 / Col 42)", "GG (5 / Col 44)"],
    variations: [
      {
        id: "cam-bambu-marinho",
        name: "Azul Marinho Profundo",
        colorHex: "#142f47",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.30.jpeg"
      },
      {
        id: "cam-bambu-azul-claro",
        name: "Azul Claro Clássico",
        colorHex: "#7792bd",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.31 (1).jpeg"
      },
      {
        id: "cam-bambu-rose",
        name: "Rosé Texturizado",
        colorHex: "#c98b90",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.31 (2).jpeg"
      },
      {
        id: "cam-bambu-preta",
        name: "Preta Executiva",
        colorHex: "#15171a",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.31 (3).jpeg"
      },
      {
        id: "cam-bambu-bordo",
        name: "Bordô / Vinho Nobre",
        colorHex: "#690c16",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.31 (4).jpeg"
      },
      {
        id: "cam-bambu-azul-texturizado",
        name: "Azul Petróleo Micro-Xadrez",
        colorHex: "#44607d",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.31.jpeg"
      },
      {
        id: "cam-bambu-azul-celeste",
        name: "Azul Celeste Acetinado",
        colorHex: "#829bc4",
        image: "Camisa Slim Fit Fibra de Bambu - 144.90/WhatsApp Image 2026-10-23 at 10.39.32.jpeg"
      }
    ]
  },

  // =========================================================================
  // CATEGORIA: CINTOS & COURO (Cinto Catraca Premium Couro Legitimo - 44.90)
  // =========================================================================
  {
    id: "cinto-catraca-couro-colecao",
    sku: "HG-CIN-001",
    title: "Cinto Social Catraca Automática em Couro Legítimo",
    category: "cintos",
    categoryLabel: "Cintos & Couro",
    subcategory: "cinto-catraca",
    folder: "Cinto Catraca Premium Couro Legitimo - 44.90",
    price: 44.90,
    installments: "2x de R$ 22,45 sem juros",
    badge: "Couro Legítimo",
    description: "Tira em couro legítimo de alta resistência com costura dupla e sistema de trava automática por catraca (sem furos), garantindo ajuste milimétrico e durabilidade superior.",
    sizes: ["Ajustável (Até 125cm)"],
    variations: [
      {
        id: "cinto-gold-diagonal",
        name: "Fivela Gold & Black Diagonal",
        colorHex: "#d4af37",
        image: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.09 (1).jpeg"
      },
      {
        id: "cinto-preto-fosco",
        name: "Fivela Preta Fosca & Grafite",
        colorHex: "#232528",
        image: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.08 (1).jpeg"
      },
      {
        id: "cinto-preto-prisma",
        name: "Fivela Preta Prisma Grafite",
        colorHex: "#2e3136",
        image: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.08.jpeg"
      },
      {
        id: "cinto-gold-friso",
        name: "Fivela Gold & Black Friso Lateral",
        colorHex: "#c59b27",
        image: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.09 (2).jpeg"
      },
      {
        id: "cinto-gold-triangulo",
        name: "Fivela Gold & Black Duplo Detalhe",
        colorHex: "#b89020",
        image: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.09 (3).jpeg"
      },
      {
        id: "cinto-grafite-frisos",
        name: "Fivela Grafite Escovado Vertical",
        colorHex: "#3c4045",
        image: "Cinto Catraca Premium Couro Legitimo - 44.90/WhatsApp Image 2026-10-23 at 10.44.09.jpeg"
      }
    ]
  },

  // =========================================================================
  // CATEGORIA: GRAVATARIA PREMIUM — LINHA SUPREME (R$ 29,90)
  // =========================================================================
  {
    id: "gravata-linha-supreme-colecao",
    sku: "HG-GRV-SUP",
    title: "Gravata Jacquard Linha Supreme 1200 Fios",
    category: "gravatas",
    categoryLabel: "Gravataria Premium",
    subcategory: "gravata-supreme",
    folder: "Gravata Linha Supreme - 29.90",
    price: 29.90,
    installments: "À vista no Pix ou Cartão",
    badge: "Linha Supreme",
    description: "Gravatas trabalhadas e maquinetadas em alto relevo Jacquard com entretela encorpada para um nó impecável e estruturado.",
    sizes: ["Largura Clássica 8cm"],
    variations: [
      {
        id: "sup-azul-royal-floral",
        name: "Azul Royal Jacquard Floral",
        colorHex: "#123285",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.37.jpeg"
      },
      {
        id: "sup-azul-petroleo-jacquard",
        name: "Azul Petróleo Padrão Jacquard",
        colorHex: "#1c497d",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.37 (1).jpeg"
      },
      {
        id: "sup-roxo-ameixa-floral",
        name: "Ameixa & Azul Jacquard Floral",
        colorHex: "#4d1a52",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.38 (1).jpeg"
      },
      {
        id: "sup-bordo-marsala",
        name: "Bordô / Marsala Maquinetada",
        colorHex: "#6e141d",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.38 (2).jpeg"
      },
      {
        id: "sup-azul-bebe-mosaico",
        name: "Azul Bebê Xadrez Acetinado",
        colorHex: "#5588c9",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.38 (3).jpeg"
      },
      {
        id: "sup-rose-xadrez",
        name: "Rosé Xadrez & Prata",
        colorHex: "#cf6d82",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.38 (4).jpeg"
      },
      {
        id: "sup-verde-esmeralda",
        name: "Verde Esmeralda Imperial",
        colorHex: "#114732",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.38 (5).jpeg"
      },
      {
        id: "sup-floral-escuro",
        name: "Floral Escuro (Preto & Vinho)",
        colorHex: "#361220",
        image: "Gravata Linha Supreme - 29.90/WhatsApp Image 2026-10-23 at 10.32.38.jpeg"
      }
    ]
  },

  // =========================================================================
  // CATEGORIA: GRAVATAS CLÁSSICAS — TOQUE DE SEDA ALFAIATARIA (R$ 29,90)
  // =========================================================================
  {
    id: "gravata-toque-seda-colecao",
    sku: "HG-GRV-SED",
    title: "Gravata Clássica Toque de Seda Alfaiataria (8cm)",
    category: "gravatas",
    categoryLabel: "Gravatas Clássicas (Toque de Seda 8cm)",
    subcategory: "gravata-seda",
    folder: "gravata-toque-de-seda-alfaiataria",
    price: 29.90,
    installments: "À vista no Pix ou Cartão",
    badge: "Toque de Seda",
    description: "Estampas clássicas de alta alfaiataria italiana com brilho acetinado suave e caimento fluido em corte tradicional de 8cm.",
    sizes: ["Corte Alfaiataria 8cm"],
    variations: [
      {
        id: "seda-azul-royal-geometrica",
        name: "Azul Royal & Dourado Geométrico",
        colorHex: "#2d4c8a",
        image: "gravata-toque-de-seda-alfaiataria/WhatsApp Image 2026-10-23 at 10.34.51.jpeg"
      },
      {
        id: "seda-terracota-floral",
        name: "Dourado Âmbar Micro Floral",
        colorHex: "#b55d19",
        image: "gravata-toque-de-seda-alfaiataria/WhatsApp Image 2026-10-23 at 10.34.51 (1).jpeg"
      },
      {
        id: "seda-mostarda-imperial",
        name: "Mostarda Ouro Entrelaçado",
        colorHex: "#9e931e",
        image: "gravata-toque-de-seda-alfaiataria/WhatsApp Image 2026-10-23 at 10.34.51 (2).jpeg"
      },
      {
        id: "seda-pink-preto-elo",
        name: "Fúcsia & Preto Padrão Elos",
        colorHex: "#8c1458",
        image: "gravata-toque-de-seda-alfaiataria/WhatsApp Image 2026-10-23 at 10.34.51 (3).jpeg"
      },
      {
        id: "seda-dourada-andorinhas",
        name: "Ocre Dourado Estampa Clássica",
        colorHex: "#a86c1d",
        image: "gravata-toque-de-seda-alfaiataria/WhatsApp Image 2026-10-23 at 10.34.51 (4).jpeg"
      },
      {
        id: "seda-vermelha-medalhao",
        name: "Vermelho Rubi Micro Medalhão",
        colorHex: "#9c1922",
        image: "gravata-toque-de-seda-alfaiataria/WhatsApp Image 2026-10-23 at 10.34.51 (5).jpeg"
      }
    ]
  },

  // =========================================================================
  // CATEGORIA: GRAVATAS XADREZ PREMIUM (R$ 29,90)
  // =========================================================================
  {
    id: "gravata-xadrez-premium-colecao",
    sku: "HG-GRV-XAD",
    title: "Gravata Xadrez Premium Tartan & Diagonal",
    category: "gravatas",
    categoryLabel: "Gravatas Xadrez",
    subcategory: "gravata-xadrez",
    folder: "Gravata Xadrez Premium 29-90",
    price: 29.90,
    installments: "À vista no Pix ou Cartão",
    badge: "Padronagem Britânica",
    description: "Padronagem xadrez tartan e diagonal em fios acetinados de alta definição. Perfeita para composições executivas modernas com ternos lisos.",
    sizes: ["Largura Clássica 8cm"],
    variations: [
      {
        id: "xad-marinho-preto",
        name: "Azul Marinho com Preto",
        colorHex: "#1d4273",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.50 (2).jpeg"
      },
      {
        id: "xad-roxa-lavanda",
        name: "Roxa & Lavanda Tartan",
        colorHex: "#58247d",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.49 (1).jpeg"
      },
      {
        id: "xad-vinho-marrom",
        name: "Vinho, Coral & Marrom",
        colorHex: "#872328",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.49 (2).jpeg"
      },
      {
        id: "xad-bege-azul-claro",
        name: "Bege, Café & Azul Claro",
        colorHex: "#5c7ba6",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.49.jpeg"
      },
      {
        id: "xad-verde-oliva",
        name: "Verde Oliva & Musgo",
        colorHex: "#587d44",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.50 (1).jpeg"
      },
      {
        id: "xad-azul-royal",
        name: "Azul Royal & Índigo",
        colorHex: "#263f8c",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.50 (3).jpeg"
      },
      {
        id: "xad-rose-borgonha",
        name: "Rosé & Borgonha",
        colorHex: "#9e2453",
        image: "Gravata Xadrez Premium 29-90/WhatsApp Image 2026-10-23 at 10.26.50.jpeg"
      }
    ]
  },

  // =========================================================================
  // CATEGORIA: GRAVATAS BÁSICAS E EVENTOS — LISAS (R$ 20,00)
  // =========================================================================
  {
    id: "gravata-lisa-eventos-colecao",
    sku: "HG-GRV-LIS",
    title: "Gravata Lisa Microtextura — Linha Eventos, Cultos & Corporativo",
    category: "gravatas",
    categoryLabel: "Gravatas Básicas e Eventos",
    subcategory: "gravata-lisa",
    folder: "Gravata Lisa Cores Variadas - 20.00",
    price: 20.00,
    installments: "Condição especial para padrinhos e grupos",
    badge: "Ideal Padrinhos & Corporativo",
    description: "Acabamento microtexturizado elegante e discreto. Excelente custo-benefício para casamentos, padrinhos, congressos, cultos e uniformização executiva.",
    sizes: ["Unidade (Escolha a Cor no Pedido)"],
    variations: [
      {
        id: "lisa-preta",
        name: "Preta Clássica (Na Foto: Esquerda)",
        colorHex: "#17181a",
        image: "Gravata Lisa Cores Variadas - 20.00/WhatsApp Image 2026-10-23 at 10.40.29.jpeg"
      },
      {
        id: "lisa-grafite",
        name: "Grafite Chumbo (Na Foto: Centro)",
        colorHex: "#555860",
        image: "Gravata Lisa Cores Variadas - 20.00/WhatsApp Image 2026-10-23 at 10.40.29.jpeg"
      },
      {
        id: "lisa-prata",
        name: "Prata / Cinza Claro (Na Foto: Direita)",
        colorHex: "#c2c7cc",
        image: "Gravata Lisa Cores Variadas - 20.00/WhatsApp Image 2026-10-23 at 10.40.29.jpeg"
      }
    ]
  },

  // =========================================================================
  // CATEGORIA: ACESSÓRIOS & JOALHERIA DE LAPELA — PRENDEDOR DE GRAVATA (R$ 9,90)
  // =========================================================================
  {
    id: "prendedor-gravata-metalico-colecao",
    sku: "HG-ACE-PRN",
    title: "Prendedor de Gravata e Hinário Metálico de Alta Precisão",
    category: "acessorios",
    categoryLabel: "Acessórios & Joalheria de Lapela",
    subcategory: "prendedor-gravata",
    folder: "Prendedor de Gravata Metalico - 9.90",
    price: 9.90,
    installments: "Disponível em Varejo e Atacado",
    badge: "Joalheria Masculina",
    description: "Prendedores metálicos com mola de alta pressão que não marca o tecido. Acabamento polido em banho Dourado ou Prata Ródio, disponível em unidade ou cartela.",
    sizes: ["6cm Padrão Executivo"],
    variations: [
      {
        id: "prendedor-dourado",
        name: "Modelos em Dourado (Ouro Polido)",
        colorHex: "#d4af37",
        image: "Prendedor de Gravata Metalico - 9.90/WhatsApp Image 2026-10-23 at 10.47.27.jpeg"
      },
      {
        id: "prendedor-prata",
        name: "Modelos em Prata Ródio",
        colorHex: "#bfc4c9",
        image: "Prendedor de Gravata Metalico - 9.90/WhatsApp Image 2026-10-23 at 10.47.27 (1).jpeg"
      },
      {
        id: "prendedor-cartela-atacado",
        name: "Mostruário / Cartelas Prata & Dourado",
        colorHex: "#8f7a43",
        image: "Prendedor de Gravata Metalico - 9.90/WhatsApp Image 2026-10-23 at 10.45.17.jpeg"
      }
    ]
  }
];

/**
 * Helper que expande todas as variações em cards individuais caso o cliente
 * ative o modo de visualização "Ver Todas as Cores Individualmente (38 Itens)"
 */
function getExpandedIndividualProducts() {
  const expanded = [];
  PRODUCTS_CATALOG.forEach((product) => {
    product.variations.forEach((variation, index) => {
      expanded.push({
        id: `${product.id}__${variation.id}`,
        parentProductId: product.id,
        sku: `${product.sku}-${String(index + 1).padStart(2, "0")}`,
        title: `${product.title} — ${variation.name}`,
        shortTitle: product.title,
        variationName: variation.name,
        category: product.category,
        categoryLabel: product.categoryLabel,
        subcategory: product.subcategory,
        folder: product.folder,
        price: product.price,
        installments: product.installments,
        badge: product.badge,
        description: product.description,
        sizes: product.sizes,
        selectedVariation: variation,
        variations: product.variations
      });
    });
  });
  return expanded;
}
