import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OpposingCouncilStepProps {
  data: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  onChange: (field: string, value: string) => void;
}

export function OpposingCouncilStep({
  data,
  onChange,
}: OpposingCouncilStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="opposing-name">Name</Label>
          <Input
            id="opposing-name"
            placeholder="Opposing Council Law firm or attorney name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opposing-phone">Contact Number / Phone</Label>
          <Input
            id="opposing-phone"
            placeholder="Contact Number / Phone"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opposing-email">Email</Label>
          <Input
            id="opposing-email"
            type="email"
            placeholder="Opposing Council Email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opposing-address">Address</Label>
          <Input
            id="opposing-address"
            placeholder="Oppsing Council Address"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
