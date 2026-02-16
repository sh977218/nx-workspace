import type { Meta, StoryObj } from '@storybook/angular';
import { MemberDialog } from './member.dialog';
import { expect } from 'storybook/test';

const meta: Meta<MemberDialog> = {
  component: MemberDialog,
  title: 'MemberDialog',
};
export default meta;

type Story = StoryObj<MemberDialog>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/member.dialog/gi)).toBeTruthy();
  },
};
