import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    author: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    author: number;
}, {
    title: string;
    content: string;
    author: number;
}>;
export declare const updatePost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreatePost = z.infer<typeof createPost>;
export type UpdatePost = z.infer<typeof updatePost>;
