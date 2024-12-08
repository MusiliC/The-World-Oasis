import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useGetBookings() {

  const queryClient = useQueryClient();

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


  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page}),
  });

   const bookings = data?.data ?? [];

   const count = data?.count ?? 0;

  //  prefetch query
  const pageCount = Math.ceil(count/PAGE_SIZE)

  if(page < pageCount){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page+1],
      queryFn: () => getBookings({ filter, sortBy, page:page+1 }),
    });
  }

   if (page > 1) {
     queryClient.prefetchQuery({
       queryKey: ["bookings", filter, sortBy, page - 1],
       queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
     });
   }

  return { isPending, bookings, error, count };
}

export default useGetBookings;
