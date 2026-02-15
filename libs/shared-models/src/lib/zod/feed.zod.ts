import { z } from 'zod';

const $Schema = z.object({
  $: z.string(),
  channel: z.string()
});

const ItemSchema = z.object({
  title: z.string(),
  link: z.string(),
  guid: z.string(),
  pubDate: z.string(),
  'media:group': z.object({
    'media:content': z.array(
      z.object({
        $: z.object({
          medium: z.string(),
          url: z.string(),
          height: z.string(),
          width: z.string(),
          type: z.string()
        })
      })
    )
  })
});

export const ChannelSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  image: z.object({
    url: z.string(),
    title: z.string(),
    link: z.string()
  }),
  generator: z.string(),
  lastBuildDate: z.string(),
  pubDate: z.string(),
  copyright: z.string(),
  language: z.string(),
  ttl: z.string(),
  item: z.array(ItemSchema)
});

export const RssSchema = z.object({
  $: z.object($Schema),
  channel: z.object(ChannelSchema)
});

export type Rss = z.infer<typeof RssSchema>;
export type Item = z.infer<typeof ItemSchema>;
