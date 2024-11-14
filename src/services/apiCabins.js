import supabase from "./supabase";

export async function getCabins() {
    
const { data, error } = await supabase
  .from("cabins")
  .select("*");

  if(error){
    console.error(error);    
    throw new error("Cabins could not be loaded")
  }

  return data;
}