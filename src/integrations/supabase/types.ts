export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string
          id: string
          lang: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          lang?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          lang?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          area_cm2: number | null
          chocolate_type: string | null
          created_at: string
          custom_text: string | null
          height_mm: number | null
          id: string
          logo_filename: string | null
          logo_url: string | null
          notes: string | null
          order_id: string
          product_name: string
          product_type: string
          quantity: number
          shape: string | null
          total_price_cents: number
          unit_price_cents: number
          width_mm: number | null
        }
        Insert: {
          area_cm2?: number | null
          chocolate_type?: string | null
          created_at?: string
          custom_text?: string | null
          height_mm?: number | null
          id?: string
          logo_filename?: string | null
          logo_url?: string | null
          notes?: string | null
          order_id: string
          product_name: string
          product_type: string
          quantity?: number
          shape?: string | null
          total_price_cents: number
          unit_price_cents: number
          width_mm?: number | null
        }
        Update: {
          area_cm2?: number | null
          chocolate_type?: string | null
          created_at?: string
          custom_text?: string | null
          height_mm?: number | null
          id?: string
          logo_filename?: string | null
          logo_url?: string | null
          notes?: string | null
          order_id?: string
          product_name?: string
          product_type?: string
          quantity?: number
          shape?: string | null
          total_price_cents?: number
          unit_price_cents?: number
          width_mm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          company_name: string | null
          created_at: string
          currency: string
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          id: string
          notes: string | null
          order_number: string
          paid_at: string | null
          shipping_address: string | null
          shipping_cents: number
          shipping_city: string | null
          shipping_country: string | null
          shipping_method: string | null
          shipping_postal_code: string | null
          status: Database["public"]["Enums"]["order_status"]
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          subtotal_cents: number
          tax_cents: number
          total_cents: number
          tracking_number: string | null
          updated_at: string
          user_id: string | null
          vat_number: string | null
        }
        Insert: {
          admin_notes?: string | null
          company_name?: string | null
          created_at?: string
          currency?: string
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          paid_at?: string | null
          shipping_address?: string | null
          shipping_cents?: number
          shipping_city?: string | null
          shipping_country?: string | null
          shipping_method?: string | null
          shipping_postal_code?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal_cents?: number
          tax_cents?: number
          total_cents?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
          vat_number?: string | null
        }
        Update: {
          admin_notes?: string | null
          company_name?: string | null
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          paid_at?: string | null
          shipping_address?: string | null
          shipping_cents?: number
          shipping_city?: string | null
          shipping_country?: string | null
          shipping_method?: string | null
          shipping_postal_code?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          subtotal_cents?: number
          tax_cents?: number
          total_cents?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string | null
          vat_number?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          legal_address: string | null
          legal_city: string | null
          legal_country: string | null
          legal_postal_code: string | null
          phone: string | null
          preferred_language: string | null
          registration_number: string | null
          shipping_address: string | null
          shipping_city: string | null
          shipping_country: string | null
          shipping_postal_code: string | null
          updated_at: string
          user_id: string
          vat_number: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          legal_address?: string | null
          legal_city?: string | null
          legal_country?: string | null
          legal_postal_code?: string | null
          phone?: string | null
          preferred_language?: string | null
          registration_number?: string | null
          shipping_address?: string | null
          shipping_city?: string | null
          shipping_country?: string | null
          shipping_postal_code?: string | null
          updated_at?: string
          user_id: string
          vat_number?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          legal_address?: string | null
          legal_city?: string | null
          legal_country?: string | null
          legal_postal_code?: string | null
          phone?: string | null
          preferred_language?: string | null
          registration_number?: string | null
          shipping_address?: string | null
          shipping_city?: string | null
          shipping_country?: string | null
          shipping_postal_code?: string | null
          updated_at?: string
          user_id?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      order_status:
        | "pending"
        | "paid"
        | "in_production"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "customer"],
      order_status: [
        "pending",
        "paid",
        "in_production",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
    },
  },
} as const
