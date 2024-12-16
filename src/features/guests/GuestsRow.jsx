/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const OtherRows = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function GuestsRow({ guest }) {

  const {full_name, email, national_id} = guest;
  return (
    <Table.Row>
      <Guest>{full_name}</Guest>
      <OtherRows>{email}</OtherRows>
      <OtherRows>{national_id}</OtherRows>
    </Table.Row>
  );
}

export default GuestsRow