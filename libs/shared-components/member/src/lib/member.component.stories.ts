import type { Meta, StoryObj } from '@storybook/angular';
import { MemberComponent } from './member.component';
import { expect } from 'storybook/test';

const meta: Meta<MemberComponent> = {
  component: MemberComponent,
  title: 'MemberComponent',
};
export default meta;

type Story = StoryObj<MemberComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/member/gi)).toBeTruthy();
  },
};
