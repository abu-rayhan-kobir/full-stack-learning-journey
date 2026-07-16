import { z } from "zod";
const UserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    age: z.number(),
});
const user = {
    username: "Abu Rayhan Kobir",
    email: "aburayhankobir013@gmail.com",
    age: 21,
};
const result = UserSchema.safeParse(user);
console.log(result);
