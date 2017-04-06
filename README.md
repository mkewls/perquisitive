# Perquisitive

_Perquisites Meet Inquisitive: Rewards for the Curious_

This app is being redesigned, but I'm keeping it open as I update and improve it.
The goal is to enhance Twitter and provide a digital tool to tap its streaming
feed to filter by both search term (multiples allowed) and twitter handle (again multiples
allowed). This app then turns hits into real-time notifications via SMS. I'd love
to hear your feedback as I update and improve features!

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

...you should have a running site!

SPECIAL NOTE: I'm testing using Chrome 54. Given CORS safeguards within Chrome/Chromium,
I know that you'll definitely have to disable those guards to successfully make CORS 
queries from localhost to the Twitter API. For Chrome 48 and after, the command is:

```sh
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

Don't forget to re-enable your web-security after testing!

### ToDos

1. Hook into Twilio SMS API
2. Persistent queries/results post-refresh (i.e., user auth/login)
3. Automatic Testing
4. AWS Deployment to perquisitive.com
