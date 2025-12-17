import z from "zod";

const RequestTypeEnum = z.enum([
  "DECLARATION",
  "REVIEW",
  "MINI_PAUTA",
  "OTHER",
]);

export const RequestSchema = z.object({
  studentName: z.string().nonempty({ message: "Nome é obrigatório" }),
  studentEnrollment: z.string().nonempty({ message: "Matrícula é obrigatória" }),
  studentClass: z.coerce.number({
    error: "Turma é obrigatória",
  }).int("Turma deve ser um número inteiro"),
  academicYear: z.string().nonempty({ message: "Ano acadêmico é obrigatório" }),
  curricularYear: z.coerce.number({
    error: "Ano curricular é obrigatório",
  }).int("Ano curricular deve ser um número inteiro"),
  course: z.string().nonempty({ message: "Curso é obrigatório" }),
  type: RequestTypeEnum,
  details: z.string().nonempty({ message: "Detalhes são obrigatórios" }),
});

export type RequestFormData = z.infer<typeof RequestSchema>;