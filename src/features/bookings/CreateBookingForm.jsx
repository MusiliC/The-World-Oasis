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

function CreateBookingForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { isPending: isPendingCabins, cabins } = useGetCabin();
  const { isPending: isPendingGuests, guests } = useGuests();

  console.log(cabins);
  

  const [addBreakfast, setAddBreakfast] = useState(false);

  const { errors } = formState;

  function handleSubmitBooking(data) {
    console.log(data);
    reset();
  }


  return (
    <Form onSubmit={handleSubmitBooking(handleSubmit)}>
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
          {/* <FormRow label="Select guest" error={errors?.start_date?.message}>
            {isPendingGuests ? (
              <SpinnerMini />
            ) : (
              // <Select
              //   options={guests}
              //   value="id"
              //   getOptionLabel={(option) => option.full_name}
              //   {...register("guest_id", {
              //     required: {
              //       value: true,
              //       message: "Guest is required",
              //     },
              //     onChange: (e) => {
              //       console.log("React Hook Form onChange", e.target.value);
              //     },
              //   })}
              // />
              <select name="" id=""></select>
            )}
          </FormRow> */}
          {/* <FormRow label="Select cabin" error={errors?.start_date?.message}>
            {isPendingCabins ? (
              <SpinnerMini />
            ) : (
              // <Select
              //   options={cabins}
              //   value="id"
              //   getOptionLabel={(option) => option.name}
              //   {...register("cabin_id", {
              //     required: {
              //       value: true,
              //       message: "Cabin is required",
              //     },
              //     onChange: (e) => {
              //       console.log("React Hook Form onChange", e.target.value);
              //     },
              //   })}
              // />

              <select
                name="homeTeam"
                className="form-select"
                id=""
                {...register("homeTeam", {
                  required: {
                    value: true,
                    message: "Home team is required",
                  },
                })}
              >
             

                {cabins.map((cabin) => (
                  <option key={cabin.id} value={cabin._d}>
                    {cabin.name}
                  </option>
                ))}
              </select>
            )}
          </FormRow> */}
          <FormRow label="Cabin price" error={errors?.num_nights?.message}>
            <Input
              disabled
              {...register("cabin_price", {
                required: "This field is required",
              })}
            />
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
            onChange={() => addBreakfast((breakfast) => !breakfast)}
          >
            Include breakfast?
          </Checkbox>
        </div>
      </Row>
    </Form>
  );
}

export default CreateBookingForm;
