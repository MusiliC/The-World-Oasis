import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  let { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //update user or fullname

  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  let { data, error: userError } = supabase.auth.updateUser(updateData);

  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }

  if (!avatar) return data;

  //upload the avatar image

  const fileName = `avatar-${data?.user?.id} -${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarError) {
    console.error(avatarError);
    throw new Error(avatarError.message);
  }

  // update the avatar in the user

  let { data: data2, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    console.error(error2);
    throw new Error(error2.message);
  }

  return data2;
}
