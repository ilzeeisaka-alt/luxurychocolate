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
      affiliate_payouts: {
        Row: {
          admin_notes: string | null
          affiliate_id: string
          amount_cents: number
          created_at: string
          id: string
          paid_at: string | null
          payout_details: string | null
          payout_method: string | null
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          affiliate_id: string
          amount_cents: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payout_details?: string | null
          payout_method?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          affiliate_id?: string
          amount_cents?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          payout_details?: string | null
          payout_method?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_payouts_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_referrals: {
        Row: {
          affiliate_id: string
          commission_cents: number
          commission_rate: number
          created_at: string
          customer_email: string | null
          id: string
          order_id: string | null
          order_number: string | null
          order_total_cents: number
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          commission_cents?: number
          commission_rate: number
          created_at?: string
          customer_email?: string | null
          id?: string
          order_id?: string | null
          order_number?: string | null
          order_total_cents?: number
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          commission_cents?: number
          commission_rate?: number
          created_at?: string
          customer_email?: string | null
          id?: string
          order_id?: string | null
          order_number?: string | null
          order_total_cents?: number
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          balance_cents: number
          code: string
          commission_rate: number
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          customer_discount_rate: number
          full_name: string | null
          id: string
          notes: string | null
          payout_details: string | null
          payout_method: string | null
          status: string
          total_earned_cents: number
          total_paid_cents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_cents?: number
          code: string
          commission_rate?: number
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          customer_discount_rate?: number
          full_name?: string | null
          id?: string
          notes?: string | null
          payout_details?: string | null
          payout_method?: string | null
          status?: string
          total_earned_cents?: number
          total_paid_cents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_cents?: number
          code?: string
          commission_rate?: number
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          customer_discount_rate?: number
          full_name?: string | null
          id?: string
          notes?: string | null
          payout_details?: string | null
          payout_method?: string | null
          status?: string
          total_earned_cents?: number
          total_paid_cents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      cart_items: {
        Row: {
          created_at: string
          id: string
          logo_filename: string | null
          logo_url: string | null
          logos: Json
          notes: string | null
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_filename?: string | null
          logo_url?: string | null
          logos?: Json
          notes?: string | null
          product_id: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_filename?: string | null
          logo_url?: string | null
          logos?: Json
          notes?: string | null
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      content_pages: {
        Row: {
          created_at: string
          description: string | null
          description_i18n_jsonb: Json
          id: string
          lang: string
          markdown: string
          markdown_i18n: Json
          published: boolean
          slug: string
          source_url: string | null
          title: string
          title_i18n: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_i18n_jsonb?: Json
          id?: string
          lang?: string
          markdown?: string
          markdown_i18n?: Json
          published?: boolean
          slug: string
          source_url?: string | null
          title: string
          title_i18n?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          description_i18n_jsonb?: Json
          id?: string
          lang?: string
          markdown?: string
          markdown_i18n?: Json
          published?: boolean
          slug?: string
          source_url?: string | null
          title?: string
          title_i18n?: Json
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          confirmed: boolean
          created_at: string
          email: string
          gdpr_consent: boolean
          id: string
          lang: string
          source: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          confirmed?: boolean
          created_at?: string
          email: string
          gdpr_consent?: boolean
          id?: string
          lang?: string
          source?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          confirmed?: boolean
          created_at?: string
          email?: string
          gdpr_consent?: boolean
          id?: string
          lang?: string
          source?: string | null
          unsubscribed_at?: string | null
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
          logos: Json
          notes: string | null
          order_id: string
          product_id: string | null
          product_name: string
          product_slug: string | null
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
          logos?: Json
          notes?: string | null
          order_id: string
          product_id?: string | null
          product_name: string
          product_slug?: string | null
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
          logos?: Json
          notes?: string | null
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_slug?: string | null
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
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          affiliate_code: string | null
          affiliate_discount_cents: number
          affiliate_id: string | null
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
          affiliate_code?: string | null
          affiliate_discount_cents?: number
          affiliate_id?: string | null
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
          affiliate_code?: string | null
          affiliate_discount_cents?: number
          affiliate_id?: string | null
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
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          description_i18n: Json
          id: string
          image_url: string | null
          name: string
          name_i18n: Json
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_i18n?: Json
          id?: string
          image_url?: string | null
          name: string
          name_i18n?: Json
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          description_i18n?: Json
          id?: string
          image_url?: string | null
          name?: string
          name_i18n?: Json
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          is_primary: boolean
          product_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          product_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          product_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          currency: string
          delivery_days: number | null
          description: string | null
          description_i18n: Json
          featured: boolean
          has_image: boolean
          id: string
          in_stock: boolean
          ingredients: string | null
          ingredients_i18n: Json
          metadata: Json | null
          name: string
          name_i18n: Json
          preparation_days: number | null
          price_cents: number
          prices_include_vat: boolean
          published: boolean
          short_description: string | null
          short_description_i18n: Json
          slug: string
          source_external_id: string | null
          source_url: string | null
          stock_quantity: number | null
          updated_at: string
          vat_rate: number
          weight_grams: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          currency?: string
          delivery_days?: number | null
          description?: string | null
          description_i18n?: Json
          featured?: boolean
          has_image?: boolean
          id?: string
          in_stock?: boolean
          ingredients?: string | null
          ingredients_i18n?: Json
          metadata?: Json | null
          name: string
          name_i18n?: Json
          preparation_days?: number | null
          price_cents?: number
          prices_include_vat?: boolean
          published?: boolean
          short_description?: string | null
          short_description_i18n?: Json
          slug: string
          source_external_id?: string | null
          source_url?: string | null
          stock_quantity?: number | null
          updated_at?: string
          vat_rate?: number
          weight_grams?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          currency?: string
          delivery_days?: number | null
          description?: string | null
          description_i18n?: Json
          featured?: boolean
          has_image?: boolean
          id?: string
          in_stock?: boolean
          ingredients?: string | null
          ingredients_i18n?: Json
          metadata?: Json | null
          name?: string
          name_i18n?: Json
          preparation_days?: number | null
          price_cents?: number
          prices_include_vat?: boolean
          published?: boolean
          short_description?: string | null
          short_description_i18n?: Json
          slug?: string
          source_external_id?: string | null
          source_url?: string | null
          stock_quantity?: number | null
          updated_at?: string
          vat_rate?: number
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
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
      reviews: {
        Row: {
          approved: boolean
          author_email: string | null
          author_name: string
          content: string
          created_at: string
          id: string
          rating: number
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          approved?: boolean
          author_email?: string | null
          author_name: string
          content: string
          created_at?: string
          id?: string
          rating: number
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          approved?: boolean
          author_email?: string | null
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string | null
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
      validate_affiliate_code: {
        Args: { _code: string }
        Returns: {
          code: string
          discount_rate: number
          id: string
          valid: boolean
        }[]
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
