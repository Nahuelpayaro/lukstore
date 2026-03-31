// Initialize dataLayer securely
export const initDataLayer = () => {
    window.dataLayer = window.dataLayer || [];
};

const pushToDataLayer = (eventName, ecommerceData, userData = null) => {
    initDataLayer();
    // Clear previous ecommerce object to avoid data bleeding
    window.dataLayer.push({ ecommerce: null });
    
    const payload = {
        event: eventName,
        ecommerce: ecommerceData
    };
    
    if (userData) {
        payload.user_data = userData;
    }
    
    window.dataLayer.push(payload);
};

export const mapUserData = (customer) => {
    if (!customer) return null;
    return {
        email: customer.email || "",
        address: {
            first_name: customer.firstName || "",
            last_name: customer.lastName || "",
            street: customer.address || "",
            city: customer.city || "",
            region: customer.region || "",
            country: "CL"
        }
    };
};

export const trackVirtualPageView = (url, title) => {
    initDataLayer();
    window.dataLayer.push({
        event: "virtual_page_view",
        page_location: url,
        page_path: window.location.pathname + window.location.search,
        page_title: title,
        page_referrer: document.referrer || "",
        language: navigator.language || navigator.userLanguage || "",
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent: navigator.userAgent
    });
};

const mapProductToItem = (product, index = 0, extra = {}) => {
    // Determine category based on common properties or fallback to hierarchy if available
    const category1 = product.category || (product.hierarchy && product.hierarchy[0]) || "";
    const category2 = product.hierarchy?.[1] || "";
    const category3 = product.hierarchy?.[2] || "";
    const category4 = product.hierarchy?.[3] || "";
    
    return {
        item_id: product.id || String(product.slug),
        item_name: product.title || product.name || "Producto sin nombre",
        affiliation: "Luckstore",
        discount: product.originalPrice ? (product.originalPrice - product.price) : 0,
        index: index,
        item_brand: product.brand || category2 || "",
        item_category: category1,
        item_category2: category2,
        item_category3: category3,
        item_category4: category4,
        item_variant: product.size || extra.size || product.condition || "",
        price: product.price,
        quantity: product.quantity || extra.quantity || 1
    };
};

export const trackViewItemList = (items, listId = "product_list", listName = "Product List") => {
    if (!items || items.length === 0) return;
    pushToDataLayer("view_item_list", {
        item_list_id: listId,
        item_list_name: listName,
        items: items.map((item, index) => mapProductToItem(item, index))
    });
};

export const trackSelectItem = (item, listId = "product_list", listName = "Product List") => {
    pushToDataLayer("select_item", {
        item_list_id: listId,
        item_list_name: listName,
        items: [mapProductToItem(item)]
    });
};

export const trackViewItem = (item) => {
    pushToDataLayer("view_item", {
        currency: "CLP",
        value: item.price,
        items: [mapProductToItem(item)]
    });
};

export const trackAddToCart = (item, size, quantity) => {
    pushToDataLayer("add_to_cart", {
        currency: "CLP",
        value: item.price * quantity,
        items: [mapProductToItem(item, 0, { size, quantity })]
    });
};

export const trackRemoveFromCart = (item) => {
    pushToDataLayer("remove_from_cart", {
        currency: "CLP",
        value: item.price * (item.quantity || 1),
        items: [mapProductToItem(item)]
    });
};

export const trackViewCart = (cartItems, cartTotal) => {
    if (!cartItems || cartItems.length === 0) return;
    pushToDataLayer("view_cart", {
        currency: "CLP",
        value: cartTotal,
        items: cartItems.map((item, index) => mapProductToItem(item, index))
    });
};

export const trackBeginCheckout = (cartItems, cartTotal, customer = null) => {
    if (!cartItems || cartItems.length === 0) return;
    pushToDataLayer("begin_checkout", {
        currency: "CLP",
        value: cartTotal,
        items: cartItems.map((item, index) => mapProductToItem(item, index))
    }, mapUserData(customer));
};

export const trackAddShippingInfo = (cartItems, cartTotal, shippingTier, customer = null) => {
    pushToDataLayer("add_shipping_info", {
        currency: "CLP",
        value: cartTotal,
        shipping_tier: shippingTier,
        items: cartItems.map((item, index) => mapProductToItem(item, index))
    }, mapUserData(customer));
};

export const trackAddPaymentInfo = (cartItems, cartTotal, paymentType, customer = null) => {
    pushToDataLayer("add_payment_info", {
        currency: "CLP",
        value: cartTotal,
        payment_type: paymentType,
        items: cartItems.map((item, index) => mapProductToItem(item, index))
    }, mapUserData(customer));
};

export const trackPurchase = (cartItems, cartTotal, transactionId, tax = 0, shipping = 0, customer = null) => {
    pushToDataLayer("purchase", {
        transaction_id: transactionId,
        value: cartTotal,
        tax: tax,
        shipping: shipping,
        currency: "CLP",
        items: cartItems.map((item, index) => mapProductToItem(item, index))
    }, mapUserData(customer));
};
