import { z } from "zod";

export const createRegistrationFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().nonempty(t("form-errors.required")),
  role: z.string().nonempty(t("form-errors.required")),
  phone: z.string().nonempty(t("form-errors.required")),
  email: z.string().email(t("form-errors.invalidEmail")),
  message: z.string(),
  terms: z.boolean().refine((data) => data, t("form-errors.invalidTerms")),
});

export type RegistrationFormSchema = z.infer<ReturnType<typeof createRegistrationFormSchema>>;
