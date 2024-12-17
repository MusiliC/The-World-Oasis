import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import Select from "../../ui/Select";
import Row from "../../ui/Row";
import { useGetCabin } from "../cabins/useGetCabin";
import SpinnerMini from "../../ui/SpinnerMini";
import useGuests from "../guests/useGuests";
import { useState } from "react";
import { useEffect } from "react";
import useGetSingleCabin from "../cabins/useGetSingleCabin";

function CreateBookingForm() {
  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { isPending: isPendingCabins, cabins } = useGetCabin();
  const { isPending: isPendingGuests, guests } = useGuests();

  const [addBreakfast, setAddBreakfast] = useState(false);
  const [guest_id, setGuest_id] = useState("");
  const [cabin_id, setCabin_id] = useState("");
  const [cabinDetails, setCabinDetails] = useState({});

  const { errors } = formState;

  const handleGuestChange = (e) => {
    setGuest_id(e.target.value);
  };

  const handleCabinChange = (e) => {
    setCabin_id(e.target.value);
  };

  const { isPending: isPendingCabinDetails, singleCabin } =
    useGetSingleCabin(cabin_id);

  function handleSubmitBooking(data) {
    console.log(data);
    reset();
  }

  useEffect(() => {
    if (!cabin_id) return;
    setCabinDetails(singleCabin);
  }, [cabin_id, singleCabin]);

  if (singleCabin) {
    setValue("cabin_price", singleCabin?.regular_price || 0);
  }

  return (
    <Form onSubmit={handleSubmit(handleSubmitBooking)}>
      <Row type="horizontal">
        <div>
          <FormRow label="Start date" error={errors?.start_date?.message}>
            <Input
              type="date"
              id="start_date"
              //   disabled={isWorking}
              {...register("start_date", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="End date" error={errors?.end_date?.message}>
            <Input
              type="date"
              id="end_date"
              //   disabled={isWorking}
              {...register("end_date", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Number of Nights" error={errors?.num_nights?.message}>
            <Input
              type="number"
              id="num_nights"
              disabled
              {...register("num_nights", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Number of Guests" error={errors?.num_guests?.message}>
            <Input
              type="number"
              id="num_guests"
              //   disabled={isWorking}
              {...register("num_guests", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow
            label="Any Observation"
            error={errors?.observations?.message}
          >
            <Input
              type="text"
              id="observations"
              //   disabled={isWorking}
              {...register("observations", {
                required: "This field is required",
              })}
            />
          </FormRow>
        </div>
        <div>
          <FormRow label="Select guest" error={errors?.start_date?.message}>
            {isPendingGuests ? (
              <SpinnerMini />
            ) : (
              <Select
                options={guests}
                getOptionLabel={(option) => option.full_name}
                getOptionValue={(option) => option.id}
                placeholder={"Select a guest"}
                type="white"
                value={guest_id}
                onChange={handleGuestChange}
              />
            )}
          </FormRow>
          <FormRow label="Select cabin" error={errors?.start_date?.message}>
            {isPendingCabins ? (
              <SpinnerMini />
            ) : (
              <Select
                options={cabins}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder={"Select a cabin"}
                type="white"
                value={cabin_id}
                onChange={handleCabinChange}
              />
            )}
          </FormRow>
          <FormRow label="Cabin price" error={errors?.num_nights?.message}>
            {isPendingCabinDetails ? (
              <SpinnerMini />
            ) : (
              <Input
                type="number"
                disabled
                {...register("cabin_price", {
                  required: "This field is required",
                })}
              />
            )}
          </FormRow>

          <FormRow
            label="Extra cabin price"
            error={errors?.num_nights?.message}
          >
            <Input
              disabled
              {...register("cabin_price", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Total price" error={errors?.num_nights?.message}>
            <Input
              disabled
              {...register("cabin_price", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <Checkbox
            id="has_breakfast"
            // {...register("has_breakfast", {
            //   required: "This field is required",
            // })}
            checked={addBreakfast}
            onChange={() => setAddBreakfast((prev) => !prev)}
          >
            Include breakfast?
          </Checkbox>
        </div>
      </Row>
    </Form>
  );
}

export default CreateBookingForm;
