![NextJs Sent It. Web App](https://i.ibb.co/JkbMSKL/localhost-3000-i-Pad-Mini-2.png 'Next Js Sent It. Webb App')

# Sentit

Sentit is an experimental [Nextjs](https://nextjs.org/) 13 project with [typescript](https://www.typescriptlang.org/), [tailwindcss](https://tailwindcss.com/), [prisma](https://www.prisma.io/), [nextAuth](https://next-auth.js.org/) and a simple postgres db deployed on [railway](https://railway.app/) in order to test basic CRUD operations with the new way of working with NextJs 13 and the app directory.

# Demo

You can test the app [here](https://sentit.vercel.app/)

## Getting Started

If you want to fork this project you will need to setup your own env with the following keys

- Your DATABASE_URL (mine is on railway). This one goes directly in the .env generated automatically by prisma
- Your GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and AUTH_SECRET for NextAuth. These, you need to get from Google Cloud Console after setting up your project there. Use an .env.local file

So, now to run the project. Just fire the development server with your package manager of choice

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
