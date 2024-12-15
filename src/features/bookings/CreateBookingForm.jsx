import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import Select from "../../ui/Select";
import Row from "../../ui/Row";
import { useGetCabin } from "../cabins/useGetCabin";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateBookingForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { isPending, cabins } = useGetCabin();

  console.log(cabins);

  const { errors } = formState;

  return (
    <Form>
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
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </FormRow>
          <FormRow label="Select cabin" error={errors?.start_date?.message}>
            {isPending ? (
              <SpinnerMini />
            ) : (
              <Select
                options={cabins}
                value="id"
                getOptionLabel={(option) => option.name}
              />
            )}
          </FormRow>
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
            {...register("has_breakfast", {
              required: "This field is required",
            })}
          >
            Include breakfast?
          </Checkbox>
        </div>
      </Row>
    </Form>
  );
}

export default CreateBookingForm;
