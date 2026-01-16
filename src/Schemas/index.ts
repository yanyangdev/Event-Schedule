import z from "zod/v4";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export type LoginActionState =
  | {
      success: true;
      user: User;
      token: string;
      error?: undefined;
    }
  | {
      success: false;
      user?: undefined;
      token?: undefined;
      error: string;
    };

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type Event = z.infer<typeof EventSchema>;

export const FetchEventSchema = z.object({
  ...EventSchema.shape,
  organizerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type FetchEventResponse = z.infer<typeof FetchEventSchema>;

export const FetchEventsSchema = z.array(FetchEventSchema);
