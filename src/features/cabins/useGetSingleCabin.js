import { useQuery } from "@tanstack/react-query"
import { getSingleCabin } from "../../services/apiCabins";


function useGetSingleCabin(cabinId) {


 const {
   isPending,
   data: singleCabin,  
 } = useQuery({
   queryKey: ["cabin", cabinId],
   queryFn: () => getSingleCabin(cabinId),
   retry: false,
 });

 return { isPending, singleCabin };
}

export default useGetSingleCabin