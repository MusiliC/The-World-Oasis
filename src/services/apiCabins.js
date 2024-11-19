/* eslint-disable no-unused-vars */
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

export async function deleteCabin(id){
const {data, error } = await supabase
  .from("cabins")
  .delete()
  .eq("id", id);

   if (error) {
     console.error(error);
     throw new error("Cabins could not be deleted");
   }
   return data;

}