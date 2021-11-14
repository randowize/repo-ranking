This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

## What has been completed

- [x] The application must be built using React
- [x] search repositories by keyword and other query parameters using the github rest api
- [x] Redux(with redux toolkit) integration
- [x] sort result by stars, forks, last updated
- [x] pagination implemented for table
- [x] persist application state between user sessions
- [x] Mix of CSS Modules + styled-components for styling
- [x] Responsiveness of the app
- [x] Implemented in typescript
- [x] Some basic design
- [x] deploy online using Netlify -> [link](https://determined-albattani-4dad86.netlify.app/)
- [ ] Testing
- [ ] Authentication

## Project Structure

- /src
  - components (reusable components of the application)
  - core (core functionalities)
  - features( app feature/ container components)
  - services(external services such github api)
  - store (app's main redux store)
  - utils (utility function)

## Summary of Technologies used

- NextJs
- React/ React Hooks
- Redux/Redux Toolkit/React Redux
- Redux-Persist to save redux state between user sessions
- date-fns
- Typescript
- Octokit for github rest api integration
- Styled Component
- React Table + Material UI Table
