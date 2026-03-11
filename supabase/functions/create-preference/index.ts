import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderItems, orderId, payer } = await req.json()

    // 1. Validations
    if (!orderItems || !orderItems.length) {
      throw new Error('No items provided')
    }

    const mpAccessToken = Deno.env.get('MP_ACCESS_TOKEN');
    if (!mpAccessToken) {
         throw new Error('MERCADOPAGO_ACCESS_TOKEN is missing');
    }

    // 2. Map items to MercadoPago format
    const items = orderItems.map((item: any) => ({
      title: item.product_title,
      description: `Orden ${orderId}`,
      quantity: item.quantity,
      currency_id: 'CLP',
      unit_price: Number(item.price_at_purchase)
    }))

    // 3. Create preference payload
    const preferenceData = {
      items,
      payer: {
        email: payer.email,
        name: payer.name,
      },
      back_urls: {
        success: `${req.headers.get('origin')}/success?orderId=${orderId}`,
        failure: `${req.headers.get('origin')}/cart`,
        pending: `${req.headers.get('origin')}/checkout`
      },
      auto_return: 'approved',
      external_reference: orderId, // Crucial for weaving webhook info back to Supabase
    }

    // 4. Request to MercadoPago API
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mpAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceData)
    })

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`MercadoPago API Error: ${err}`);
    }

    const preference = await response.json()

    // 5. Return init_point
    return new Response(
      JSON.stringify({ init_point: preference.init_point, id: preference.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
