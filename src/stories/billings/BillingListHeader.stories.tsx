import type { Meta, StoryObj } from "@storybook/react"
import { BillingsListHeader } from "@/components/billings/billingsListHeader"
import { mockMatters } from "./mockDataForSB"

const meta: Meta<typeof BillingsListHeader> = {
  title: "Billings/ListHeader",
  component: BillingsListHeader,
}

export default meta
type Story = StoryObj<typeof BillingsListHeader>

export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded">
      <BillingsListHeader
        statusFilter="all"
        onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
        onNewBill={() => console.log("New bill button clicked")}
        matters={mockMatters}
        selectedMatterId="all"
        onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
      />
    </div>
  ),
}

export const Active: Story = {
  render: () => (
    <div className="p-4 border rounded">
      <BillingsListHeader
        statusFilter="active"
        onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
        onNewBill={() => console.log("New bill button clicked")}
        matters={mockMatters}
        selectedMatterId="all"
        onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
      />
    </div>
  ),
}

export const Paid: Story = {
  render: () => (
    <div className="p-4 border rounded">
      <BillingsListHeader
        statusFilter="paid"
        onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
        onNewBill={() => console.log("New bill button clicked")}
        matters={mockMatters}
        selectedMatterId="all"
        onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
      />
    </div>
  ),
}

export const Pending: Story = {
  render: () => (
    <div className="p-4 border rounded">
      <BillingsListHeader
        statusFilter="pending"
        onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
        onNewBill={() => console.log("New bill button clicked")}
        matters={mockMatters}
        selectedMatterId="all"
        onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
      />
    </div>
  ),
}

export const Overdue: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="overdue"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="all"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
        />
      </div>
    ),
}
  

export const MatterBillingsDefault: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="all"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="all"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
          hideMatterFilter={true}
        />
      </div>
    ),
}

export const MatterBillingsActive: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="active"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="all"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
          hideMatterFilter={true}
        />
      </div>
    ),
}

export const MatterBillingsPaid: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="paid"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="all"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
          hideMatterFilter={true}
        />
      </div>
    ),
}

export const MatterBillingsPending: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="pending"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="all"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
          hideMatterFilter={true}
        />
      </div>
    ),
}

export const MatterBillingsOverdue: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="overdue"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="all"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
          hideMatterFilter={true}
        />
      </div>
    ),
}

export const WithFilteredByMatter: Story = {
    render: () => (
      <div className="p-4 border rounded">
        <BillingsListHeader
          statusFilter="all"
          onStatusFilterChange={(filter) => console.log("Status filter changed:", filter)}
          onNewBill={() => console.log("New bill button clicked")}
          matters={mockMatters}
          selectedMatterId="3"
          onMatterFilterChange={(matterId) => console.log("Matter filter changed:", matterId)}
        />
      </div>
    ),
}
