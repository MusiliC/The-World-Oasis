import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting  as updateSettingApi} from "../../services/apiSettings";


export function useEditSettings() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings Updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editSetting };
}
