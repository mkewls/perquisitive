# Steps

_Perquisites Meet Inquisitive: Rewards for the Curious_

This app is being redesigned, but I'm leaving the shell here to get a sense
of it's intent and, of course, to receive feedback and/or help in improving it.
The goal is to enhance Twitter and provide a digital tool to tap its streaming
feed to filter by both search term (multiples allowed) and twitter handle (again multiples
allowed). This app then turns hits into real-time notifications via SMS.

Although use cases are varied, a primary motivation is to help market watchers
and players get ahead of the curve when a pre-defined event occurs, whether that
be a geopolitical event or a company-specific event.

Please feel free to flag issues here or email me at mw [at] mikewill.net. Thanks!

## Running Locally

### Prerequisites
- Node (>6.7) and npm
- PostgreSQL

### Installing dependencies

```sh
npm install
```

This will install all runtime dependencies, as well as Webpack build


### Running the app

In development mode, build a Webpack bundle with...

```sh
npm run build-watch
```

...then start your server with...

```sh
npm start
```

...you should have a running site to modify, as desired.
