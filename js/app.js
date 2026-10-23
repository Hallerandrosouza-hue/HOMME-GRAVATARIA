/**
 * HOMME GRAVATARIA (Hércules Gravataria)
 * Controlador Front-end: Vitrine, Seletores de Variação, Busca, Filtros e Checkout WhatsApp
 */

const AppState = {
  activeCategory: "todos",
  activeSubcategory: null,
  searchQuery: "",
  viewMode: "expanded", // "expanded" (38 cards individuais com seletor da pasta) ou "grouped" (7 linhas principais)
  whatsappTemplateKey: STORE_CONFIG.defaultWhatsappTemplate || "opcao3",
  selectedVariationsByCard: {},
  cart: []
};

const STORAGE_KEY_CART = "homme_gravataria_cart_v1";

/**
 * Formata valores numéricos em Real Brasileiro (ex: R$ 29,90 ou R$ 144,90)
 */
function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/**
 * Garante que caminhos relativos com espaços e parênteses funcionem em atributos src
 */
function safeAssetUrl(relativePath) {
  return encodeURI(relativePath);
}

/**
 * Inicialização da Aplicação
 */
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  initStaticBanners();
  initCategoryNavigation();
  initSearchAndViewControls();
  initCartDrawerEvents();
  renderCatalog();
  updateCartUI();
});

/**
 * Carrega os banners institucionais mapeados de `hercules-gravataria-foto pricipais/`
 */
function initStaticBanners() {
  const heroImg = document.getElementById("hero-landscape-img");
  if (heroImg && INSTITUTIONAL_BANNERS.heroLandscape) {
    heroImg.src = safeAssetUrl(INSTITUTIONAL_BANNERS.heroLandscape.path);
    heroImg.alt = INSTITUTIONAL_BANNERS.heroLandscape.alt;
  }

  const brandVertImg = document.getElementById("brand-vertical-img");
  if (brandVertImg && INSTITUTIONAL_BANNERS.brandVertical) {
    brandVertImg.src = safeAssetUrl(INSTITUTIONAL_BANNERS.brandVertical.path);
    brandVertImg.alt = INSTITUTIONAL_BANNERS.brandVertical.alt;
  }

  const catalogImg = document.getElementById("catalog-overview-img");
  if (catalogImg && INSTITUTIONAL_BANNERS.catalogOverview) {
    catalogImg.src = safeAssetUrl(INSTITUTIONAL_BANNERS.catalogOverview.path);
    catalogImg.alt = INSTITUTIONAL_BANNERS.catalogOverview.alt;
  }

  const heroThumbBrand = document.getElementById("hero-thumb-brand");
  if (heroThumbBrand) {
    heroThumbBrand.src = safeAssetUrl(INSTITUTIONAL_BANNERS.brandVertical.path);
  }

  const heroThumbCatalog = document.getElementById("hero-thumb-catalog");
  if (heroThumbCatalog) {
    heroThumbCatalog.src = safeAssetUrl(INSTITUTIONAL_BANNERS.catalogOverview.path);
  }
}

/**
 * Configura os eventos de navegação por categoria e subcategoria (Header, Pills e Cards de Destaque)
 */
