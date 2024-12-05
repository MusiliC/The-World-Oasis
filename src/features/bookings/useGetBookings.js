import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

function useGetBookings() {
  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isPending, bookings, error };
}

export default useGetBookings;
