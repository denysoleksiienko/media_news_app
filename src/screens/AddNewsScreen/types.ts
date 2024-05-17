import { z, ZodType } from 'zod'; // Add new import

export type AddNewsForm = {
  title: string;
  imgUrl?: string;
  link?: string;
  message: string;
};

export const AddNewsSchema: ZodType<AddNewsForm> = z.object({
  title: z.string().min(5, { message: 'Title is required' }),
  imgUrl: z
    .string()
    .url()
    .includes('http', { message: 'Invalid URL' })
    .optional(),
  link: z
    .string()
    .url()
    .includes('http', { message: 'Invalid URL' })
    .optional(),
  message: z.string().min(10, { message: 'Message is required' }),
});
