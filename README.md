
# RealTimeLocationTrackingApp

Project description: This application is a mobile application that updates the location of users' devices every 5 minutes, sends them to the backend, and checks the internet connection at regular intervals.

## Installation

Follow these steps to run the project on your local machine.

### Prerequisites

- Node.js
- npm
- Expo CLI

### Steps

**Clone the Repository:**

   ```sh
   git clone https://github.com/username/project-name.git
   cd project-name 
   ```

**Install Dependencies:**
   ```sh
npm install
```

**Install Expo CLI (if not already installed):**


```sh
npm install -g expo-cli
```

**Start the Expo Project:**

```sh
expo start
```

**Run the App on Your Device or Emulator:**

-   Download the Expo Go app on your iOS or Android device.
-   Scan the QR code or choose "Run on Android/iOS emulator" to start the app.

### Environment Variables

To run the project locally, create a `.env` file and add the following environment variables with your Firebase configuration:
# .env
```sh
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_APP_ID
```
