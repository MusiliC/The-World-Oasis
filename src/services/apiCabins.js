/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

  let query = supabase
    .from("cabins");

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {

const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );    

  const imagePath =  hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // 1.create cabin
  if(!id) query =  query.insert([{ ...newCabin, image:imagePath }]);
   

  //2. Update cabin
  if(id) query = query
    .update({ ...newCabin, image: imagePath })
    .eq("id", id);


  const {data, error} = await query.select();

  if (error) {
    console.error(error);
    throw new error("Cabins could not be created");
  }
  return data;

  //2.  upload image

  async function uploadFile(file) {
    const { error: storageError } = await supabase.storage
      .from("cabin_images")
      .upload(imageName, newCabin.image);
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new error("Image could not be created");
    }
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new error("Cabins could not be deleted");
  }
  return data;
}
