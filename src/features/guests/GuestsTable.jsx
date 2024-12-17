import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestsRow from "./GuestsRow";
import useGuests from "./useGuests";

function GuestsTable() {

  const { isPending, guests, count } = useGuests();

  if(isPending) return <Spinner/>
  

  if (!guests.length) return <Empty resource="Guests" />;

  return (
    <Table columns="1fr 1fr 1fr">
      <Table.Header>
        <div>Full Name</div>
        <div>Email</div>
        <div>National Id</div>
      </Table.Header>

      <Table.Body
        data={guests}
        render={(guest) => <GuestsRow key={guest.id} guest={guest} />}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default GuestsTable;
