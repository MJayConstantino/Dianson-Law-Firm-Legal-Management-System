"use client";

import { useState } from "react";
import { Phone, Mail, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";

interface CourtDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function CourtDetailsCard({ matter, onUpdate }: CourtDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });

  const handleNestedChange = (
    field: keyof NonNullable<Matter["court"]>,
    value: string
  ) => {
    setEditedMatter((prev) => ({
      ...prev,
      court: {
        name: prev.court?.name ?? "N/A",
        phone: prev.court?.phone ?? "N/A",
        email: prev.court?.email ?? "N/A",
        [field]: value,
      },
    }));
  };

  const saveChanges = async () => {
    const { matter: updatedMatter, error } = await handleSaveMatter(
      editedMatter
    );
    if (!error && updatedMatter) {
      onUpdate?.(updatedMatter);
    } else {
      const { matter: original } = handleCancelMatter(matter);
      setEditedMatter(original);
    }
  };

  const cancelChanges = () => {
    const { matter: original } = handleCancelMatter(matter);
    setEditedMatter(original);
  };

  const court = editedMatter.court || {
    name: "N/A",
    phone: "N/A",
    email: "N/A",
  };

  return (
    <EditableCard
      title="Court Details"
      onSave={saveChanges}
      onCancel={cancelChanges}
    >
      {(isEditing) => (
        <div className="space-y-4">
          <div className="w-full">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Court
            </h4>
            <div className="flex items-start w-full">
              <Building className="h-4 w-4 mr-2 mt-1 text-muted-foreground flex-shrink-0" />
              <div className="flex-grow">
                {isEditing ? (
                  <Input
                    value={court.name}
                    onChange={(e) => handleNestedChange("name", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium break-words">{court.name}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Contact Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center w-full">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <div className="flex-grow">
                  {isEditing ? (
                    <Input
                      value={court.phone}
                      onChange={(e) =>
                        handleNestedChange("phone", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p className="break-words">{court.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <div className="flex-grow">
                  {isEditing ? (
                    <Input
                      value={court.email}
                      onChange={(e) =>
                        handleNestedChange("email", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p className="break-words">{court.email}</p>
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
