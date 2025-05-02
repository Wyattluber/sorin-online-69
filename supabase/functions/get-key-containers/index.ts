
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      // Supabase API URL - env var exposed by default when deployed to Supabase Functions
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exposed by default when deployed to Supabase Functions
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the function
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Check if the key_containers table exists
    const { data, error } = await supabaseClient
      .from('key_containers')
      .select('*')
      .eq('active', true)
      .order('position', { ascending: true });

    if (error) {
      // If the table doesn't exist or there's another issue
      console.error("Error fetching key containers:", error);
      
      // Return empty array rather than an error
      return new Response(
        JSON.stringify({ data: [] }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          },
          status: 200 
        }
      );
    }

    // Return the data
    return new Response(
      JSON.stringify({ data }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error(error);
    
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 500 
      }
    );
  }
});
