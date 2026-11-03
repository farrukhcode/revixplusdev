import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please add your name").max(120),
  email: z.string().email("Please add a valid email").max(200),
  company: z.string().max(160).optional(),
  phone: z.string().max(40).optional(),
  topic: z.string().max(80).optional(),
  budget: z.string().max(40).optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)").max(4000),
  page: z.string().max(300).optional(),
  // Honeypot: real users never fill this
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
