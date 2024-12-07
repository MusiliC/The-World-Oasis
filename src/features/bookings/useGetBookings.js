import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useGetBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };  

  //SORT

  const [field, direction] = sortByRaw.split("-");

  const sortBy = {field, direction}

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });

  return { isPending, bookings, error };
}

export default useGetBookings;
