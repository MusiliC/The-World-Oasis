import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){

    const navigate = useNavigate();

   const {mutate: login, isPending: isLoginLoading} =  useMutation({
        mutationFn:({email,password}) => loginApi({email, password}),
        onSuccess: () => {
            navigate("/dashboard")
        },

        onError: (error) => {
            console.error("Error", error);
            
            toast.error(error)
        }
    })


    return {login, isLoginLoading} 
}