"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import type { Status, Task } from "@/types/task.type"

export async function getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true })
    
  if (error) {
    console.error("Error fetching task:", error)
    return []
  }

  return data as Task[]
}

export async function getTaskById(taskId: string) {
  const { data, error } = await supabase.from("tasks").select("*").eq("id", taskId).single()

  if (error) {
    console.error("Error fetching tasks:", error)
    return null
  }

  return data as Task
}

export async function createTask(task: Omit<Task, "id">) {
  const { data, error } = await supabase.from("task").insert([task]).select()

  if (error) {
    console.error("Error creating task:", error)
    throw new Error("Failed to create task")
  }

  revalidatePath("/tasks")
  return data[0] as Task
}

export async function updateTask(id: string, p0: { status: Status }, task: Task) {
  const { data, error } = await supabase.from("tasks").update(task).eq("id", task.id).select()

  if (error) {
    console.error("Error updating task:", error)
    throw new Error("Failed to update task")
  }

  revalidatePath(`/tasks/${task.id}`)
  return data[0] as Task
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("task").delete().eq("id", taskId)

  if (error) {
    console.error("Error deleting task:", error)
    throw new Error("Failed to delete task")
  }

  revalidatePath("/tasks")
  return true
}

