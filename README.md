ceubexpress - is a full marketplace built with React, NextJS, Stripe and connected to a NestJS API with Axios.

## Features

- **Authentication:** The application talks to an external API developed in NestJS and authenticate its users via JWT tokens. Rolesets are also enabled for admin users to have access to the dashboard
- **Management:** Full dasboard allows for easy access to a product and user CRUD and basic analytics
- **Shopping:** Users can add products to their list or cart and check-out with Stripe. Payments are updated with webhooks

Minor features such as a CDN, captcha challenges, debounce with Lodash for product search were also implemented to the project.

![user view](https://github.com/vitorhw/nextjs-portfolio/blob/main/public/projects/ceubexpress/screenshot1.png?raw=true)
![user view](https://github.com/vitorhw/nextjs-portfolio/blob/main/public/projects/ceubexpress/screenshot2.png?raw=true)
![user view](https://github.com/vitorhw/nextjs-portfolio/blob/main/public/projects/ceubexpress/screenshot3.png?raw=true)

## Built with

- [NextJS](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Stripe](https://stripe.com/)
- [Chakra UI](https://chakra-ui.com/)
- Deployed on [Vercel](https://vercel.com/)

## Running the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## License

This project is under the MIT License.
