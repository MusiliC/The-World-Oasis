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

export async function getSingleCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin not found");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin_images")
      .upload(imageName, newCabin.image);

    if (uploadError) {
      console.error(uploadError);
      throw new Error("Image upload failed");
    }
  }

  let query;
  if (id) {
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  } else {
    query = supabase.from("cabins").insert({ ...newCabin, image: imagePath });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Error creating or editing cabin");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new error("Cabins could not be deleted");
  }
  return data;
}
