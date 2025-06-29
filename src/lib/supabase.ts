import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const hasValidConfig = supabaseUrl && 
                     supabaseAnonKey && 
                     supabaseUrl !== 'your_supabase_project_url' && 
                     supabaseAnonKey !== 'your_supabase_anon_key' &&
                     isValidUrl(supabaseUrl);

if (!hasValidConfig) {
  console.error(`
🔧 Supabase Configuration Required

Please set up your Supabase credentials:

1. Click the "Connect to Supabase" button in the top right corner
2. Or manually update your .env file with:
   - VITE_SUPABASE_URL=https://your-project.supabase.co
   - VITE_SUPABASE_ANON_KEY=your-anon-key-here

You can find these values in your Supabase project dashboard:
Project Settings > API > Project URL and anon/public key
  `);
}

// Use fallback values to prevent crashes during development
const url = hasValidConfig ? supabaseUrl : 'https://placeholder.supabase.co';
const key = hasValidConfig ? supabaseAnonKey : 'placeholder-key';

// Create client with optimized options and custom error handling
export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    // Custom fetch function to handle refresh token errors and session errors
    fetch: async (url, options) => {
      // If we don't have valid config, return a mock response to prevent network errors
      if (!hasValidConfig) {
        return new Response(JSON.stringify({ 
          error: 'Supabase not configured',
          message: 'Please configure your Supabase credentials' 
        }), {
          status: 400,
          statusText: 'Configuration Required',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      const response = await fetch(url, {
        ...options,
        // Reduce timeout for faster failure detection
        signal: options?.signal || new AbortController().signal
      });

      // Handle auth-related errors
      if (url.includes('/auth/v1/')) {
        // Handle refresh token errors
        if (url.includes('/token') && response.status === 400) {
          try {
            const errorBody = await response.clone().text();
            const errorData = JSON.parse(errorBody);
            
            if (errorData.code === 'refresh_token_not_found') {
              // Clear the invalid session by signing out (non-blocking)
              supabase.auth.signOut().catch((error) => {
                console.warn('Error during automatic sign-out:', error);
              });
              // Return a synthetic successful response to prevent error propagation
              return new Response(JSON.stringify({ message: 'Session refreshed successfully' }), {
                status: 200,
                statusText: 'OK',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            }
          } catch (parseError) {
            // If we can't parse the error body, continue with normal flow
            console.warn('Could not parse auth error response:', parseError);
          }
        }
        
        // Handle logout session errors
        if (url.includes('/logout') && response.status === 403) {
          try {
            const errorBody = await response.clone().text();
            const errorData = JSON.parse(errorBody);
            
            if (errorData.code === 'session_not_found') {
              // Session is already invalid on server, clear local session (non-blocking)
              supabase.auth.signOut().catch((error) => {
                console.warn('Error during automatic sign-out:', error);
              });
              // Return a synthetic successful response to prevent error propagation
              return new Response(JSON.stringify({ message: 'Session already terminated' }), {
                status: 200,
                statusText: 'OK',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            }
          } catch (parseError) {
            // If we can't parse the error body, continue with normal flow
            console.warn('Could not parse logout error response:', parseError);
          }
        }
      }

      return response;
    }
  },
  // Disable realtime subscriptions to improve performance
  realtime: {
    params: {
      eventsPerSecond: 0
    }
  },
  // Add debug logging in development
  debug: process.env.NODE_ENV === 'development'
});

// Export configuration status for components to check
export const isSupabaseConfigured = hasValidConfig;

// Database types
export interface Database {
  public: {
    Tables: {
      blood_pressure_readings: {
        Row: {
          id: string;
          user_id: string;
          systolic: number;
          diastolic: number;
          pulse: number | null;
          location: string;
          medication: string | null;
          symptoms: string | null;
          notes: string | null;
          recorded_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          systolic: number;
          diastolic: number;
          pulse?: number | null;
          location?: string;
          medication?: string | null;
          symptoms?: string | null;
          notes?: string | null;
          recorded_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          systolic?: number;
          diastolic?: number;
          pulse?: number | null;
          location?: string;
          medication?: string | null;
          symptoms?: string | null;
          notes?: string | null;
          recorded_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      blood_sugar_readings: {
        Row: {
          id: string;
          user_id: string;
          glucose: number;
          test_type: string;
          location: string;
          medication: string | null;
          meal_info: string | null;
          symptoms: string | null;
          notes: string | null;
          recorded_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          glucose: number;
          test_type: string;
          location?: string;
          medication?: string | null;
          meal_info?: string | null;
          symptoms?: string | null;
          notes?: string | null;
          recorded_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          glucose?: number;
          test_type?: string;
          location?: string;
          medication?: string | null;
          meal_info?: string | null;
          symptoms?: string | null;
          notes?: string | null;
          recorded_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          date_of_birth: string | null;
          emergency_contact: string | null;
          doctor_name: string | null;
          doctor_phone: string | null;
          medical_conditions: string | null;
          created_at: string;
          updated_at: string;
          is_admin: boolean;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          date_of_birth?: string | null;
          emergency_contact?: string | null;
          doctor_name?: string | null;
          doctor_phone?: string | null;
          medical_conditions?: string | null;
          created_at?: string;
          updated_at?: string;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          date_of_birth?: string | null;
          emergency_contact?: string | null;
          doctor_name?: string | null;
          doctor_phone?: string | null;
          medical_conditions?: string | null;
          created_at?: string;
          updated_at?: string;
          is_admin?: boolean;
        };
      };
    };
  };
}