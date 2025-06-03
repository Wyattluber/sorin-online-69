
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to generate a random key
function generateSorinKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SORIN_KEY_';
  for (let i = 0; i < 15; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Extract hash from URL parameters
    const url = new URL(req.url);
    const hash = url.searchParams.get('hash');

    console.log('Received hash:', hash);

    if (!hash) {
      return new Response('Ungültiger Zugriff - Hash fehlt', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Validate hash with Linkvertise Anti-Bypass API
    const linkvertiseUrl = `https://publisher.linkvertise.com/api/v1/anti_bypassing?token=95dddb78a7ba994d72f7a4ee5fb06df966d4b935d47102336ebc3d53ed5334d7&hash=${hash}`;
    
    console.log('Checking with Linkvertise:', linkvertiseUrl);
    
    const linkvertiseResponse = await fetch(linkvertiseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const linkvertiseResult = await linkvertiseResponse.text();
    console.log('Linkvertise response:', linkvertiseResult);

    // Check if Linkvertise validation passed
    if (linkvertiseResult.trim() !== 'TRUE') {
      console.log('Linkvertise validation failed');
      return new Response('Dieser Zugang ist ungültig oder abgelaufen.', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Generate a new Sorin key
    const sorinKey = generateSorinKey();
    console.log('Generated key:', sorinKey);

    // Store the key in the database
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 12); // 12 hours from now

    const { data, error } = await supabase
      .from('keys')
      .insert({
        key: sorinKey,
        expires_at: expiresAt.toISOString(),
        used: false
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response('Fehler beim Erstellen des Keys', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    console.log('Key saved to database:', data);

    // Return the key in the expected format
    return new Response(`KEY:${sorinKey}`, { 
      status: 200, 
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Error in keygen function:', error);
    return new Response('Dieser Zugang ist ungültig oder abgelaufen.', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
})
