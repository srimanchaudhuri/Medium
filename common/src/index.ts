import z, { TypeOf } from 'zod'

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

export type signinInput = z.infer<typeof signinInput>

export const createBlog = z.object({
    title: z.string(),
    content: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlog>

export const updateBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlog>