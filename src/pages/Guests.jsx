import GuestsTable from "../features/guests/GuestsTable"
import Heading from "../ui/Heading";
import Row from "../ui/Row"


function Guests() {
  return (
    <>
      <Row >
        <Heading as="h1">All Guests</Heading>
        <GuestsTable />
      </Row>
    </>
  );
}

export default Guests