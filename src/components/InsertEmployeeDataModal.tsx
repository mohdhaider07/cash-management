import React, { useState } from "react";
import Modal from "@/components/Modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetAllEmployeesQuery } from "@/redux/features/apis/employeeApi";
import CollectionForm from "@/components/CollectionForm";
import DepositForm from "@/components/DepositForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Enum for tab values
export enum EmployeeTab {
  Collection = "collection",
  Deposit = "deposit",
}

export default function InsertEmployeeDataModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<EmployeeTab>(EmployeeTab.Collection);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const { data, isLoading: loadingEmployees } = useGetAllEmployeesQuery();
  const employees = data?.employees ?? [];

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Insert Employee Data"
      size="medium"
    >
      <div className="p-2 space-y-6 rounded-lg sm:p-4 bg-background">
        <div className="space-y-2">
          <Label className="block text-sm font-medium text-foreground">
            Select Employee
          </Label>
          <Select
            disabled={loadingEmployees}
            onValueChange={setSelectedEmployee}
            value={selectedEmployee}
          >
            <SelectTrigger className="border rounded-md shadow-sm text-primary h-11 border-primary focus:ring-2 focus:ring-primary/40">
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {employees.map((e: any) => (
                <SelectItem key={e._id} value={e._id} className="py-2">
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="my-2 border-t border-border" />
        <Tabs value={tab} onValueChange={setTab as any}>
          <TabsList className="flex gap-2 p-1 mb-4 rounded-md bg-muted">
            <TabsTrigger
              value={EmployeeTab.Collection}
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2 transition-colors"
            >
              {EmployeeTab.Collection.charAt(0).toUpperCase() +
                EmployeeTab.Collection.slice(1)}
            </TabsTrigger>
            <TabsTrigger
              value={EmployeeTab.Deposit}
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md px-4 py-2 transition-colors"
            >
              {EmployeeTab.Deposit.charAt(0).toUpperCase() +
                EmployeeTab.Deposit.slice(1)}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={EmployeeTab.Collection}>
            <div
              className={
                selectedEmployee
                  ? ""
                  : "pointer-events-none opacity-50 bg-muted/60 rounded-md p-2"
              }
            >
              <CollectionForm
                employeeId={selectedEmployee}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </TabsContent>
          <TabsContent value={EmployeeTab.Deposit}>
            <div
              className={
                selectedEmployee
                  ? ""
                  : "pointer-events-none opacity-50 bg-muted/60 rounded-md p-2"
              }
            >
              <DepositForm
                employeeId={selectedEmployee}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}
