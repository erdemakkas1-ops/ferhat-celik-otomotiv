export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: { user_id?: string; created_at?: string };
        Relationships: [];
      };
      cars: {
        Row: {
          id: string; title: string; year: number; km: number; fuel: string;
          transmission: string; price: number; image_url: string;
          sahibinden_url: string; is_featured: boolean; is_sold: boolean; created_at: string;
        };
        Insert: {
          id?: string; title: string; year: number; km: number; fuel: string;
          transmission: string; price: number; image_url: string;
          sahibinden_url: string; is_featured?: boolean; is_sold?: boolean; created_at?: string;
        };
        Update: {
          id?: string; title?: string; year?: number; km?: number; fuel?: string;
          transmission?: string; price?: number; image_url?: string;
          sahibinden_url?: string; is_featured?: boolean; is_sold?: boolean; created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
