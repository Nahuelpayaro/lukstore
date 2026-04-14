// Supabase no está configurado — mock para Admin y Tracking
export const supabase = {
    from: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
    auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signUp: () => Promise.resolve({ error: { message: 'Auth no configurada' } }),
        signInWithPassword: () => Promise.resolve({ error: { message: 'Auth no configurada' } }),
        signOut: () => Promise.resolve({ error: null }),
    },
};
