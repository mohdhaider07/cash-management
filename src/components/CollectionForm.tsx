import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "@/components/inputs/CustomInput";
import { Button } from "@/components/ui/button";
import { useCreateCollectionMutation } from "@/redux/features/apis/collectionApi";
import { toast } from "react-hot-toast";
import ShadButton from "./ShadButton";

type Props = {
  employeeId: string;
  onSuccess: () => void;
};

const collectionSchema = z.object({
  mmCollection: z
    .string()
    .min(1, { message: "Collection amount is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
  collectionDate: z.string().min(1, { message: "Date is required" }),
});
type CollectionFormInputs = z.infer<typeof collectionSchema>;

const CollectionForm: React.FC<Props> = ({ employeeId, onSuccess }) => {
  const [createCollection, { isLoading }] = useCreateCollectionMutation();
  const form = useForm<CollectionFormInputs>({
    resolver: zodResolver(collectionSchema),
    defaultValues: { mmCollection: "", collectionDate: "" },
  });

  const onSubmit = async (data: CollectionFormInputs) => {
    // add a confirm for saving the collection
    const res = confirm(
      `Are you sure you want to save this collection of ${data.mmCollection}?`
    );
    const toastId = toast.loading("Saving collection...");
    try {
      await createCollection({
        employeeId,
        mmCollection: Number(data.mmCollection),
        collectionDate: data.collectionDate,
      }).unwrap(); // Ensure errors are caught
      form.reset();
      onSuccess();
      toast.success("Collection saved successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save collection", {
        id: toastId,
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <CustomInput
        label="MM Collection"
        type="number"
        {...form.register("mmCollection")}
        error={form.formState.errors.mmCollection}
      />
      <CustomInput
        label="Collection Date"
        type="date"
        {...form.register("collectionDate")}
        error={form.formState.errors.collectionDate}
      />
      <div className="flex gap-2 mt-4">
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <ShadButton
          type="submit"
          className="w-full"
          disabled={isLoading || !employeeId}
          loading={isLoading}
        >
          Save Collection
        </ShadButton>
      </div>
    </form>
  );
};

export default CollectionForm;
