import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@100xdevs/medium-common'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("*",async (c,next) => {
    const token = c.req.header('Authorization') || '';


    try{
        const user = await verify(token,c.env.JWT_SECRET);
    
        if(user){
            c.set('userId', user.id as string );
            await next()
        }else{
            c.status(403);
            return c.json({error: 'unauthorized'})
        }
    }catch(e){
        c.status(403);
        return c.json({error: 'unauthorized'})
    }
})

blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const authorId = c.get('userId');

    const { success } = createBlogInput.safeParse(body);

    if(!success){
        c.status(400);
        return c.json({error: 'invalid input'})
    }

    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL,
      }
    ).$extends(withAccelerate())

    try{
        
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })
        const res = blog.id;
        return c.json({ res })
    }catch(e){
        c.status(400);
        return c.json({error: 'blog not created some error occured'})
    }
})
  


blogRouter.put('/',async (c) => {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);

    if(!success){
        c.status(400);
        return c.json({error: 'invalid input'})
    }

    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL,
      }
    ).$extends(withAccelerate())

    try{
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.text('updated!')
    }catch(e){
        c.status(400);
        return c.json({error: 'blog not updated some error occured'})
    }
})

blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient(
        {
            datasourceUrl: c.env.DATABASE_URL,
        }
        ).$extends(withAccelerate());
    
    try{
        const blogs = await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            blogs
        })
    }catch(e){
        c.status(400);
        return c.json({error: 'no blogs found'})
    }
})

blogRouter.get('/:id',async (c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL,
      }
    ).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(400);
        return c.json({error: 'blog not found'})
    }

})