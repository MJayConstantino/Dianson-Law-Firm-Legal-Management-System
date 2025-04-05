"use client";

import { Button } from "@/components/ui/button";
import type { Matter } from "@/types/matter.type";
import { format, isBefore } from "date-fns";
import { Check, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { updateTask, deleteTask } from "@/actions/tasks";
import { getMatters } from "@/actions/matters";
import { getMattersDisplayName } from "@/utils/getMattersDisplayName";
import { TaskForm } from "./taskForm";
import { getStatusColor } from "@/utils/getStatusColor";
import { Status, Task } from "@/types/task.type";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface TaskRowProps {
  task: Task;
  onTaskUpdated?: () => void;
}

export function TaskRow({ task, onTaskUpdated }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);

  const checkIsOverdue = (dueDate?: Date, status?: string) => {
    if (!dueDate || status === "completed") return false;
    return isBefore(new Date(dueDate), new Date());
  };

  useEffect(() => {
    const overdue = checkIsOverdue(localTask.due_date, localTask.status);
    setIsOverdue(overdue);

    if (overdue && localTask.status !== "overdue") {
      const updatedTask = {
        ...localTask,
        Status: "overdue" as Status,
      };
      setLocalTask(updatedTask);
      updateTask(localTask.task_id, { status: localTask.status }, updatedTask)
        .then(() => {
          console.log("Priority updated to overdue in the database");
        })
        .catch((error) => {
          console.error(
            "Failed to update task priority in the database:",
            error
          );
          setLocalTask(task);
        });
    }
  }, [
    localTask,
    localTask.due_date,
    localTask.priority,
    localTask.status,
    task,
  ]);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  useEffect(() => {
    async function fetchMatters() {
      try {
        setIsLoadingMatters(true);
        const matterData = await getMatters();
        setMatters(matterData);
      } catch (error) {
        console.error("Error fetching matters:", error);
      } finally {
        setIsLoadingMatters(false);
      }
    }
    fetchMatters();
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return "No date";
    try {
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      console.error(error);
      return "Invalid date";
    }
  };

  const handleComplete = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      setLocalTask({
        ...localTask,
        status: "completed",
      });

      await updateTask(
        task.task_id,
        { status: "completed" },
        {
          ...task,
          status: "completed",
        }
      );
      toast.success("Task marked as completed");

      if (onTaskUpdated) onTaskUpdated();
    } catch (error) {
      console.error("Error completing task:", error);
      setLocalTask(task);
      toast.error("Failed to complete task");
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      await deleteTask(task.task_id);

      toast.success("Task deleted successfully");

      window.location.reload();

      if (onTaskUpdated) onTaskUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      setIsProcessing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      const optimisticTask = {
        ...updatedTask,
        task_id: task.task_id,
      } as Task;

      setLocalTask(optimisticTask);
      setIsEditing(false);

      await updateTask(task.task_id, updatedTask, optimisticTask);

      window.location.reload();

      if (onTaskUpdated) onTaskUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
      setLocalTask(task);
      toast.error("Failed to update task");
    }
  };

  const handleSaveAndCreateAnother = async (updatedTask: Task) => {
    await handleSaveTask(updatedTask);
  };

  const matterName = getMattersDisplayName(localTask.matter_id || "", matters);

  return (
    <>
      <div
        className={`flex items-center my-2 rounded-lg justify-between p-3 sm:p-4 border ${
          isOverdue
            ? "border-red-500 bg-red-50 dark:bg-red-950"
            : localTask.status === "completed"
            ? "border-green-500 bg-green-50 dark:bg-green-950"
            : "bg-white dark:bg-gray-800 dark:border-gray-700"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleComplete}
          disabled={localTask.status === "completed" || isProcessing}
          className={`mr-2 sm:mr-4 flex-shrink-0 ${
            localTask.status === "completed" ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
          }`}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Complete</span>
        </Button>
        <div className="flex-1 min-w-0 mr-2 ">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium truncate">{localTask.name}</h3>
            {localTask.priority && (
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(localTask.priority)}`}
              >
                {localTask.priority}
              </Badge>
            )}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground truncate">
            {isLoadingMatters ? (
              <Skeleton className="inline-block w-24 h-4 rounded" />
            ) : (
              matterName || "No matter assigned"
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 dark:text-gray-400">
          <div className="text-xs sm:text-sm hidden sm:block">
            <span className="text-xs sm:text-sm line-clamp-1 ext-muted-foreground dark:text-gray-400">
              {formatDate(localTask.due_date)}
            </span>
          </div>

          <div className="w-16 sm:w-24">
            <Badge
              variant="outline"
              className={`text-xs ${getStatusColor(localTask.status)}`}
            >
              {localTask.status}
            </Badge>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="hover:cursor-pointer"
              disabled={isProcessing}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive hover:cursor-pointer"
              disabled={isProcessing}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>

      <TaskForm
        open={isEditing}
        onOpenChange={setIsEditing}
        onSave={handleSaveTask}
        onSaveAndCreateAnother={handleSaveAndCreateAnother}
        initialTask={localTask}
      />
    </>
  );
}
