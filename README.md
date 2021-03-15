# RestTest Bench API Application

## Description

A simple webpage to display data fetched from Bench API

## See it Live!

[Deployed on Netlify](https://resttest-bench-darren-matis-mei.netlify.app)

## Features

- React app error handling via ErrorBoundary
- Modal to display Transaction Details
- Pagination
- Loading spinner while pages are fetched
- Keyboard navigation
- Lazy loading Component for faster initial render
- CSS variables

## To Start

```
yarn
yarn build
```

Open `dist/index.html` in your browser

## To Develop

```
yarn
yarn dev
```

Go to: `localhost:1234` in your browser

## Future Things to Implement

- Modal that allows user to retry when data fetch fails
- React Suspense to fetch data without delaying initial render
- Theme switcher
