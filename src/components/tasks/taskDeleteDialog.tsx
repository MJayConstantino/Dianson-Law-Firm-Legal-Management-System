"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from 'lucide-react';
import { useState } from "react";

interface TaskDeleteDialogProps {
  taskName: string;
  isProcessing: boolean;
  onConfirm: () => Promise<void>;
}

export function TaskDeleteDialog({
  taskName,
  isProcessing,
  onConfirm,
}: TaskDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Error in delete dialog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="hover:cursor-pointer h-7 w-auto px-1.5 text-xs"
        onClick={() => setOpen(true)}
        disabled={isProcessing}
      >
        <Trash2 className="h-3 w-3 mr-1" />
        <span className="hidden xxs:inline">Delete</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the task &quot;{taskName}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isDeleting}
              className="hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="hover:cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
