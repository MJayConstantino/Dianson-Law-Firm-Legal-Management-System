import { Task } from "@/types/task.type";

const mockMatter = {
  matter_id: "matter1",
};

const mockTasks: { [key: string]: Task } = {
  default: {
    task_id: "task1",
    name: "Finish Homework",
    description: "Complete the assignment on advanced algebra.",
    status: "in-progress",
    priority: "medium",
    due_date: new Date("2026-04-12"),
    matter_id: mockMatter.matter_id,
  },
  overdue: {
    task_id: "task2",
    name: "Complete Lab Report",
    description: "Submit the lab report for chemistry.",
    status: "in-progress",
    priority: "high",
    due_date: new Date("2025-03-25"),
    matter_id: mockMatter.matter_id,
  },
  complete: {
    task_id: "task3",
    name: "Update Resume",
    description: "Revise the resume with recent job experiences.",
    status: "completed",
    priority: "medium",
    due_date: new Date("2025-04-10"),
    matter_id: mockMatter.matter_id,
  },
  highPriority: {
    task_id: "task4",
    name: "Urgent Bug Fix",
    description: "Fix the critical bug in the system before the deadline.",
    status: "in-progress",
    priority: "high",
    due_date: new Date("2026-04-12"),
    matter_id: mockMatter.matter_id,
  },
  lowPriority: {
    task_id: "task5",
    name: "Clean Workspace",
    description: "Tidy up the desk and workspace.",
    status: "in-progress",
    priority: "low",
    due_date: new Date("2026-04-12"),
    matter_id: mockMatter.matter_id,
  },
  mediumPriority: {
    task_id: "task6",
    name: "Prepare Presentation",
    description: "Work on slides for the upcoming presentation.",
    status: "in-progress",
    priority: "medium",
    due_date: new Date("2026-04-12"),
    matter_id: mockMatter.matter_id,
  },
  longDescription: {
    task_id: "task7",
    name: "Research Project",
    description:
      "This is a long description task where you need to conduct in-depth research about the environmental impacts of urbanization. The report should cover various aspects such as water management, air pollution, and social impacts.",
    status: "in-progress",
    priority: "medium",
    due_date: new Date("2026-04-12"),
    matter_id: mockMatter.matter_id,
  },
  withoutMatter: {
    task_id: "task8",
    name: "Call Client",
    description: "Reach out to the client for the next phase discussion.",
    status: "in-progress",
    priority: "medium",
    due_date: new Date("2026-04-12"),
    matter_id: "", 
  },
  withoutDueDate: {
    task_id: "task9",
    name: "Team Meeting",
    description: "Discuss the project updates and next steps.",
    status: "in-progress",
    priority: "medium",
    due_date: undefined, 
    matter_id: mockMatter.matter_id,
  },
};

export default mockTasks;