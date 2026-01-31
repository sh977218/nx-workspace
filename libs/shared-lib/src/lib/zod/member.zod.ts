import { z } from 'zod';

export const MemberSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  content: z.string(),
  age: z.number(),
  secretIdentity: z.string(),
  powers: z.array(z.string()),
});

export const MemberResponseSchema = z.array(MemberSchema);

export type Member = z.infer<typeof MemberSchema>;
