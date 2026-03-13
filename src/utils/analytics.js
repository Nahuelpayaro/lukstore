/**
 * Utilities for Google Analytics 4 (GA4) E-commerce tracking.
 * Reference: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

export const pushToDataLayer = (eventName, data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object to prevent data leakage
    window.dataLayer.push({
        event: eventName,
        ecommerce: data
    });
};

// Helper to format a single product for GA4
const formatProductForGA4 = (product, quantity = 1, size = null) => ({
    item_id: product.id || product.sku,
    item_name: product.title,
    affiliation: "Lukstore",
    currency: "CLP",
    item_brand: product.specs?.brand || product.brand || "Lukstore",
    item_category: product.hierarchy ? product.hierarchy[0] : product.category,
    item_category2: product.hierarchy && product.hierarchy.length > 1 ? product.hierarchy[1] : undefined,
    item_variant: size || undefined,
    price: product.price,
    quantity: quantity
});

export const trackViewItemList = (items, listName = "List", listId = "list_1") => {
    pushToDataLayer("view_item_list", {
        item_list_id: listId,
        item_list_name: listName,
        items: items.map((p, i) => ({ ...formatProductForGA4(p), index: i }))
    });
};

export const trackViewItem = (product) => {
    pushToDataLayer("view_item", {
        currency: "CLP",
        value: product.price,
        items: [formatProductForGA4(product)]
    });
};

export const trackAddToCart = (product, size, quantity = 1) => {
    pushToDataLayer("add_to_cart", {
        currency: "CLP",
        value: product.price * quantity,
        items: [formatProductForGA4(product, quantity, size)]
    });
};

export const trackRemoveFromCart = (item) => {
    pushToDataLayer("remove_from_cart", {
        currency: "CLP",
        value: item.price * item.quantity,
        items: [formatProductForGA4(item, item.quantity, item.size)]
    });
};

export const trackViewCart = (cartItems, totalValue) => {
    pushToDataLayer("view_cart", {
        currency: "CLP",
        value: totalValue,
        items: cartItems.map((item, index) => ({ ...formatProductForGA4(item, item.quantity, item.size), index }))
    });
};

export const trackBeginCheckout = (cartItems, totalValue) => {
    pushToDataLayer("begin_checkout", {
        currency: "CLP",
        value: totalValue,
        items: cartItems.map((item, index) => ({ ...formatProductForGA4(item, item.quantity, item.size), index }))
    });
};

export const trackAddShippingInfo = (cartItems, totalValue, shippingTier = "Standard") => {
    pushToDataLayer("add_shipping_info", {
        currency: "CLP",
        value: totalValue,
        shipping_tier: shippingTier,
        items: cartItems.map((item, index) => ({ ...formatProductForGA4(item, item.quantity, item.size), index }))
    });
};

export const trackAddPaymentInfo = (cartItems, totalValue, paymentType = "MercadoPago") => {
    pushToDataLayer("add_payment_info", {
        currency: "CLP",
        value: totalValue,
        payment_type: paymentType,
        items: cartItems.map((item, index) => ({ ...formatProductForGA4(item, item.quantity, item.size), index }))
    });
};

export const trackPurchase = (transactionId, cartItems, totalValue, shipping = 0, tax = 0) => {
    pushToDataLayer("purchase", {
        transaction_id: transactionId,
        affiliation: "Lukstore",
        value: totalValue,
        tax: tax,
        shipping: shipping,
        currency: "CLP",
        items: cartItems.map((item, index) => ({ ...formatProductForGA4(item, item.quantity, item.size), index }))
    });
};
