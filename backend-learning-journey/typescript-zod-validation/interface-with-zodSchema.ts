import {z} from "zod";

interface IUser {
  username: string;
  email: string;
  age: number;
}

const UserSchema: z.ZodType<IUser> = z.object({
  username: z.string(),
  email: z.string().email(),
  age: z.number(),
});

const user: IUser = {
  username: "Abu Rayhan Kobir",
  email: "aburayhankobir013@gmail.com",
  age: 21,
};

const result = UserSchema.safeParse(user);
console.log(result);