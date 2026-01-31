import { z } from 'zod';

import { MemberSchema } from './member.zod';

export const SquadSchema = z.object({
  squadName: z.string(),
  avatar: z.string(),
  content: z.string(),
  homeTown: z.string(),
  secretBase: z.string(),
  members: z.array(MemberSchema),
});

export const SquadsResponseSchema = z.array(SquadSchema);

export type Squad = z.infer<typeof SquadSchema>;
