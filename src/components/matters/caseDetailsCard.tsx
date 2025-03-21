"use client";

import { useState } from "react";
import { Calendar, Phone, Mail, MapPin, User, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditableCard } from "./editableCard";
import { updateMatter } from "@/actions/matters";
import { Matter } from "@/types/matter.type";
import { toast } from "sonner";

interface CaseDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function CaseDetailsCard({ matter, onUpdate }: CaseDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });

  const handleChange = (field: string, value: any) => {
    setEditedMatter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedMatter = await updateMatter(editedMatter);
      onUpdate?.(updatedMatter);
      toast.success("Case details have been updated successfully.");
    } catch (error) {
      toast.error("Failed to update case details. Please try again.");
      setEditedMatter({ ...matter });
    }
  };

  const handleCancel = () => {
    setEditedMatter({ ...matter });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <EditableCard
      title="Case Details"
      onSave={handleSave}
      onCancel={handleCancel}
    >
      {(isEditing) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Title
              </h4>
              {isEditing ? (
                <Input
                  value={editedMatter.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <p className="font-medium">{editedMatter.name}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Case Number
                </h4>
                {isEditing ? (
                  <Input
                    value={editedMatter.case_number || ""}
                    onChange={(e) =>
                      handleChange("case_number", e.target.value)
                    }
                  />
                ) : (
                  <p>{editedMatter.case_number || "N/A"}</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Status
                </h4>
                {isEditing ? (
                  <Select
                    value={editedMatter.status}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    className={getStatusColor(editedMatter.status)}
                    variant="outline"
                  >
                    {editedMatter.status.charAt(0).toUpperCase() +
                      editedMatter.status.slice(1)}
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Description
              </h4>
              {isEditing ? (
                <Textarea
                  value={editedMatter.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              ) : (
                <p>{editedMatter.description}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Open Date
                </h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editedMatter.date_opened.split("T")[0]}
                      onChange={(e) =>
                        handleChange("date_opened", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p>
                      {new Date(editedMatter.date_opened).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Close Date
                </h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="date"
                      value={
                        editedMatter.date_closed
                          ? editedMatter.date_closed.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleChange("date_closed", e.target.value || null)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p>
                      {editedMatter.date_closed
                        ? new Date(
                            editedMatter.date_closed
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Client
              </h4>
              {isEditing ? (
                <Input
                  value={editedMatter.client}
                  onChange={(e) => handleChange("client", e.target.value)}
                />
              ) : (
                <p className="font-medium">{editedMatter.client}</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.client_phone || ""}
                      onChange={(e) =>
                        handleChange("client_phone", e.target.value)
                      }
                    />
                  ) : (
                    <p>{editedMatter.client_phone || "N/A"}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.client_email || ""}
                      onChange={(e) =>
                        handleChange("client_email", e.target.value)
                      }
                    />
                  ) : (
                    <p>{editedMatter.client_email || "N/A"}</p>
                  )}
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.client_address || ""}
                      onChange={(e) =>
                        handleChange("client_address", e.target.value)
                      }
                    />
                  ) : (
                    <p>{editedMatter.client_address || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Assigned Attorney
                </h4>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.assigned_attorney || ""}
                      onChange={(e) =>
                        handleChange("assigned_attorney", e.target.value)
                      }
                    />
                  ) : (
                    <p>{editedMatter.assigned_attorney || "N/A"}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Assigned Staff
                </h4>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.assigned_staff || ""}
                      onChange={(e) =>
                        handleChange("assigned_staff", e.target.value)
                      }
                    />
                  ) : (
                    <p>{editedMatter.assigned_staff || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </EditableCard>
  );
}
