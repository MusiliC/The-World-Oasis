import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){

    const queryClient = useQueryClient()

    const navigate = useNavigate();

   const {mutate: login, isPending: isLoginLoading} =  useMutation({
        mutationFn:({email,password}) => loginApi({email, password}),
        onSuccess: (data) => {
            queryClient.setQueriesData(['user'], data)
            navigate("/dashboard", { replace: true });
        },

        onError: (error) => {
            console.error("Error", error);
            
            toast.error(error)
        }
    })


    return {login, isLoginLoading} 
}