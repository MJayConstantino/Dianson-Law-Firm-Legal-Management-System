"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";

interface OpposingCouncilDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function OpposingCouncilDetailsCard({
  matter,
  onUpdate,
}: OpposingCouncilDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });

  const handleNestedChange = (
    field: keyof NonNullable<Matter["opposing_council"]>,
    value: string
  ) => {
    setEditedMatter((prev) => ({
      ...prev,
      opposing_council: {
        ...prev.opposing_council,
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

  const opposingCouncil = editedMatter.opposing_council || {
    name: "N/A",
    phone: "N/A",
    email: "N/A",
    address: "N/A",
  };

  return (
    <EditableCard
      title="Opposing Council"
      onSave={saveChanges}
      onCancel={cancelChanges}
    >
      {(isEditing) => (
        <div className="space-y-4">
          <div className="w-full">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Name
            </h4>
            {isEditing ? (
              <Input
                value={opposingCouncil.name}
                onChange={(e) => handleNestedChange("name", e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="font-medium break-words">{opposingCouncil.name}</p>
            )}
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
                      value={opposingCouncil.phone}
                      onChange={(e) =>
                        handleNestedChange("phone", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p className="break-words">{opposingCouncil.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <div className="flex-grow">
                  {isEditing ? (
                    <Input
                      value={opposingCouncil.email}
                      onChange={(e) =>
                        handleNestedChange("email", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p className="break-words">{opposingCouncil.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start w-full">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground flex-shrink-0" />
                <div className="flex-grow">
                  {isEditing ? (
                    <Input
                      value={opposingCouncil.address}
                      onChange={(e) =>
                        handleNestedChange("address", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p className="break-words">{opposingCouncil.address}</p>
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
