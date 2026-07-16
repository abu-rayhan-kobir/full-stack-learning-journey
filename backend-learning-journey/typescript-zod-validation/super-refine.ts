import {z} from "zod";
const userSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).superRefine((data, ctx) => {
  const {password, confirmPassword} = data;
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password don't match!",
      path:["confirmPassword"],
    });
  }
});

const user = {
  password: "Ark013@!!!",
  confirmPassword: "Ark013@!!",
};

const result = await userSchema.safeParseAsync(user);
if (!result.success) {
  console.log(result.error.flatten());
}