import type { Meta, StoryObj } from '@storybook/angular';
import { SquadComponent } from './squad.component';
import { expect } from 'storybook/test';

const meta: Meta<SquadComponent> = {
  component: SquadComponent,
  title: 'SquadComponent',
};
export default meta;

type Story = StoryObj<SquadComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/squad/gi)).toBeTruthy();
  },
};
