# Baddy - Find Your Badminton Buddy!

## About the project

Baddy is a web application that aims to bring badminton players together. It allows users to find teammates based on shared availability, location (with a geographical focus on Vietnam at present), skill level, and more. Users can also chat and invite other players to join them for offline games. This project was also created for me to practice my front-end-focused web development skills.

-   Client repository: **https://github.com/simon-sgn/baddy-client**
-   Server repository: **https://github.com/simon-sgn/baddy-server**

## Live demo

Experience Baddy in action at **https://baddy.vercel.app/**.

**Important note**:
The current client and server repositories have implemented an authentication process, which involves storing a JWT token in a cookie, with the sameSite attribute, and additional protective attributes and security considerations (more details can be found in the related files). However, as this is a personal project with limited deployment resources and experience, some adjustments have been made for the live demonstration. Specifically, in the live demonstration, in the code related to the socket.io connection deployment, the verification of the JWT token stored in cookie has been removed. This means that the live demo does not fully represent the authentication process as described in the current official repositories. Therefore, please use the demo link solely for feature demonstration purposes. Your understanding is greatly appreciated. Thank you!

## Key technologies

-   Client: React, Redux Toolkit, React Router, Socket.io Client, Tailwind CSS, Vite as build tool.

-   Server: Express, Mongoose, MongoDB, Socket.io, Jsonwebtoken, Bcrypt, Google Auth Library

## User stories

### User authentication

-   User registration: As a new user, I want to be able to create an account using my email and password so that I can access the features of the Baddy app.
-   User sign-in: As a registered user, I want to be able to log in to my account using my email and password to use the Baddy app.
-   Google sign-in: As a user, I want to have the option to sign in using my Google account for a quicker and easier sign-in process.
-   Sign-out: As a user, I want to be able to sign out of my account to ensure my personal information is protected.
-   Persistent sign-in: As a user, I want to stay signed in after refreshing the page so I don’t have to enter my credentials every time I need to refresh the page.

### Profile Information

-   Profile viewing: As a user, I want to be able to view my profile, including my display name, email, availability, location, skill level, and goals, so that I can review and manage my personal information and preferences.
-   Profile editing: As a user, I want to be able to edit my profile, including my availability, location, skill level, and goals, so that I can update my personal information and preferences as they change.
-   Player profile viewing: As a user, I want to be able to view other players’ profiles, including their names, availability, location, skill level, and goals, so that I can learn more about potential teammates.

### Player search

-   Player search: As a user, I want to be able to search for other badminton players based on shared availability, location, skill level, and goals so that I can find potential teammates.
-   Availability selection: As a user, I want to be able to select the availability (time slots in a week) for playing badminton so that I can find other players whose schedules match with mine.
-   Location selection: As a user, I want to be able to select the locations so that I can find other players in my preferred areas.
-   Level selection: As a user, I want to be able to select the skill levels so that I can find other players who match my preferences.
-   Goal selection: As a user, I want to be able to select the playing goals so that I can find other players with suitable goals.

### Search Results

-   Search results viewing: As a user, I want to be able to view the search results based on my search criteria so that I can browse and find potential teammates.
-   Player details in search results: As a user, I want to see brief information about each player in the search results, including their name, location, level, and goals, so that I can decide if I want to view their full profile or initiate a chat to know them further.
-   Player profile access from search results: As a user, I want to access a player’s full profile directly from the search results, so I can view their details.

### Chat Functionality

-   Chat initiation: As a user, I want to be able to initiate a chat with another player from their profile page, so that I can communicate with them directly to discuss further.
-   Chat history viewing/Message display: As a user, I want to be able to see all the chat history (with detailed timestamp of each message) between me and another user so that I can view previous messages in my conversations.
-   Message sending: As a user, I want to be able to send messages to other players so that I can communicate with them directly.
-   Real-time messaging: As a user, I want to be able to send and receive messages in real-time so that I can have live conversations with other players.
-   Inbox viewing: As a user, I want to be able to view my inbox, which includes a list of players I have chatted with, so that I can easily navigate between different conversations.
-   Chronological inbox: As a user, I want my inbox to display chats in order of recent activity, so I can easily continue my most recent conversations, keeping my communication efficient and timely.
-   Online status checking: As a user, I want to be able to see the online status of other players in my inbox so that I know if they are currently available to chat.
-   Last message and timestamp checking: As a user, I want to be able to see the last message and its timestamp of the players in my inbox list so that I have a general idea about the conversations between me and other players before selecting a player to see all the messages
-   Player selection in chat: As a user, I want to be able to select a player from my inbox to view our chat history and send new messages.
-   Chat navigation: As a user, I want to easily navigate back to my inbox from a chat on mobile screens, so I can switch between different conversations.
-   Player profile access: As a user, I want to access a player’s profile directly from our chat, so I can view their details without having to search for them.

## Installation

### Client:

1. Clone **[the client repository](https://github.com/simon-sgn/baddy)** to your local machine.
2. Obtain a Google Client ID by following the steps described on the **[Setup page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)** of the Google Identity Platform documentation.
3. Create a `.env.local` file and add the following lines:

    ```
    VITE_APP_API_URL="http://localhost:3000" # The URL where your server is running
    VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID" # The Google Client ID you obtained in step 2
    VITE_PORT="5173" # The port where your client will be running
    ```

4. Install the necessary dependencies with `npm install`.
5. Run `npm run dev`.

### Server:

1. Clone **[the server repository](https://github.com/simon-sgn/baddy-server)** to your local machine
2. Obtain a MongoDB URI by creating a MongoDB Atlas account and setting up a cluster. You can follow the instructions after signing up on **[MongoDB Atlas](https://www.mongodb.com/atlas)**. At present, the application's location picking feature is built in a way that has a geographical focus on Vietnam, with province-city structure. Please use the `provinces.json` and `districts.json` from the server repository to import the data into 2 collections on your MongoDB to get the location data.
3. Create a `.env` file and add the following lines:

    ```
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID" # The Google Client ID you obtained earlier
    MONGO_URI="YOUR_MONGO_URI" # The MongoDB URI you obtained in step 2
    JWT_SECRET_KEY="YOUR_JWT_SECRET_KEY"  # A secret key of your choice for signing JSON Web Tokens
    ```

4. Install the necessary dependencies with `npm install`.
5. Run `npm start`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Contact

If you have any questions or suggestions, please feel free to contact me at simonnguyen.sgn@gmail.com. Also, feel free to connect with me on [Linkedin](https://www.linkedin.com/in/thien-nguyen-sgn).
