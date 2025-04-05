"use client";

import { Plus, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Task } from "@/types/task.type";
import { createTask } from "@/actions/tasks";
import { TaskForm } from "./taskForm";
import { toast } from "sonner";

interface TasksHeaderProps {
  onSearch: (term: string) => void;
  onStatusChange: (status: string) => void;
  onViewChange: (view: "grid" | "table") => void;
  view: "grid" | "table";
  onTaskCreated?: (task: Task) => void;
}

export function TasksHeader({
  onSearch,
  onStatusChange,
  onViewChange,
  view,
  onTaskCreated,
}: TasksHeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onStatusChange(filter);
  };

  const handleSaveTask = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: task.matter_id,
      } as Omit<Task, "id">;

      setIsAddTaskOpen(false);

      const createdTask = await createTask(newTask);

      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const handleSaveAndCreateAnother = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: task.matter_id,
      } as Omit<Task, "id">;

      const createdTask = await createTask(newTask);

      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="w-full">
      {/* Main controls section */}
      <div className="bg-white shadow dark:bg-gray-800 rounded-lg p-3 sm:p-3 border dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* New Task Button */}
          <Button
            variant="blue"
            size="sm"
            className="sm:h-9"
            onClick={() => setIsAddTaskOpen(true)}
          >
            <Plus className="h-3 w-3 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">New Task</span>
          </Button>

          {/* Search Bar */}
          <div className="relative w-full sm:w-auto max-w-xs sm:max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-10 h-9 text-sm bg-gray-100 dark:bg-gray-700 border-none shadow"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md  justify-center sm:justify-start">
            <Button
              variant={activeFilter === "all" ? "blue" : "ghost"}
              size="sm"
              className="px-3 py-1 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("all")}
            >
              All Tasks
            </Button>
            <Button
              variant={activeFilter === "in-progress" ? "blue" : "ghost"}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("in-progress")}
            >
              In-Progress
            </Button>
            <Button
              variant={activeFilter === "overdue" ? "blue" : "ghost"}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("overdue")}
            >
              Overdue
            </Button>
            <Button
              variant={activeFilter === "completed" ? "blue" : "ghost"}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </Button>
          </div>

          {/* View Toggle */}
          <div className="grid grid-cols-2 gap bg-gray-100 shadow dark:bg-gray-700 rounded-md w-full sm:flex sm:gap-3 sm:w-auto sm:justify-start">
            <Button
              variant={view === "grid" ? "blue" : "ghost"}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => onViewChange("grid")}
            >
              <Grid className="h-5 w-5 mr-2" />
              <span className="text-xs">Grid</span>
            </Button>
            <Button
              variant={view === "table" ? "blue" : "ghost"}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => onViewChange("table")}
            >
              <List className="h-5 w-5 mr-2" />
              <span className="text-xs">Table</span>
            </Button>
          </div>
        </div>

        <TaskForm
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onSave={handleSaveTask}
          onSaveAndCreateAnother={handleSaveAndCreateAnother}
        />
      </div>
    </div>
  );
}
