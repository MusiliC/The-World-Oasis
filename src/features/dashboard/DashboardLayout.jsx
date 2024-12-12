import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabin } from "../cabins/useGetCabin";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: isPendingBookings, bookings } = useRecentBookings();
  const {
    isPending: isPendingStays,
    // stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const {cabins, isPending:isPendingCabins} = useGetCabin();

  if (isPendingBookings || isPendingStays || isPendingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        confirmedStays={confirmedStays}
        bookings={bookings}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      <div>todays activity</div>
      <div>chart stays duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
