import z from "zod";

export const userSignupInput = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 character long")
      .max(15, "Name should not exceed 15 character"),
    age: z.number(),
    email: z.email(),
    username: z
      .string()
      .min(3, "username should be atleast 3 character long ")
      .max(13, "username should not exceed more than 13 characters"),
    password: z
      .string()
      .min(6, "Password should be at least 6 character long")
      .max(15, "Password shouldn't exceed 15 character"),
    confirmPassword: z
      .string()
      .min(6, "Password should be at least 6 character long")
      .max(15, "Password shouldn't exceed 15 character"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const userLoginInput = z.object({
  email: z.email(),
  username: z
    .string()
    .min(3, "username should be atleast 3 character long ")
    .max(13, "username should not exceed more than 13 characters"),
  password: z
    .string()
    .min(6, "Password should be at least 6 character long")
    .max(15, "Password shouldn't exceed 15 character"),
});


