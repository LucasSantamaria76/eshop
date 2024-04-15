import { Database } from "@/types/supabase";

export interface ProfileType {
  address: string | null;
  avatar_url: string | null;
  city: string | null;
  created_at: string | null;
  id: string;
  name: string;
  phone: string | null;
  wish_list?: string[] | null;
  email: string;
}
