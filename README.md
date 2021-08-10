# Netflix Clone using MERN stack.

This repository contains source code for a Netflix Clone using MERN stack. After learning the fundamentals of each tool, I decided to give myself a challenge and this is the result.

## How to use

Download/Clone the project

-   API

    -   Create a **.env** file in root directory of api folder and add the entries below
        PORT = 'Your port'
        MONGODB_URI = 'Mongo DB connecting strung'
        ACCESS_TOKEN_SECRET = 'Your secret'
        REFRESH_TOKEN_SECRET = 'Your secret'
        ACCESS_TOKEN_EXPIRATION = 3000000ms
        REFRESH_TOKEN_EXPIRATION = 30d
        ACCESS_TOKEN_COOKIE_NAME = 'Cookie name'
        REFRESH_TOKEN_COOKIE_NAME = 'Cookie name'

    -   Run **npm install**
    -   Run **npm run dev** to start project

-   Client
    -   Create API Key from The Movie DB https://www.themoviedb.org/signup
    -   Create **.env.local** file in root directory of client folder and add the entries below
        REACT_APP_THEMOVIEDB_API_KEY = '**API Key from The Movie DB**'
        REACT_APP_THEMOVIEDB_API = 'https://api.themoviedb.org'
        REACT_APP_CINEPLEX_API = 'http://localhost:**PORT NUMBER ABOVE**'
    -   Run **npm install**
    -   Run **npm start** to start project
