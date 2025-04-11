import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterConfirmDeletionDialog } from "@/components/matters/matterConfirmDeletionDialog";
import { userEvent, within } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import * as matterActions from "@/action-handlers/matters";
import { jest } from "@storybook/jest";
import { mockMatters } from "./mockMatters";

// --- Mock next/navigation ---
// This prevents the "invariant expected app router to be mounted" error
// by providing a stub implementation for useRouter that returns the minimal
// router methods required by your component.

const sampleMatter = mockMatters[0];

const meta: Meta<typeof MatterConfirmDeletionDialog> = {
  title: "Matters/MatterConfirmDeletionDialog",
  component: MatterConfirmDeletionDialog,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatterConfirmDeletionDialog>;

/**
 * OpenDialog:
 * Renders the dialog in an open state without triggering deletion.
 */
export const OpenDialog: Story = {
  args: {
    isOpen: true,
    onOpenChange: action("onOpenChange"),
    matter: sampleMatter,
    onSuccess: action("onSuccess"),
    // redirectToList: false,
  },
};

/**
 * DeletionSuccess:
 * Uses a decorator to spy on a successful deletion.
 * The mocked handleDeleteMatter returns a resolved promise with { error: null }.
 * The play function simulates a click on the "Delete Matter" button.
 */
export const DeletionSuccess: Story = {
  args: {
    isOpen: true,
    onOpenChange: action("onOpenChange"),
    matter: sampleMatter,
    onSuccess: action("onSuccess"),
    // redirectToList: false,
  },
  decorators: [
    (Story) => {
      // Use spyOn to mock a successful deletion response.
      jest
        .spyOn(matterActions, "handleDeleteMatter")
        .mockResolvedValue({ error: null });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", {
      name: /delete matter/i,
    });
    await userEvent.click(confirmButton);
  },
};

/**
 * DeletionFailure:
 * Uses a decorator to spy on a deletion failure.
 * The mocked handleDeleteMatter returns a resolved promise with an error message.
 * The play function simulates a click on the "Delete Matter" button.
 */
export const DeletionFailure: Story = {
  args: {
    isOpen: true,
    onOpenChange: action("onOpenChange"),
    matter: sampleMatter,
    onSuccess: action("onSuccess"),
    // redirectToList: false,
  },
  decorators: [
    (Story) => {
      // Use spyOn to simulate a failure response from handleDeleteMatter.
      jest
        .spyOn(matterActions, "handleDeleteMatter")
        .mockResolvedValue({ error: "Failed to delete matter." });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const confirmButton = await canvas.findByRole("button", {
      name: /delete matter/i,
    });
    await userEvent.click(confirmButton);
  },
};
