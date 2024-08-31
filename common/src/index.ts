import z from "zod";

export const signupInput = z.object({
    email:z.string().email(),
    name:z.string().min(3),
    password : z.string().min(6),
    
})

export const signInInput = z.object({
    email:z.string().email(),
    password : z.string().min(6),

})

export const createPost = z.object({
    title: z.string().min(3),
    content : z.string().min(10),
    author : z.number()

})

export const updatePost = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    id: z.string()
})
// type inference in zod
// now to this infer type can be accesible to frontend also 
// we are not using mono repo so in pre-mono repo days have to create common folder and deploy on npm as package
// so that both frontend and backend can use this common folder which is deployed.
export type SignupInput = z.infer<typeof signupInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreatePost = z.infer<typeof createPost>;
export type UpdatePost = z.infer<typeof updatePost>;
// https://github.com/chandanck22/vibranthive