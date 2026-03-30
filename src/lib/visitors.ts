import { supabase } from "./supabase";

export async function incrementVisitors(): Promise<number> {
  const { data, error } = await supabase.rpc("increment_visitors");
  if (error) throw error;
  return data;
}

export async function getVisitorCount(): Promise<number> {
  const { data, error } = await supabase
    .from("visitors")
    .select("count")
    .single();
  if (error) throw error;
  return data.count;
}