import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";


function useCreateBooking() {
 
    const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("New Booking created");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });


      return { isCreating, createBooking };
}

export default useCreateBooking