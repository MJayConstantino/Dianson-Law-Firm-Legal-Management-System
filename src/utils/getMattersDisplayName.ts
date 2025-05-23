import { Matter } from "@/types/matter.type";

export function getMattersDisplayName(uid: string, matters: Matter[]): string {
  const found = matters.find((matter) => matter.matter_id === uid);
  return found ? found.name : "N/A";
}

export function getMattersDisplayNameByMatterId(matterId: string, matters: Matter[]): string {
  return matters.find((matter) => matter.matter_id === matterId)?.name || "";
}

