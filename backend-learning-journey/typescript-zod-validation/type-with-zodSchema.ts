import {z} from "zod";
const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  age: z.number(),
});

type TUser = z.infer<typeof UserSchema>;
const user: TUser = {
  username: "Abu Rayhan Kobir",
  email: "aburayhankobir013@gmail.com",
  age: 21,
};

const result = UserSchema.safeParse(user);
if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}