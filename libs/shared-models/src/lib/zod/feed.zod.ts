import { z } from 'zod';

const ItemSchema = z.object({
  title: z.string(),
  link: z.string(),
  guid: z.object({
    _: z.string(),
    $: z.object({
      isPermaLink: z.string(),
    }),
  }),
  pubDate: z.string().optional(),
  'media:group': z.object({
    'media:content': z.array(
      z.object({
        $: z.object({
          medium: z.string(),
          url: z.string(),
          height: z.string(),
          width: z.string(),
          type: z.string(),
        }),
      }),
    ),
  }),
});

export const ChannelSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  image: z.object({
    url: z.string(),
    title: z.string(),
    link: z.string(),
  }),
  generator: z.string(),
  lastBuildDate: z.string(),
  pubDate: z.string(),
  copyright: z.string(),
  language: z.string(),
  ttl: z.string(),
  item: z.array(ItemSchema),
});

export const RssSchema = z.object({
  rss: z.object({
    $: z.object({
      'xmlns:dc': z.string(),
      'xmlns:content': z.string(),
      'xmlns:atom': z.string(),
      version: z.string(),
      'xmlns:media': z.string(),
    }),
    channel: ChannelSchema,
  }),
});

export type Rss = z.infer<typeof RssSchema>;
export type Item = z.infer<typeof ItemSchema>;
