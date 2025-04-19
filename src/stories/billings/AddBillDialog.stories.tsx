import type { Meta, StoryObj } from "@storybook/react"
import { userEvent } from "@storybook/test"
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog"
import { mockMatters } from "./mockDataForSB"
import { Toaster } from 'sonner';

const meta: Meta<typeof BillingsAddDialog> = {
  title: "Billings/AddBillDialog",
  component: BillingsAddDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof BillingsAddDialog>

export const GlobalAddBillForm: Story = {
  args: {
    open: true,
    matters: mockMatters,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  render: (args) => (
    <>
      <BillingsAddDialog {...args} />
      <Toaster position="top-right" richColors />
    </>
  ),
}

export const MatterBillingAddBillForm: Story = {
  args: {
    open: true,
    matters: mockMatters,
    matterBillingMatterId: "2",
    disableMatterColumn: true,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  render: (args) => (
    <>
      <BillingsAddDialog {...args} />
      <Toaster position="top-right" richColors />
    </>
  ),
}

export const AddBillFormPlay: Story = {
  args: {
    open: true,
    matters: mockMatters,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  render: (args) => (
    <>
      <BillingsAddDialog {...args} />
      <Toaster position="top-right" richColors />
    </>
  ),
  play: async ({ step }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Select a matter", async () => {
      const selectMatter =
      document.querySelector("#matter") ||
      document.querySelector('[id="matter"]')

      if (selectMatter) {
        await userEvent.keyboard("{Enter}", { delay: 100 })
        await userEvent.keyboard("{ArrowDown}{Enter}", { delay: 300 })
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Enter bill name", async () => {
      const nameInput =
        document.querySelector('input[id="name"]') ||
        document.querySelector('input[placeholder="Enter bill name"]')

      if (nameInput) {
        await userEvent.keyboard("Example Bill", { delay: 100 })
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Enter amount", async () => {
      const amountInput =
        document.querySelector('input[id="amount"]') ||
        document.querySelector('input[placeholder="Enter amount"]')

      if (amountInput) {
        await userEvent.keyboard("2700", { delay: 100 })
        await userEvent.tab()
        await userEvent.tab()
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Select status", async () => {
      const selectStatus =
      document.querySelector("#status") ||
      document.querySelector('[id="status"]')

      if (selectStatus) {
        await userEvent.keyboard("{Enter}", { delay: 100 })
        await userEvent.keyboard("{ArrowUp}{ArrowUp}{Enter}", { delay: 300 })
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Add remarks", async () => {
      const remarksInput =
        document.querySelector('textarea[id="remarks"]') ||
        document.querySelector('textarea[placeholder="(optional)"]')

      if (remarksInput) {
        await userEvent.keyboard("Example remarks for this bill.{Enter}This can be any length; it's also optional and can be left blank.", { delay: 100 })
        await userEvent.tab()
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Click save button", async () => {
      const clickSave = document.querySelector('button[id="saveBtn"]')

      if (clickSave) {
        await userEvent.click(clickSave)
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }

}


export const MatterBillingAddBillFormPlay: Story = {
  args: {
    open: true,
    matters: mockMatters,
    matterBillingMatterId: "1",
    disableMatterColumn: true,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  render: (args) => (
    <>
      <BillingsAddDialog {...args} />
      <Toaster position="top-right" richColors />
    </>
  ),
  play: async ({ step }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Enter bill name", async () => {
      const nameInput =
        document.querySelector('input[id="name"]') ||
        document.querySelector('input[placeholder="Enter bill name"]')

      if (nameInput) {
        await userEvent.keyboard("Example bill for Matter billings", { delay: 100 })
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Enter amount", async () => {
      const amountInput =
        document.querySelector('input[id="amount"]') ||
        document.querySelector('input[placeholder="Enter amount"]')

      if (amountInput) {
        await userEvent.keyboard("5673", { delay: 100 })
        await userEvent.tab()
        await userEvent.tab()
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Select status", async () => {
      const selectStatus =
      document.querySelector("#status") ||
      document.querySelector('[id="status"]')

      if (selectStatus) {
        await userEvent.keyboard("{Enter}", { delay: 100 })
        await userEvent.keyboard("{Enter}", { delay: 100 })
        await userEvent.tab()
        await userEvent.tab()
        await userEvent.tab()
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Click save button", async () => {
      const clickSave = document.querySelector('button[id="saveBtn"]')

      if (clickSave) {
        await userEvent.click(clickSave)
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }

}