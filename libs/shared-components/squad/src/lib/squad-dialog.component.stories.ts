import type { Meta, StoryObj } from '@storybook/angular';
import { SquadDialog } from './squad-dialog.component';
import { expect } from 'storybook/test';

const meta: Meta<SquadDialog> = {
  component: SquadDialog,
  title: 'SquadDialog',
};
export default meta;

type Story = StoryObj<SquadDialog>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/squad-dialog/gi)).toBeTruthy();
  },
};
