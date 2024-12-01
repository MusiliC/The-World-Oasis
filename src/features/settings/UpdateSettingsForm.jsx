import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useEditSettings } from './useEditSettings';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {

  const {
    isPending,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_booking,
      breakfast_price,
    } = {},
  } = useSettings();

  const {isEditing, editSetting} = useEditSettings()

   if(isPending) return <Spinner/>

   function handleUpdateSetting(e, field){
    const {value} = e.target;

    if(!value) return;

    editSetting({[field]: value})
   }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, "min_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, "max_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests_booking}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, "max_guests_booking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          disabled={isEditing}
          onBlur={(e) => handleUpdateSetting(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
