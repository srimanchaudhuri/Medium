import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlog, updateBlog } from "@srimanchaudhuri/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_PASS:string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || ""
    try {
        const user = await verify(header, c.env.JWT_PASS)
        if(user) {
            c.set("userId", String(user.id))
            await next()
        } else {
          c.status(403)
          return c.json({ error: 'unauthorized' })
        }
    } catch (error) {
        return c.json({
            message: "you are not logged in"
        })
    }
  })

blogRouter.post('/', async (c) => {

    const body = await c.req.json()

    const {success} = createBlog.safeParse(body)
     
    if(!success) {
      c.status(411)
      return c.json({
        message: "Inputs not correct"
      })
    }

    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())

      const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
      })

    return c.json({
        id: blog.id
    })
})
  
blogRouter.put('/', async (c) => {

    const body = await c.req.json()
    const {success} = updateBlog.safeParse(body)
     
    if(!success) {
      c.status(411)
      return c.json({
        message: "Inputs not correct"
      })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
      
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })


    return c.json({
        id: blog.id
    })
})
  

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name:true
                }
            }
        }
    })

    return c.json({
        blogs
    })
    
})

blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id")
    console.log(id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
      
    try {

        const blog = await prisma.post.findFirst({
            where: {
                id: String(id)
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })

    } catch (error) {
        
        return c.json({
            error
        })

    }
})

