import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { signupInput, signInInput } from '@daksh931/project-medium'
import { comparepass, hashpass } from '../hashing/PasswordHash'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
}>();

// userRouter.get('/', (c) => {
//   return c.text('Hello Hono!') 
// })

//sign up router api----------
userRouter.post('/signup', async (c) => {
  // db conn
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const body = await c.req.json();
  //zod validation
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }

  //create user and save
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (findUser) {
      c.status(411);
      return c.json({
        message: "User already exist"
      })
    }
    const userHashPass = await hashpass(body.password);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: userHashPass,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token
    })

  } catch (e) {
    return c.status(403);
  }

  // return c.text("signup")
})


//signin Router
userRouter.post('/login', async (c) => {
  const body = await c.req.json();
  const sucess = signInInput.safeParse(body);
  if (!sucess) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs"
    })
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found!" });
    }

    //check pass
    const checkUser = await comparepass(body.password, user.password);
    if (!checkUser) {
      c.status(403);
      c.json({
        message: "Invalid Password"
      })
    }

    //const {password , ...rest} = user; 
    // from above line we have password and rest of user obj values and by returning 'rest' we able to
    //  send all Obj values except pass to frontend... 
    const { password, ...rest } = user;
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
      user: rest
    })
  }
  catch (e) {
    c.status(411);
    return c.text("invalid");
  }
})


export default userRouter;
