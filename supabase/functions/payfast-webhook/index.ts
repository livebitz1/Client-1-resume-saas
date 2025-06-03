
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// This endpoint doesn't need CORS headers as it's called by PayFast server

serve(async (req) => {
  try {
    // Get request body as form data
    const formData = await req.formData();
    const paymentData = Object.fromEntries(formData.entries());
    
    console.log("PayFast webhook received:", paymentData);
    
    // Validate payment data
    const paymentId = paymentData.m_payment_id;
    const paymentStatus = paymentData.payment_status;
    const amount = paymentData.amount_gross;
    
    if (!paymentId || !paymentStatus) {
      throw new Error("Invalid webhook data");
    }
    
    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get payment record from database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();
      
    if (paymentError || !payment) {
      throw new Error("Payment not found");
    }
    
    // Update payment status
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: paymentStatus.toLowerCase(), processed_at: new Date().toISOString() })
      .eq('id', paymentId);
      
    if (updateError) {
      throw updateError;
    }
    
    // If payment is successful, update user credits/subscription
    if (paymentStatus.toLowerCase() === 'complete') {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          // Assuming credits purchase, add 3 credits
          subscription: { 
            resumeCredits: payment.item_name.includes('Credits') ? 3 : 0,
            planId: payment.item_name.includes('Subscription') ? 'monthly' : null,
            status: payment.item_name.includes('Subscription') ? 'active' : 'none'
          }
        })
        .eq('id', payment.user_id);
        
      if (profileError) {
        throw profileError;
      }
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      },
    );
    
  } catch (error) {
    console.error("Error processing PayFast webhook:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400 
      },
    );
  }
});
