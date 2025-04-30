
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    // Current timestamp
    const now = new Date();
    
    // Delete expired keys
    const { error, count } = await supabaseClient
      .from('keys')
      .delete({ count: 'exact' })
      .lt('expires_at', now.toISOString());
    
    if (error) throw error;
    
    console.log(`Successfully deleted ${count} expired keys`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully deleted ${count} expired keys` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    );
    
  } catch (error) {
    console.error('Error cleaning up keys:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      },
    );
  }
});
