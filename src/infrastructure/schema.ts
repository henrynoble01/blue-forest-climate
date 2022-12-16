import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .max(100, { message: "status should not be more than 100 characters" })
    .min(1, { message: "Title is required" }),
  shortDescription: z.string().max(300, {
    message: "shortDescription should not be longer than 300 characters",
  }),
  estimatedReadingTime: z
    .number()
    .nonnegative({ message: "cannot be a negative number" })
    .min(1, "Estimated Reading time should be above 1"),
  status: z.union([z.literal("PRIVATE"), z.literal("PUBLISHED")]),
  content: z.string(),
  tags: z.array(z.string()),
  postId: z.string().uuid().optional(),
});

export type IPost = z.infer<typeof PostSchema>;

export const TagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type ITag = z.infer<typeof TagSchema>;
