
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This Edge Function will be called periodically to clean up expired keys
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
    
    // Get current timestamp for logging
    const now = new Date().toISOString();
    console.log(`[${now}] Starting cleanup of expired keys`);
    
    // Delete expired keys
    const { data, error } = await supabaseClient
      .from('keys')
      .delete()
      .lt('expires_at', new Date().toISOString())
      .select();
    
    if (error) throw error;
    
    const deletedCount = data ? data.length : 0;
    console.log(`[${now}] Successfully deleted ${deletedCount} expired keys`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Expired keys cleaned up successfully. Deleted ${deletedCount} keys.`,
        deletedCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error cleaning up expired keys:', errorMessage);
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      },
    );
  }
});
