import type { Meta, StoryObj } from '@storybook/angular';

import { MemberDialog } from './member.dialog';

const meta: Meta<MemberDialog> = {
  component: MemberDialog,
  title: 'MemberDialog',
};
export default meta;

type Story = StoryObj<MemberDialog>;

export const MemberDialogStory: Story = {
  args: {
    data: {
      member: {
        name: 'Starlight',
        age: 31,
        secretIdentity: 'Yuki Tanaka',
        content:
          "A celestial warrior wielding stellar energy and defensive barriers, serving as the team's protective beacon in cosmic battles.",
        avatar:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI0ZGRDEwMCIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNDUiIHI9IjMwIiBmaWxsPSIjRkZGIi8+PHBvbHlnb24gcG9pbnRzPSI3NSw2MCAxMDAsOTAgNzUsOTUgNTAsOTAiIGZpbGw9IiNGRkQxMDAiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
        powers: ['Energy manipulation', 'Flight', 'Force field generation'],
      },
    },
  },
};