function initCategoryNavigation() {
  document.querySelectorAll("[data-filter-category]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const category = btn.getAttribute("data-filter-category");
      const subcategory = btn.getAttribute("data-filter-subcategory") || null;

      AppState.activeCategory = category;
      AppState.activeSubcategory = subcategory;

      syncActiveFilterButtons();
      renderCatalog();

      const catalogSection = document.getElementById("vitrine-produtos");
      if (catalogSection && btn.hasAttribute("data-scroll-to-catalog")) {
        catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function syncActiveFilterButtons() {
  // Atualiza botões do menu principal
  document.querySelectorAll(".nav-menu__btn[data-filter-category]").forEach((btn) => {
    const cat = btn.getAttribute("data-filter-category");
    const sub = btn.getAttribute("data-filter-subcategory") || null;
    const isMatch =
      cat === AppState.activeCategory &&
      (sub === AppState.activeSubcategory || (!sub && !AppState.activeSubcategory));
    btn.classList.toggle("is-active", isMatch);
  });

  // Atualiza pílulas de filtro da barra de ferramentas
  document.querySelectorAll(".filter-pill[data-filter-category]").forEach((pill) => {
    const cat = pill.getAttribute("data-filter-category");
    const sub = pill.getAttribute("data-filter-subcategory") || null;
    const isMatch = cat === AppState.activeCategory && sub === AppState.activeSubcategory;
    pill.classList.toggle("is-active", isMatch);
  });
}

/**
 * Busca rápida em tempo real e alternância de modo de exibição
 */
function initSearchAndViewControls() {
  const searchInput = document.getElementById("catalog-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      renderCatalog();
    });
  }

  document.querySelectorAll("[data-view-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      AppState.viewMode = btn.getAttribute("data-view-mode");
      document.querySelectorAll("[data-view-mode]").forEach((b) => {
        b.classList.toggle("is-active", b.getAttribute("data-view-mode") === AppState.viewMode);
      });
      renderCatalog();
    });
  });

  const templateSelect = document.getElementById("whatsapp-template-select");
  if (templateSelect) {
    templateSelect.value = AppState.whatsappTemplateKey;
    templateSelect.addEventListener("change", (e) => {
      AppState.whatsappTemplateKey = e.target.value;
    });
  }
}

/**
 * Filtra e renderiza os cards na vitrine
 */
function renderCatalog() {
  const gridEl = document.getElementById("products-grid");
  const countEl = document.getElementById("catalog-count");
  if (!gridEl) return;

  // Obtém os itens conforme o modo de exibição ("expanded" = todas as 38 fotos, "grouped" = 7 coleções)
  const sourceItems =
    AppState.viewMode === "expanded"
      ? getExpandedIndividualProducts()
      : PRODUCTS_CATALOG.map((p) => ({
          ...p,
          parentProductId: p.id,
          selectedVariation: p.variations[0]
        }));

  const filtered = sourceItems.filter((item) => {
    const matchesCategory =
      AppState.activeCategory === "todos" || item.category === AppState.activeCategory;
    const matchesSubcategory =
      !AppState.activeSubcategory || item.subcategory === AppState.activeSubcategory;

    if (!matchesCategory || !matchesSubcategory) return false;

    if (!AppState.searchQuery) return true;

    const activeVar = getCardActiveVariation(item);
    const searchableText = [
      item.title,
      item.categoryLabel,
      item.folder,
      activeVar ? activeVar.name : "",
      ...item.variations.map((v) => v.name)
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(AppState.searchQuery);
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} ${
      filtered.length === 1 ? "item encontrado" : "itens encontrados"
    }`;
  }

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: #fff; border-radius: 8px; border: 1px solid #e4e1d8;">
        <h3 style="font-family: var(--font-display); font-size: 1.6rem; margin-bottom: 0.5rem;">Nenhum produto encontrado</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">Tente buscar por outro termo ou limpar os filtros selecionados.</p>
        <button type="button" class="btn-primary" id="reset-filters-btn">Ver Todo o Catálogo</button>
      </div>
    `;
    const resetBtn = document.getElementById("reset-filters-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        AppState.activeCategory = "todos";
        AppState.activeSubcategory = null;
        AppState.searchQuery = "";
        const searchInput = document.getElementById("catalog-search-input");
        if (searchInput) searchInput.value = "";
        syncActiveFilterButtons();
        renderCatalog();
      });
    }
    return;
  }

  gridEl.innerHTML = filtered.map((item) => buildProductCardHTML(item)).join("");
  bindProductCardEvents(gridEl, filtered);
}

/**
 * Retorna a variação atualmente ativa de um card
 */
