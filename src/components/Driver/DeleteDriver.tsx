import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteDriver } from "@/apis/admin";
import { parseError, queryClient } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ConfirmDialouge from "../ConfirmDialouge";
import Button from "../Button";
import { Trash } from "iconsax-react";

export default function DeleteDriver({ id }: any) {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      toast.success("Driver deleted");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={
          !isPending && (
            <>
              Delete <Trash size={20} />
            </>
          )
        }
        className={
          "text-sm h-10 rounded-[0.25rem] text-nowrap w-40 bg-red-600 "
        }
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Are you sure you want to delete this driver?"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
