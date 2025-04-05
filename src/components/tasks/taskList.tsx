"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/types/task.type";
import { getTasks } from "@/actions/tasks";
import { TaskRow } from "./taskRow";
import { TaskCard } from "./taskCard";
import { TasksHeader } from "./taskHeader";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (payload) => {
          console.log("Change received!", payload);
          fetchTasks(); 

          if (payload.eventType === "INSERT") {
            toast.success("New task added");
          } else if (payload.eventType === "UPDATE") {
            toast.success("Task updated");
          } else if (payload.eventType === "DELETE") {
            toast.success("Task deleted");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        searchTerm === "" ||
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.task_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.matter_id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "in-progress" && task.status === "in-progress") ||
        (statusFilter === "overdue" && task.status === "overdue") ||
        (statusFilter === "completed" && task.status === "completed");

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
      const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
      return dateA - dateB;
    });

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleViewChange = (newView: "grid" | "table") => {
    setView(newView);
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  const handleTaskUpdated = () => {
    fetchTasks(); 
  };

  return (
    <div className="container mx-auto py-2">
      <TasksHeader
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onViewChange={handleViewChange}
        view={view}
        onTaskCreated={addTask}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          <p>No tasks found. Create a new task to get started.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.task_id} task={task} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          {filteredTasks.map((task) => (
            <TaskRow
              key={task.task_id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
