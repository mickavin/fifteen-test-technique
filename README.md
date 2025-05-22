# Fifteen Web Tech Test

Technical test for Web Developer position at <a href="https://fifteen.eu/">Fifteen <img width="16px" src="https://fifteen.eu/favicon-32x32.png"/></a>

## My implementation

Test my implementation for this technical test at this link :

[https://fiftyn.web.app/](https://fiftyn.web.app/)

## Features

Based on [Vitesse Lite](https://github.com/antfu/vitesse-lite), we removed all the opinionated features.
They still can be used wisely, against the developer choice.

We kept the minimal Vite starter with few tree updates, alongside **Vue 3**, **Typescript** and **VueUse**.
We preferred `yarn` over `pnpm`.

## Getting started

Clone this repository and run `yarn`. All the available commands are listed in `package.json` for further development.

## Instructions

### Context

At Fifteen, we develop internal web apps in Vue, used to visualize and manage our bikes, trips, users and interact with our service – via our API – for support, operation, and maintenance purposes. These web apps are used on desktop for support client, developers, and admins and on mobile for technicians on the field. The key tool is a map which aims to display the position and state of our bikes.

### Mission

Your mission is to develop a basic web app on which you fetch and display bikes on a map based on Mapbox. A developer has already started to develop a small POC, but he did not have much time to continue. You need to follow up his work and add some features to it. The developer may have done things questionable, and may have missed some typing issues. You are asked to clean the type errors and challenge the existing code. Then you are asked to add new features. Even if it is in beta, your team wants you to use Vuetify 3 😉. You are also asked to use the composition API only, script setup, and Typescript. You are free to use the CSS preprocessor of your choice. The manager has left you with specific tasks to handle:

### Required tasks

- Install Vuetify 3 beta.
- Write your own styles whenever possible: **do not** use utility class frameworks such as Tailwind, unoCSS, etc.
- Develop a composable to toggle dark theme on the app.
- Fetch bikes from the API and display them on the map. Find a relevant way to display the bike’s state.
- These bikes can be clicked to open more information on a Mapbox popup.
- The popup **content** must be a separate and reusable component. It must have a clean design and present clearly the relevant bike information. The style must be consistent in light and dark themes.
- Add a functionality to Edit the bike data.
- You also develop a feature to Add a new bike.
- Responsivity would be appreciated.

### A step further

Besides adding anything that seems relevant to you, it would be appreciated if you pick some of the following features:

- The app needs a branded loader. Develop and use a loader based on the Fifteen logo (see `assets`).
- Fetch and display the service area from a Mapbox dataset (see [documentation](https://docs.mapbox.com/api/maps/datasets/#list-features)). The username is `benbirota` and the dataset id is `cl1mlwhhr02vl22ljv9gk24mk`.
- Add a feature to Delete bike(s)
- Add pagination, sorting, searching, filtering (see [mockapi.io/docs](https://mockapi.io/docs))

## Mapbox

A Mapbox access token will be sent to you by email. Use it by creating a `.env.local` file (see `.env.sample` file).

## API

We have mocked an API with JSON data using [mockapi.io](https://mockapi.io/).
For development purposes only, you can use `yarn gen` to generate bikes data in _genbikes_ directory.

### Endpoint

The API URL for your test will be **sent to you by email**.
To interact with it, you can use the following methods:
```
GET    /bikes
GET    /bikes/:id
POST   /bikes
PUT    /bikes/:id
DELETE /bikes/:id
```
(see the [documentation](https://mockapi.io/docs)).

### Data models

The simple **bike** data model we retained is:
```ts
serial_number: string,
coordinates: [number, number],
in_order: boolean,
service_status: number,
battery_level: number, // from 0 to 100%
```

And the `service_status` model is an enum:
- `1`: free
- `2`: booked
- `3`: in use

## Discussion

When you finish and deliver the test, we will discuss and challenge:
- The technological choices
- The project architecture and underlying build processes
- The code quality
- The UI/UX choices
- What was missing in the API, what could be improved...
