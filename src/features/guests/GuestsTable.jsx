import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestsRow from "./GuestsRow";
import useGuests from "./useGuests";

function GuestsTable() {

  const { isPending, guests } = useGuests();

  if(isPending) return <Spinner/>
  

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
    </Table>
  );
}

export default GuestsTable;
