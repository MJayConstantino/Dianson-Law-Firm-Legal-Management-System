"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react";
import { Matter } from "@/types/matter.type";
import { getUserDisplayName } from "@/utils/getUserDisplayName";
import { getStatusColor } from "@/utils/getStatusColor";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types/user.type";

interface MatterRowProps {
  matter: Matter;
  users: User[];
  isLoading: boolean;
  deletingId: string | null;
  onRowClick: (matterId: string) => void;
  onDelete: (matterId: string, e: React.MouseEvent) => void;
}

export function MatterRow({
  matter,
  users,
  isLoading,
  deletingId,
  onRowClick,
  onDelete,
}: MatterRowProps) {
  return (
    <TableRow
      key={matter.matter_id}
      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={() => onRowClick(matter.matter_id)}
    >
      <TableCell className="font-medium">
        {isLoading ? <Skeleton className="w-24 h-4" /> : matter.case_number}
      </TableCell>
      <TableCell>
        {isLoading ? <Skeleton className="w-32 h-4" /> : matter.name}
      </TableCell>
      <TableCell>
        {isLoading ? <Skeleton className="w-32 h-4" /> : matter.client}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton className="w-24 h-4" />
        ) : (
          getUserDisplayName(matter.assigned_attorney!, users)
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton className="w-24 h-4" />
        ) : (
          getUserDisplayName(matter.assigned_staff!, users)
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton className="w-12 h-4" />
        ) : (
          <Badge className={getStatusColor(matter.status)} variant="outline">
            {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton className="w-20 h-4" />
        ) : (
          new Date(matter.date_opened).toLocaleDateString()
        )}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onRowClick(matter.matter_id);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Matter
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => onDelete(matter.matter_id, e)}
              disabled={deletingId === matter.matter_id}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deletingId === matter.matter_id
                ? "Deleting..."
                : "Delete Matter"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
