import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from '@100xdevs/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRouter.post('/signup',async (c) => {
    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL,
      }
    ).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const { success } = signupInput.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({error: 'invalid input'})
    }

    try{
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password,
          name : body.name || ""
        },
      });
  
      const token = await sign({ id: user.id },c.env.JWT_SECRET);
    
      

      return c.json({
        token
      })
    }catch(e){
      c.status(400);
      console.log(e)
      return c.json({error: e})
    }
  
  
  })
  
 userRouter.post('/signin',async (c) => {
    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL,
      }
    ).$extends(withAccelerate());
  
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({error: 'invalid input'})
    }
  
    try{
  
      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
          password: body.password
        },
      });
    
      if(!user){
        c.status(403);
        return c.json({error: 'invalid credentials'})
      }
    
      const token = await sign({ id: user.id },c.env.JWT_SECRET);
    
      return c.text(token)

    }catch(e){

      c.status(400);
      return c.json({error: 'user already exists'})

    }
    
  })