function getCardActiveVariation(item) {
  const savedVarId = AppState.selectedVariationsByCard[item.id];
  if (savedVarId) {
    const found = item.variations.find((v) => v.id === savedVarId);
    if (found) return found;
  }
  return item.selectedVariation || item.variations[0];
}

/**
 * Constrói o HTML semântico de cada Card de Produto
 */
function buildProductCardHTML(item) {
  const activeVariation = getCardActiveVariation(item);
  const displayTitle = item.shortTitle || item.title;

  const thumbsHTML = item.variations
    .map((variation) => {
      const isSelected = variation.id === activeVariation.id;
      return `
        <button
          type="button"
          class="variation-thumb ${isSelected ? "is-selected" : ""}"
          data-card-id="${item.id}"
          data-variation-id="${variation.id}"
          title="${variation.name}"
          aria-label="Selecionar variação ${variation.name}"
        >
          <img src="${safeAssetUrl(variation.image)}" alt="${variation.name}" loading="lazy" />
        </button>
      `;
    })
    .join("");

  return `
    <article class="product-card" data-card-element="${item.id}">
      <div class="product-card__media">
        <span class="product-card__badge">${item.badge}</span>
        <span class="product-card__sku">${item.sku}</span>
        <img
          class="product-card__img"
          id="card-img-${item.id}"
          src="${safeAssetUrl(activeVariation.image)}"
          alt="${displayTitle} - ${activeVariation.name}"
          loading="lazy"
        />
      </div>

      <div class="product-card__body">
        <span class="product-card__category">${item.categoryLabel}</span>
        <h3 class="product-card__title">${displayTitle}</h3>
        <p class="product-card__selected-var">
          Cor / Modelo: <strong id="card-var-name-${item.id}">${activeVariation.name}</strong>
        </p>

        <div class="product-card__variations">
          <span class="product-card__variations-label">
            Cores / Modelos na pasta (${item.variations.length} opções):
          </span>
          <div class="variation-thumbs">
            ${thumbsHTML}
          </div>
        </div>

        <div class="product-card__pricing">
          <div>
            <div class="product-card__price">${formatCurrencyBRL(item.price)}</div>
            <div class="product-card__installments">${item.installments}</div>
          </div>
        </div>

        <div class="product-card__actions">
          <button
            type="button"
            class="btn-whatsapp-direct"
            data-action="buy-whatsapp"
            data-card-id="${item.id}"
            title="Pedir este item direto pelo WhatsApp"
          >
            Pedir pelo WhatsApp
          </button>
          <button
            type="button"
            class="btn-add-cart"
            data-action="add-to-cart"
            data-card-id="${item.id}"
            title="Adicionar à sacola de orçamento para pedir vários itens juntos"
          >
            + Sacola
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Conecta eventos de troca de miniatura, adicionar ao carrinho e compra rápida via WhatsApp
 */
function bindProductCardEvents(gridEl, currentItems) {
  const itemsMap = new Map(currentItems.map((i) => [i.id, i]));

  // Clique nas miniaturas de variação
  gridEl.querySelectorAll(".variation-thumb").forEach((thumbBtn) => {
    thumbBtn.addEventListener("click", () => {
      const cardId = thumbBtn.getAttribute("data-card-id");
      const variationId = thumbBtn.getAttribute("data-variation-id");
      const item = itemsMap.get(cardId);
      if (!item) return;

      const selectedVar = item.variations.find((v) => v.id === variationId);
      if (!selectedVar) return;

      AppState.selectedVariationsByCard[cardId] = variationId;

      // Atualiza foto principal e nome da variação no card sem recarregar a página
      const imgEl = document.getElementById(`card-img-${cardId}`);
      const varNameEl = document.getElementById(`card-var-name-${cardId}`);
      if (imgEl) {
        imgEl.src = safeAssetUrl(selectedVar.image);
        imgEl.alt = `${item.shortTitle || item.title} - ${selectedVar.name}`;
      }
      if (varNameEl) {
        varNameEl.textContent = selectedVar.name;
      }

      // Atualiza estado visual de seleção das miniaturas deste card
      const cardArticle = gridEl.querySelector(`[data-card-element="${cardId}"]`);
      if (cardArticle) {
        cardArticle.querySelectorAll(".variation-thumb").forEach((btn) => {
          btn.classList.toggle(
            "is-selected",
            btn.getAttribute("data-variation-id") === variationId
          );
        });
      }
    });
  });

  // Botão Adicionar ao Carrinho / Orçamento
  gridEl.querySelectorAll('[data-action="add-to-cart"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardId = btn.getAttribute("data-card-id");
      const item = itemsMap.get(cardId);
      if (!item) return;

      const activeVar = getCardActiveVariation(item);
      addItemToCart(item, activeVar);
      openCartDrawer();
    });
  });

  // Botão Pedir Direto pelo WhatsApp (Item Único)
  gridEl.querySelectorAll('[data-action="buy-whatsapp"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardId = btn.getAttribute("data-card-id");
      const item = itemsMap.get(cardId);
      if (!item) return;

      const activeVar = getCardActiveVariation(item);
      sendSingleItemToWhatsApp(item, activeVar);
    });
  });
}

/**
 * =========================================================================
 * GERENCIAMENTO DO CARRINHO E CHECKOUT DIRETO PARA WHATSAPP
 * =========================================================================
 */
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    if (raw) {
      AppState.cart = JSON.parse(raw);
    }
  } catch (err) {
    AppState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(AppState.cart));
  } catch (err) {
    // Ignora erro de quota
  }
}

function addItemToCart(productItem, variation) {
  const cartItemId = `${productItem.parentProductId || productItem.id}::${variation.id}`;
  const existing = AppState.cart.find((c) => c.cartItemId === cartItemId);

  if (existing) {
    existing.quantity += 1;
  } else {
    AppState.cart.push({
      cartItemId,
      productId: productItem.parentProductId || productItem.id,
      sku: productItem.sku,
      title: productItem.shortTitle || productItem.title,
      variationId: variation.id,
      variationName: variation.name,
      image: variation.image,
      folder: productItem.folder,
      price: productItem.price,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
}

function updateCartItemQty(cartItemId, delta) {
  const index = AppState.cart.findIndex((c) => c.cartItemId === cartItemId);
  if (index === -1) return;

  AppState.cart[index].quantity += delta;
  if (AppState.cart[index].quantity <= 0) {
    AppState.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeCartItem(cartItemId) {
  AppState.cart = AppState.cart.filter((c) => c.cartItemId !== cartItemId);
  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const badgeEl = document.getElementById("cart-count-badge");
  const itemsContainer = document.getElementById("cart-drawer-items");
  const totalValueEl = document.getElementById("cart-total-value");

  const totalItems = AppState.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = AppState.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (badgeEl) {
    badgeEl.textContent = totalItems;
  }

  if (totalValueEl) {
    totalValueEl.textContent = formatCurrencyBRL(totalAmount);
  }

  if (!itemsContainer) return;

  if (AppState.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <p style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.4rem; color: var(--text-primary);">
          Seu orçamento está vazio
        </p>
        <p style="font-size: 0.85rem;">
          Selecione gravatas, camisas em fibra de bambu, cintos ou acessórios para montar seu pedido via WhatsApp.
        </p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = AppState.cart
    .map(
      (item) => `
      <div class="cart-item">
        <img class="cart-item__img" src="${safeAssetUrl(item.image)}" alt="${item.title} - ${item.variationName}" />
        <div>
          <div class="cart-item__title">${item.title}</div>
          <div class="cart-item__variant">Cor/Modelo: <strong>${item.variationName}</strong></div>
          <div class="cart-item__price">${formatCurrencyBRL(item.price)} un.</div>
        </div>
        <div class="cart-item__controls">
          <div class="qty-control">
            <button type="button" class="qty-btn" data-cart-qty="${item.cartItemId}" data-delta="-1">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button type="button" class="qty-btn" data-cart-qty="${item.cartItemId}" data-delta="1">+</button>
          </div>
          <button type="button" class="cart-item__remove" data-cart-remove="${item.cartItemId}">Remover</button>
        </div>
      </div>
    `
    )
    .join("");

  itemsContainer.querySelectorAll("[data-cart-qty]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cart-qty");
      const delta = parseInt(btn.getAttribute("data-delta"), 10);
      updateCartItemQty(id, delta);
    });
  });

  itemsContainer.querySelectorAll("[data-cart-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cart-remove");
      removeCartItem(id);
    });
  });
}

function initCartDrawerEvents() {
  const openBtn = document.getElementById("open-cart-btn");
  const closeBtn = document.getElementById("close-cart-btn");
  const backdrop = document.getElementById("cart-backdrop");
  const checkoutBtn = document.getElementById("checkout-whatsapp-btn");

  if (openBtn) openBtn.addEventListener("click", openCartDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
  if (backdrop) backdrop.addEventListener("click", closeCartDrawer);

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", sendCartCheckoutToWhatsApp);
  }
}

function openCartDrawer() {
  document.getElementById("cart-drawer")?.classList.add("is-open");
  document.getElementById("cart-backdrop")?.classList.add("is-open");
}

function closeCartDrawer() {
  document.getElementById("cart-drawer")?.classList.remove("is-open");
  document.getElementById("cart-backdrop")?.classList.remove("is-open");
}

/**
 * Envia um único produto diretamente para o WhatsApp com mensagem limpa e direta
 * informando apenas a peça, a cor/modelo escolhido e o valor.
 */
function sendSingleItemToWhatsApp(productItem, variation) {
  const productName = productItem.shortTitle || productItem.title;
  const variationName = variation.name;
  const priceFormatted = formatCurrencyBRL(productItem.price);

  const messageText = [
    `Olá! Vim pelo catálogo da *HOMME GRAVATARIA* e tenho interesse nesta peça:`,
    ``,
    `• *Peça:* ${productName}`,
    `• *Cor / Modelo:* ${variationName}`,
    `• *Valor:* ${priceFormatted}`,
    ``,
    `Poderia me confirmar se está disponível?`
  ].join("\n");

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Gera o resumo automático formatado de múltiplos itens no carrinho para envio via WhatsApp
 */
function sendCartCheckoutToWhatsApp() {
  if (AppState.cart.length === 0) {
    alert("Adicione pelo menos um item ao seu pedido antes de enviar para o WhatsApp.");
    return;
  }

  const customerNameInput = document.getElementById("customer-name-input");
  const customerName = customerNameInput ? customerNameInput.value.trim() : "";

  const totalAmount = AppState.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = AppState.cart.reduce((acc, item) => acc + item.quantity, 0);

  const lines = [
    `*PEDIDO / ORÇAMENTO — ${STORE_CONFIG.brandName}*`,
    customerName ? `*Cliente:* ${customerName}` : null,
    `-----------------------------------------`,
    `*ITENS SELECIONADOS (${totalCount}):*`,
    ``
  ].filter((l) => l !== null);

  AppState.cart.forEach((item, idx) => {
    const subtotal = item.price * item.quantity;
    lines.push(
      `${idx + 1}. *${item.title}*`,
      `   • Cor/Modelo: ${item.variationName}`,
      `   • Qtd: ${item.quantity}x de ${formatCurrencyBRL(item.price)} = *${formatCurrencyBRL(subtotal)}*`,
      ``
    );
  });

  lines.push(
    `-----------------------------------------`,
    `*TOTAL DO PEDIDO: ${formatCurrencyBRL(totalAmount)}*`,
    ``,
    `Aguardo informações para pagamento e envio!`
  );

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
