import { MemberResponseSchema, MemberSchema } from './member.zod';

describe('MemberSchema', () => {
  const validMember = {
    name: 'John Doe',
    avatar: 'http://example.com/avatar.png',
    content: 'A hero',
    age: 30,
    secretIdentity: 'JD',
    powers: ['flying', 'strength'],
  };

  it('parses a valid member object', () => {
    const result = MemberSchema.safeParse(validMember);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validMember);
    }
  });

  it('rejects when a required field is missing', () => {
    // remove `name`
    const invalid = { ...validMember };
    // delete in two steps to avoid readonly complaints
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete invalid.name;

    const result = MemberSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('name'))).toBe(
        true,
      );
    }
  });

  it('rejects when a field has wrong type', () => {
    // age should be number
    const invalid = { ...validMember, age: 'thirty' };
    const result = MemberSchema.safeParse(invalid as unknown);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('age'))).toBe(
        true,
      );
    }
  });

  it('rejects when powers is not an array of strings', () => {
    const invalid = { ...validMember, powers: [1, 2] };
    const result = MemberSchema.safeParse(invalid as unknown);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('powers'))).toBe(
        true,
      );
    }
  });
});

describe('MemberResponseSchema', () => {
  const validList = [
    {
      name: 'Jane',
      avatar: 'http://example.com/a.png',
      content: 'Another hero',
      age: 25,
      secretIdentity: 'JJ',
      powers: ['invisibility'],
    },
  ];

  it('parses an array of members', () => {
    const result = MemberResponseSchema.safeParse(validList);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(1);
    }
  });

  it('rejects when one of the items is invalid', () => {
    // clone and corrupt one item
    const invalid = [{ ...validList[0], age: '25' }];
    const result = MemberResponseSchema.safeParse(invalid as unknown);
    expect(result.success).toBe(false);
    if (!result.success) {
      // error path should indicate index 0 and age
      expect(
        result.error.issues.some(
          (i) => i.path[0] === 0 && i.path.includes('age'),
        ),
      ).toBe(true);
    }
  });
});
