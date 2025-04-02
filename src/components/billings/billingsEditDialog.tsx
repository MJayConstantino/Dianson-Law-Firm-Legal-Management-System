// Edit Bill dialog box

"use client"

import { useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

import type { Bill, BillStatus} from "@/types/billing.type"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { BillingStates } from "./billingsStates"
import { Textarea } from "../ui/textarea"


  interface BillingsEditDialogProps {
    bill: Bill
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (bill: Bill) => void
  }
  
  export function BillingsEditDialog({ bill, open, onOpenChange, onSave }: BillingsEditDialogProps) {
    const {
      name, setName, amount, setAmount, created_at, setCreated_at, 
      status, setStatus, remarks, setRemarks
    }= BillingStates()
  
    const isDesktop = useMediaQuery("(min-width: 768px)")
  
    // Update form when bill changes
    useEffect(() => {
      if (open) {
        setName(bill.name)
        setAmount(bill.amount.toString())
        setCreated_at(new Date(bill.created_at))
        setStatus(bill.status)
        setRemarks(bill.remarks || "")
      }
    }, [bill, open])
  
    const handleSave = () => {
      if (!name || !amount) return
  
      const updatedBill: Bill = {
        ...bill,
        name,
        amount: Number.parseFloat(amount),
        created_at: created_at.toISOString(),
        status,
        remarks,
      }
  
      onSave(updatedBill)
      onOpenChange(false)
    }
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={`${isDesktop ? "sm:max-w-[700px]" : "sm:max-w-[90vw]"} max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">Edit Bill</DialogTitle>
          </DialogHeader>
  
          <div className="grid gap-4 py-4">
            <div className={`grid ${isDesktop ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
              {/* Left Column */}
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
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
  
                <div className="grid gap-2">
                  <Label htmlFor="edit-date" className="text-base md:text-lg">
                    Created At
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="edit-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:border-gray-600",
                          !created_at && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                        {created_at ? format(created_at, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 dark:bg-gray-700 dark:border-gray-600">
                      <Calendar
                        mode="single"
                        selected={created_at}
                        onSelect={(date) => date && setCreated_at(date)}
                        initialFocus
                        className="dark:bg-gray-700"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
  
              {/* Right Column */}
              <div className="flex flex-col">
                <div className="grid gap-2 mb-4">
                  <Label className="text-base md:text-lg">Status</Label>
                  <RadioGroup
                    value={status}
                    onValueChange={(value) => setStatus(value as BillStatus)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Active" id="edit-active" className="h-3 w-3 md:h-4 md:w-4" />
                      <Label htmlFor="edit-active" className="text-sm md:text-base">
                        Active
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Paid" id="edit-paid" className="h-3 w-3 md:h-4 md:w-4" />
                      <Label htmlFor="edit-paid" className="text-sm md:text-base">
                        Paid
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Pending" id="edit-pending" className="h-3 w-3 md:h-4 md:w-4" />
                      <Label htmlFor="edit-pending" className="text-sm md:text-base">
                        Pending
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Overdue" id="edit-overdue" className="h-3 w-3 md:h-4 md:w-4" />
                      <Label htmlFor="edit-overdue" className="text-sm md:text-base">
                        Overdue
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
  
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-0">
                    <Label htmlFor="edit-remarks" className="text-base md:text-lg">
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
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              className="bg-indigo-900 hover:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-sm md:text-base h-9 md:h-10"
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
