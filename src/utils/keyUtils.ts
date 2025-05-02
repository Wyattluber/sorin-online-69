
/**
 * Key utility functions for generating and managing keys
 */

import { supabase } from "@/integrations/supabase/client";

// Get user's IP address
export const getIPAddress = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.ip;
  } catch (err) {
    console.error("Error getting IP:", err);
    return null;
  }
};

// Generate a random key with the Sorin format
export const generateRandomKey = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'SORIN_KEY_';
  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Get approximate location based on IP
export const getLocationFromIP = async (ip: string): Promise<string> => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) return "Unknown";
    
    const data = await response.json();
    return `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`;
  } catch (err) {
    console.error("Error getting location:", err);
    return "Unknown";
  }
};

// Check if IP is blacklisted
export const checkBlacklist = async (ip: string | null): Promise<string | null> => {
  try {
    if (!ip) return null;
    
    // Check by IP
    const { data: ipData, error: ipError } = await supabase
      .from('blacklist')
      .select('*')
      .eq('ip_address', ip)
      .maybeSingle();
    
    if (ipError && ipError.code !== 'PGRST116') {
      console.error("Error checking blacklist by IP:", ipError);
    }
    
    if (ipData) {
      return ipData.reason || "IP address is blacklisted";
    }
    
    // Not blacklisted
    return null;
  } catch (err) {
    console.error("Error checking blacklist:", err);
    return "Error checking blacklist status";
  }
};

// Check if a key already exists for this IP
export const checkExistingKey = async (ip: string | null): Promise<string | null> => {
  try {
    if (!ip) return null;
    
    // Look for a key associated with this IP
    const { data: ipData, error: ipError } = await supabase
      .from('keys')
      .select('key, expires_at')
      .eq('ip_adress', ip)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    
    if (ipError && ipError.code !== 'PGRST116') {
      console.error("Error checking existing key by IP:", ipError);
    }
    
    if (ipData?.key) {
      return ipData.key;
    }
    
    // No valid key found
    return null;
  } catch (err) {
    console.error("Error checking existing key:", err);
    return null;
  }
};

// Save a new key to the database
export const saveNewKey = async (key: string, ip: string | null, location: string): Promise<boolean> => {
  try {
    // Set expiration time (1 hour from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    // Save key to Supabase with IP and location, with hwid as null
    const { error: saveError } = await supabase
      .from('keys')
      .insert({
        key: key,
        used: false,
        expires_at: expiresAt.toISOString(),
        ip_adress: ip, // Note: Column name has the typo in it ("adress" not "address")
        device_location: location,
        hwid: null
      });
      
    if (saveError) {
      console.error("Error saving key:", saveError);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Error saving key:", err);
    return false;
  }
};
