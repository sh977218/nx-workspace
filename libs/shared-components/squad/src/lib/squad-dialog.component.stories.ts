import type { Meta, StoryObj } from '@storybook/angular';

import { SquadDialog } from './squad-dialog.component';

const meta: Meta<SquadDialog> = {
  component: SquadDialog,
  title: 'SquadDialog'
};
export default meta;

type Story = StoryObj<SquadDialog>;

export const SquadDialogStory: Story = {
  args: {
    data: {
      squad: {
        squadName: 'Lonely Super hero',
        homeTown: 'Lonely City',
        formed: 2025,
        secretBase: 'Lonely tower',
        active: false,
        content:
          'A solitary hero operating independently in Lonely City, bearing the weight of duty without team support.',
        avatar: '',
        members: []
      }
    }
  }
};
