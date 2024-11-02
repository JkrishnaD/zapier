import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(5),
  password: z.string().min(6),
});

export const SigninSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const ZapCreateSchema = z.object({
  name: z.string().optional(),
  availableTriggerId: z.string(),
  tirggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
