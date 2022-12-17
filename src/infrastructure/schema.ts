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

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegistrationSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, { message: "email is required" })
      .email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
        {
          message:
            "Password must include at least one letter, number and special character and be between 6 to 20 characters",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
        {
          message:
            "Password must include at least one letter, number and special character and be between 6 to 20 characters",
        }
      ),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
      return false;
    }
    return true;
  });
