import z from "zod/v4";

export const Event = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type Event = z.infer<typeof Event>;

export const FetchEventSchema = z.object({
  event: Event,
  organizerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type FetchEventResponse = z.infer<typeof FetchEventSchema>;
