import type { Meta, StoryObj } from '@storybook/angular';

import { SquadComponent } from './squad.component';

const meta: Meta<SquadComponent> = {
  component: SquadComponent,
  title: 'SquadComponent',
} satisfies Meta<typeof SquadComponent>;
export default meta;

type Story = StoryObj<SquadComponent>;

export const SquadStory: Story = {
  args: {
    squad: {
      squadName: 'Lonely Super hero',
      homeTown: 'Lonely City',
      formed: 2025,
      secretBase: 'Lonely tower',
      active: false,
      content:
        'A solitary hero operating independently in Lonely City, bearing the weight of duty without team support.',
      avatar: '',
      members: [],
    },
  },
};
