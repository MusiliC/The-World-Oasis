import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

function useGuests() {
  const { isPending, data: guests } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { isPending, guests };
}

export default useGuests;
