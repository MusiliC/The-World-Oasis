/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );  

  // const { data, error } = await supabase.storage
  //   .from("avatars")
  //   .upload("public/avatar1.png", avatarFile, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // 1.create cabin

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image:imagePath }])
    .select();

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
