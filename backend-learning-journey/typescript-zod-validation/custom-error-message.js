import { z } from "zod";
const userSchema = z.object({
    username: z
        .string()
        .min(3, {
        message: "Username must be minimum 3 characters"
    })
        .max(20, {
        message: "Username cannot exceed 20 characters"
    })
        .trim(),
    email: z
        .string()
        .email({
        message: "Please provide a valid email address",
    }),
    password: z
        .string()
        .min(8, {
        message: "Password must be at least 8 characters",
    }),
});
const user = {
    username: "Abu Rayhan Kobir",
    email: "aburayhankobir013@gmail.com",
    password: "Ark013@"
};
const result = await userSchema.safeParseAsync(user);
if (!result.success) {
    console.log(result.error.flatten());
}
