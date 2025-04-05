export const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";

    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "in-progress":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";

    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  }
};
