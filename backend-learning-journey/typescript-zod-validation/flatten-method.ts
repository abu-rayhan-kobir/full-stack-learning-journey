import {z} from "zod";
const userSchema = z.object({
  username: z.string().nonempty().min(3).max(100),
  email: z.string().email(),
  age: z.number(),
});

const user = {
  username: "",
  email: "aburayhankobir013@gmail.com",
  age: 21,
};

const result = userSchema.safeParse(user);
if (!result.success) {
  console.log(result.error.flatten());
}
