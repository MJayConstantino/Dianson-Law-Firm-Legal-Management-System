export type Priority = "low" | "medium" | "high";
export type Status = "in-progress" | "completed" | "overdue"

export interface Task {
  task_id: string;
  name: string;
  description?: string;
  due_date?: Date;
  priority: Priority;
  status: Status;
  matter_id?: string;
  created_at?: Date;
}
