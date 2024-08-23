import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {  verify } from 'hono/jwt';


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

    const authHeader = c.req.header("authorization") || "";

    const payload = await verify(authHeader, c.env.JWT_SECRET);
    if (!payload) {
        c.status(403);

        return c.json({ message: "You are not logged in" })
    }
    c.set("userId", payload.id);
    await next();

})

blogRouter.post('/', async (c) => {
    // console.log("wokring")
    const body = await c.req.json();
    const userId = c.get("userId");
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

blogRouter.put('/', async (c) => {

    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    prisma.post.update({
        where: {
            id: body.id,
            authorId: parseInt(userId)
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });


    return c.text("blog")
})

blogRouter.get('/bulk',async (c)=>{
    console.log("working")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const bolgs = await prisma.post.findMany();
    return c.json({
        bolgs:bolgs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    console.log(id)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

     try {
        const blog = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })
        return c.json({
            blog
        })
    } catch (e) {
        c.status(403)
        return c.json({ message: "Invalid" });
    } 
})


