import { z } from "zod";

export const AddCompanySchema = z.object({
  name: z.string().trim().min(1).max(50),
  logo_buffer: z.string().base64().min(10),
});

export type AddCompany = z.infer<typeof AddCompanySchema>;
