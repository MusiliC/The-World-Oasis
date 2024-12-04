import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      <SortBy options={[
        {value: "name-asc", label: 'Sort By Name, (A-Z)'},
        {value: "name-desc", label: 'Sort By Name, (Z-A)'},
        {value: "regular_price-asc", label: 'Sort By Price, (Low First)'},
        {value: "regular_price-desc", label: 'Sort By Price, (High First)'},
        {value: "max_capacity-asc", label: 'Sort By Capacity, (Low First)'},
        {value: "max_capacity-desc", label: 'Sort By Capacity, (High First)'},
      ]} />
    </TableOperations>
  );
}

export default CabinTableOperations;
