import { z } from "zod";
const UserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    age: z.number(),
});
const user = {
    username: "Abu Rayhan Kobir",
    email: "aburayhankobir013@gmail.com",
    age: "21",
};
const result = UserSchema.safeParse(user);
if (result.success) {
    console.log(result.data);
}
if (!result.success) {
    console.log(result.error);
}
