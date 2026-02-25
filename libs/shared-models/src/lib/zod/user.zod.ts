import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  status: z.string(),
});
export const UsersResponseSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
