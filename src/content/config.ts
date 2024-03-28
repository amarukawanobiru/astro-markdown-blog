import { z, defineCollection } from "astro:content";
import tags from "@/data/posts/tags.json";

const tagNames = tags.map((tag) => tag.tagName);

// TODO: 関連記事の項目を追加
const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z
        .string()
        .array()
        .refine((arr) => arr.every((tag) => tagNames.includes(tag)), {
          message: `'@data/posts/tags.json' に存在しないタグが含まれています。`,
        }),
      cover: image(),
      pubDate: z.date(),
      lastModified: z.date().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { posts: postsCollection };
