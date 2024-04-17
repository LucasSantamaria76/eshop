export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brand: {
        Row: {
          brand_id: string;
          name: string | null;
          provider_id: string | null;
        };
        Insert: {
          brand_id?: string;
          name?: string | null;
          provider_id?: string | null;
        };
        Update: {
          brand_id?: string;
          name?: string | null;
          provider_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_brand_provider_id_fkey";
            columns: ["provider_id"];
            isOneToOne: false;
            referencedRelation: "providers";
            referencedColumns: ["provider_id"];
          },
        ];
      };
      cart_items: {
        Row: {
          cart_id: string;
          product_in_inventory_id: string;
          quantity: number;
        };
        Insert: {
          cart_id: string;
          product_in_inventory_id: string;
          quantity?: number;
        };
        Update: {
          cart_id?: string;
          product_in_inventory_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_cart_items_cart_id_fkey";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "carts";
            referencedColumns: ["cart_id"];
          },
          {
            foreignKeyName: "public_cart_items_product_in_inventory_id_fkey";
            columns: ["product_in_inventory_id"];
            isOneToOne: false;
            referencedRelation: "inventory";
            referencedColumns: ["inventory_id"];
          },
        ];
      };
      carts: {
        Row: {
          cart_id: string;
          created_at: string;
          user_id: string;
        };
        Insert: {
          cart_id?: string;
          created_at?: string;
          user_id: string;
        };
        Update: {
          cart_id?: string;
          created_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_carts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          category_id: string;
          description: string | null;
          name: string;
        };
        Insert: {
          category_id?: string;
          description?: string | null;
          name: string;
        };
        Update: {
          category_id?: string;
          description?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      colors: {
        Row: {
          "bg-color": string;
          color_id: string;
          name: string;
        };
        Insert: {
          "bg-color": string;
          color_id?: string;
          name: string;
        };
        Update: {
          "bg-color"?: string;
          color_id?: string;
          name?: string;
        };
        Relationships: [];
      };
      inventory: {
        Row: {
          color_id: string;
          discount: number;
          inventory_id: string;
          price: number | null;
          product_id: string;
          size_id: string;
          stock: number;
        };
        Insert: {
          color_id: string;
          discount?: number;
          inventory_id?: string;
          price?: number | null;
          product_id: string;
          size_id: string;
          stock?: number;
        };
        Update: {
          color_id?: string;
          discount?: number;
          inventory_id?: string;
          price?: number | null;
          product_id?: string;
          size_id?: string;
          stock?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_inventory_color_id_fkey";
            columns: ["color_id"];
            isOneToOne: false;
            referencedRelation: "colors";
            referencedColumns: ["color_id"];
          },
          {
            foreignKeyName: "public_inventory_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "public_inventory_size_id_fkey";
            columns: ["size_id"];
            isOneToOne: false;
            referencedRelation: "sizes";
            referencedColumns: ["size_id"];
          },
        ];
      };
      order_items: {
        Row: {
          order_id: string;
          product_in_inventory_id: string;
          quatity: number;
          unit_price: number;
        };
        Insert: {
          order_id: string;
          product_in_inventory_id: string;
          quatity: number;
          unit_price: number;
        };
        Update: {
          order_id?: string;
          product_in_inventory_id?: string;
          quatity?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["orders_id"];
          },
          {
            foreignKeyName: "public_order_items_product_in_inventory_id_fkey";
            columns: ["product_in_inventory_id"];
            isOneToOne: false;
            referencedRelation: "inventory";
            referencedColumns: ["inventory_id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          order_status: Database["public"]["Enums"]["order_status_type"];
          orders_id: string;
          payment_method:
            | Database["public"]["Enums"]["payment_method_type"]
            | null;
          payment_status: Database["public"]["Enums"]["payment_status_type"];
          total: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          order_status: Database["public"]["Enums"]["order_status_type"];
          orders_id?: string;
          payment_method?:
            | Database["public"]["Enums"]["payment_method_type"]
            | null;
          payment_status: Database["public"]["Enums"]["payment_status_type"];
          total?: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          order_status?: Database["public"]["Enums"]["order_status_type"];
          orders_id?: string;
          payment_method?:
            | Database["public"]["Enums"]["payment_method_type"]
            | null;
          payment_status?: Database["public"]["Enums"]["payment_status_type"];
          total?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          brand_id: string | null;
          category_id: string | null;
          created_at: string;
          description: string | null;
          gender: Database["public"]["Enums"]["gender_type"];
          name: string;
          product_id: string;
        };
        Insert: {
          brand_id?: string | null;
          category_id?: string | null;
          created_at: string;
          description?: string | null;
          gender?: Database["public"]["Enums"]["gender_type"] | null;
          name: string;
          product_id?: string;
        };
        Update: {
          brand_id?: string | null;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          gender?: Database["public"]["Enums"]["gender_type"] | null;
          name?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_products_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brand";
            referencedColumns: ["brand_id"];
          },
          {
            foreignKeyName: "public_products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["category_id"];
          },
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          avatar_url: string | null;
          city: string | null;
          email: string | null;
          email_verified: boolean | null;
          full_name: string | null;
          id: string;
          admin: boolean;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          email?: string | null;
          email_verified?: boolean | null;
          full_name?: string | null;
          id: string;
          "is-admin"?: boolean;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          email?: string | null;
          email_verified?: boolean | null;
          full_name?: string | null;
          id?: string;
          "is-admin"?: boolean;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      providers: {
        Row: {
          address: string | null;
          city: string | null;
          name: string;
          phone: string | null;
          provider_id: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          name: string;
          phone?: string | null;
          provider_id?: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          name?: string;
          phone?: string | null;
          provider_id?: string;
        };
        Relationships: [];
      };
      sizes: {
        Row: {
          category_id: string;
          name: string;
          size_id: string;
        };
        Insert: {
          category_id: string;
          name: string;
          size_id?: string;
        };
        Update: {
          category_id?: string;
          name?: string;
          size_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_sizes_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["category_id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      gender_type: "hombres" | "mujeres" | "niños";
      order_status_type:
        | "pendiente"
        | "en preparación"
        | "enviado"
        | "entregado";
      payment_method_type:
        | "efectivo"
        | "mercado pago"
        | "transferencia"
        | "débito"
        | "crédito";
      payment_status_type: "pendiente" | "pagado";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
