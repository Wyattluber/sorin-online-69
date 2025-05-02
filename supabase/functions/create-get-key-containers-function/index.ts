
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      // Create client with Auth context of the function
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Check if the get_key_containers function exists, if not create it
    const { data: functionExists } = await supabaseClient.rpc('get_key_containers').catch(() => {
      return { data: null };
    });

    if (!functionExists) {
      // Create the function if it doesn't exist
      const { error } = await supabaseClient.rpc('exec_sql', {
        sql_query: `
          CREATE OR REPLACE FUNCTION public.get_key_containers()
          RETURNS TABLE (
            id uuid,
            name text,
            image_url text,
            redirect_url text,
            active boolean,
            position integer,
            created_at timestamptz,
            updated_at timestamptz
          )
          LANGUAGE plpgsql
          SECURITY DEFINER
          AS $$
          BEGIN
            -- Try to select from key_containers table
            BEGIN
              RETURN QUERY
              SELECT kc.id, kc.name, kc.image_url, kc.redirect_url, kc.active, kc.position, kc.created_at, kc.updated_at
              FROM public.key_containers kc
              WHERE kc.active = true
              ORDER BY kc.position;
            EXCEPTION
              WHEN undefined_table THEN
                -- If table doesn't exist, return empty result
                RETURN;
            END;
          END;
          $$;
        `
      });

      if (error) {
        console.error("Error creating get_key_containers function:", error);
        return new Response(
          JSON.stringify({ error: 'Failed to create function' }),
          { 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders
            },
            status: 500 
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
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
