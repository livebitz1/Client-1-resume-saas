
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const payfastMerchantId = Deno.env.get('PAYFAST_MERCHANT_KEY');
const payfastApiKey = Deno.env.get('PAYFAST_API_KEY');

if (!payfastMerchantId || !payfastApiKey) {
  console.error("PayFast credentials not found in environment variables");
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { amount, item_name, return_url, cancel_url } = await req.json();
    
    if (!amount || !item_name || !return_url) {
      throw new Error("Missing required parameters");
    }
    
    // Create a unique payment ID
    const paymentId = crypto.randomUUID();
    
    // Get user information from auth header
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get auth header from request
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      // Set auth header for supabase client
      supabase.auth.setSession({
        access_token: authHeader.replace('Bearer ', ''),
        refresh_token: '',
      });
      
      // Get user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw userError;
      }
      
      userId = user?.id;
    }
    
    // Store payment information in database
    if (userId) {
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          id: paymentId,
          user_id: userId,
          amount,
          item_name,
          status: 'pending'
        });
        
      if (paymentError) {
        throw paymentError;
      }
    }
    
    // Build PayFast payment URL
    const baseUrl = 'https://sandbox.payfast.co.za/eng/process';  // Use sandbox for testing
    // const baseUrl = 'https://www.payfast.co.za/eng/process';  // Use this for production
    
    const paymentData = {
      merchant_id: payfastMerchantId,
      merchant_key: payfastApiKey,
      return_url,
      cancel_url,
      notify_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payfast-webhook`,
      name_first: 'Customer',
      email_address: 'customer@example.com',  // This should ideally be the user's email address
      m_payment_id: paymentId,
      amount,
      item_name,
    };
    
    // Build query string
    const queryString = Object.entries(paymentData)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    const payment_url = `${baseUrl}?${queryString}`;
    
    return new Response(
      JSON.stringify({ 
        success: true,
        payment_id: paymentId,
        payment_url,
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200 
      },
    );
    
  } catch (error) {
    console.error("Error creating payment:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400 
      },
    );
  }
});
