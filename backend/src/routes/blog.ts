import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  verify } from 'hono/jwt';
import { createPost,updatePost } from '@daksh931/project-medium';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>();

// blogRouter.use('/*', async..) here /* means what ever route will be after / (like /createBlog or /update)
// it will check and authenticate the user everytime user hit any route / onward
// middleware
blogRouter.use('/*', async (c, next) => {

    try {
        const authHeader = c.req.header("authorization") || "";
        const response = await verify(authHeader, c.env.JWT_SECRET);
        if (response ) {
            c.set("userId", response.id);
            await next();
        }
    } catch (error) {
        c.status(403);
        return c.json({ message: "You are not logged in" })
    }
});

// create a post
blogRouter.post('/', async (c) => {
    // console.log("wokring")
    const body = await c.req.json();
    const userId = c.get("userId");

    const {success} = createPost.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Invalid Inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: parseInt(userId),       // we will  set authorid from middleware that who is creating this post/blog
            }
        })
        return c.json({
            id: blog.id,
            message: "Course posted Suceessfully"
        })
    } catch (e) {
        c.status(403)
        return c.json({ message: "Invalid" });
    }
})

// update post/blog
blogRouter.put('/', async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
    const body = await c.req.json();
    const {success} = updatePost.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Invalid Inputs"
        })
    }
    const post = await prisma.post.update({
        where: {
            id: body.id,
            authorId: parseInt(userId)
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    c.status(200);
    return c.json({id:post.id});
    } 
    catch (error) {
        return c.status(403);
    }
})

// show all posts/blogs
blogRouter.get('/bulk',async (c)=>{
    // console.log("working")

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    return c.json({
        blogs:blogs
    })
})

// show particluar post based on id 
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try {
        const id = c.req.param("id");
        // console.log(id)
        const blog = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })
        c.status(200);
        return c.json({blog})
    } 
    catch (e) {
        c.status(403)
        return c.json({ message: "Invalid" });
    } 
})


