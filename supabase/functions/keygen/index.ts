
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

    // Simple hash validation (you can make this more sophisticated)
    // For now, we'll accept any non-empty hash as valid
    if (hash.length < 10) {
      return new Response('Dieser Zugang ist ungültig oder abgelaufen.', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Generate a new Sorin key
    const sorinKey = generateSorinKey();
    
    console.log('Generated key:', sorinKey);

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
