# 120Block: a new look at street culture

This project is intended for creative people who want to find new acquaintances and monetize their creativity.
With this project people can post directly in the app, share your creativity, and earn $Block tokens!


Look at the [NextJS documentation](https://nextjs.org/docs) and [React documentation](https://nextjs.org/docs) to learn more info about stack and [FSD documentation](https://feature-sliced.design/docs) to learn about architectural methodology.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

## Development Server

Start the development server on `http://localhost:3002`:

```bash
# npm
npm run dev
```

We use [ngrok](https://ngrok.com/) to test the application in Telegram. To do this, you need to [install ngrok](https://ngrok.com/docs/getting-started/) and run the command in the second terminal:
```bash
# nqrok
ngrok http --domain=ant-logical-initially.ngrok-free.app 3002
```

You can create a bot using BotFather or use our test on @DeployServerMiniAppBot


Check out the [deploying documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more information.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Pages

1. Start page (for users who logged into the application for the first time)
2. Feed
3. Profile
4. Settings
5. Add posts
6. FAQ
7. Admin panel (for admins with a special telegram_id)
8. Wallet (in development)
9. Editing user profile (in development)


## Interface Components

– Carousel on start page  
– Menubar   
– React Hook Form for adding posts  
– Accordion     
– Avatar    
– Alerts    
– Switch button for dark mode   
– Modal window for change language

## Status

At the moment, the project is under development. We are testing the MVP version on the 120Block bot called @DeployServerMiniAppBot, which was mentioned earlier.

## Contacts

To contact about the project, you can write to [120Block team support](https://t.me/block_120sup).

## Gratitude

We are grateful to the React and Next teams for the React.js and Next.js frameworks and Telegram team that we used to create this application.
