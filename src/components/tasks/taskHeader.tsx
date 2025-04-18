"use client"

import type React from "react"
import { Plus, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { Task } from "@/types/task.type"
import { createTask } from "@/actions/tasks"
import { TaskForm } from "./taskForm"
import { toast } from "sonner"

interface TasksHeaderProps {
  onStatusChange: (status: string) => void
  onViewChange: (view: "grid" | "table") => void
  view: "grid" | "table"
  onTaskCreated?: (task: Task) => void
  matter_id?: string 
}

export function TasksHeader({
  onStatusChange,
  onViewChange,
  view,
  onTaskCreated,
  matter_id, 
}: TasksHeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onStatusChange(filter);
  };

  const getButtonVariant = (filter: string, activeFilter: string) => {
    return filter === activeFilter ? "blue" : "ghost";
  };
  

  const handleSaveTask = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: matter_id || task.matter_id,
      } as Omit<Task, "id">

      setIsAddTaskOpen(false)

      const createdTask = await createTask(newTask)

      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask)
      }
    } catch (error) {
      console.error("Error creating task:", error)
      toast.error("Failed to create task")
    }
  }

  const handleSaveAndCreateAnother = async (task: Task) => {
    try {
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
        matter_id: matter_id || task.matter_id
      } as Omit<Task, "id">

      const createdTask = await createTask(newTask)

      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask)
      }
    } catch (error) {
      console.error("Error creating task:", error)
      toast.error("Failed to create task")
    }
  }

  return (
    <div className="w-full">
      {/* Main controls section */}
      <div className="bg-white shadow dark:bg-gray-900 rounded-lg p-3 sm:p-3 border">
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

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center sm:justify-start">
            <Button
              variant={getButtonVariant("all", activeFilter)}
              size="sm"
              className="px-3 py-1 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("all")}
            >
              All Tasks
            </Button>
            <Button
              variant={getButtonVariant("in-progress", activeFilter)}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("in-progress")}
            >
              In-Progress
            </Button>
            <Button
              variant={getButtonVariant("overdue", activeFilter)}
              size="sm"
              className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
              onClick={() => handleFilterChange("overdue")}
            >
              Overdue
            </Button>
            <Button
              variant={getButtonVariant("completed", activeFilter)}
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
          disableMatterSelect={!!matter_id}
          onSaveAndCreateAnother={handleSaveAndCreateAnother}
          initialTask={
            matter_id
              ? {
                  task_id: "",
                  name: "",
                  description: "",
                  due_date: undefined,
                  priority: "low",
                  status: "in-progress",
                  matter_id: matter_id,
                  created_at: new Date(),
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

