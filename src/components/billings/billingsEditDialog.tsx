"use client";

import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Bill, BillStatus } from "@/types/billing.type";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillingStates } from "./billingsStates";
import { Textarea } from "../ui/textarea";
import { Matter } from "@/types/matter.type";

interface BillingsEditDialogProps {
  bill: Bill;
  matters: Matter[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bill: Bill) => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function BillingsEditDialog({
  bill,
  open,
  onOpenChange,
  onSave,
  onSuccess,
  onError
}: BillingsEditDialogProps) {
  const {
    name,
    setName,
    amount,
    setAmount,
    created_at,
    setCreated_at,
    status,
    setStatus,
    remarks,
    setRemarks,
    dateString,
    setDateString,
    setMatterId,
    matter_id,
    isSubmitting,
    setIsSubmitting
  } = BillingStates();

  const dateInputRef = useRef<HTMLInputElement>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (open) {
      setMatterId(bill.matter_id);
      setName(bill.name);
      setAmount(bill.amount.toString());
      setCreated_at(new Date(bill.created_at));
      setStatus(bill.status);
      setRemarks(bill.remarks || "");
      setIsSubmitting(false);
    }
  }, [
    bill,
    open,
    setMatterId,
    setName,
    setAmount,
    setCreated_at,
    setStatus,
    setRemarks,
    setIsSubmitting,
  ]);

  const handleSave = () => {
    if (!name || !amount || !matter_id){
      toast.error("Please fill in all required fields.")
      return;
    }

    setIsSubmitting(true)

    try{
      const updatedBill: Bill = {
        ...bill,
        matter_id,
        name,
        amount: Number(amount),
        created_at: created_at.toISOString(),
        status,
        remarks,
      };

      onSave(updatedBill);
      toast.success("Bill edited successfully.")

      if (onSuccess) onSuccess()
      onOpenChange(false)

    }catch (error) {

      toast.error("Failed to edit bill. Please try again.")

      if (onError && error instanceof Error) onError(error)
    } finally {
      setIsSubmitting(false)
    }
    
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = e.target.value
    setDateString(newDateString)

    if (newDateString) {
      const newDate = new Date(newDateString)
      if (!isNaN(newDate.getTime())) {
        setCreated_at(newDate)
      }
    }
  }

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${
          isDesktop ? "sm:max-w-[700px]" : "sm:max-w-[90vw]"
        } max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Edit Bill</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div
            className={`grid ${
              isDesktop ? "grid-cols-2" : "grid-cols-1"
            } gap-4`}
          >
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name" className="text-base md:text-lg">
                  Bill Name
                </Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-amount" className="text-base md:text-lg">
                  Amount
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if(Number(value) < 0){
                      toast.error("Invalid amount format.")
                    }else if(Number(value) >= 0 || value === ""){
                      setAmount(e.target.value)}
                    }
                  }
                  className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date-display" className="text-base md:text-lg">
                Date Billed
                </Label>
                <div className="relative">
                  <Input
                    id="date-display"
                    readOnly
                    value={created_at ? format(created_at, "MMMM d, yyyy") : ""}
                    className="text-sm md:text-base h-9 md:h-10 pr-10 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Select date"
                    onClick={openDatePicker}
                  />

                  <input
                    ref={dateInputRef}
                    type="date"
                    value={dateString}
                    onChange={handleDateChange}
                    className="sr-only"
                    tabIndex={-1}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={openDatePicker}
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="grid gap-2 mb-4 space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue="pending"
                  value={status}
                  onValueChange={(value) => setStatus(value as BillStatus)}
                >
                  <SelectTrigger
                    id="edit-status"
                    className="text-sm md:text-base dark:bg-gray-700 dark:border-gray-600"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="active" className="text-sm md:text-base">
                      Active
                    </SelectItem>
                    <SelectItem value="paid" className="text-sm md:text-base">
                      Paid
                    </SelectItem>
                    <SelectItem
                      value="pending"
                      className="text-sm md:text-base"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      value="overdue"
                      className="text-sm md:text-base"
                    >
                      Overdue
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-0">
                  <Label
                    htmlFor="edit-remarks"
                    className="text-base md:text-lg"
                  >
                    Remarks
                  </Label>
                </div>
                <Textarea
                  id="edit-remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="(optional)"
                  className="mt-2 flex-grow min-h-[130px] overflow-y-auto resize-none text-sm md:text-base dark:bg-gray-700 dark:border-gray-600 placeholder:italic"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            id="cancelBtn"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            id="saveBtn"
            className="bg-indigo-900 hover:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-sm md:text-base h-9 md:h-10"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
