
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;


function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least one",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least one",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow2>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow2>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
