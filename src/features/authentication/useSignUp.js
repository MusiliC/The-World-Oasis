import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(){
   const{mutate: signUp, isPending} =  useMutation({
      mutationFn: signUpApi,
      onSuccess: (user) => {
        console.log(user);
        toast.success("Account fully created, please verify the new account from users email")
      }
    });


    return {signUp, isPending}
}