# FaceRecognitionBrain

FaceRecognitionBrain is a full-stack face-detection application that lets users register, sign in, submit an image URL, detect a face in the image, and track how many images they have processed. It was built as a portfolio project to show frontend, backend, database, and third-party API integration skills in one product.

- Frontend repo: [facerecognitionbrain](https://github.com/brandonmay-dev/facerecognitionbrain)
- Backend repo: [facerecognitionbrain-api](https://github.com/brandonmay-dev/facerecognitionbrain-api)
- Live demo: [smart-brain-app-32fac457676f.herokuapp.com](https://smart-brain-app-32fac457676f.herokuapp.com/)
- Live API: [safe-dawn-54877-2bdeb01ab080.herokuapp.com](https://safe-dawn-54877-2bdeb01ab080.herokuapp.com/)

## Why This Project Stands Out

This project goes beyond a UI demo and shows full-stack development across the full request lifecycle:

- Building a responsive React frontend
- Designing and consuming REST APIs
- Implementing authentication flows
- Persisting user data with PostgreSQL
- Integrating a third-party AI service through Clarifai
- Managing deployment-ready environment configuration

## What The App Does

- Lets users register and sign in
- Accepts a public image URL
- Sends the image to the backend for face detection
- Draws a bounding box around the detected face
- Updates and displays the user's image submission count

## Tech Stack

### Frontend

- React 19
- Vite
- JavaScript
- Tachyons
- `particles-bg`
- `react-parallax-tilt`

### Backend

- Node.js
- Express
- PostgreSQL
- Knex
- bcryptjs

### External Service

- Clarifai face-detection model

## How The System Works

1. The frontend collects a user's credentials or image URL.
2. The Express API validates the request and interacts with PostgreSQL when needed.
3. For face detection, the backend sends the image URL to Clarifai.
4. The backend returns Clarifai's response to the frontend.
5. The React app converts normalized coordinates into browser pixel values and overlays the face box.
6. The backend increments the signed-in user's `entries` count in the database.

## API Endpoints

- `POST /register`
- `POST /signin`
- `POST /imageurl`
- `PUT /image`
- `GET /profile/:id`

## Running Locally

### 1. Start the backend

```bash
cd ../facerecognitionbrain_api
npm install
```

Create a `.env` file:

```env
CLARIFAI_PAT=your_clarifai_pat
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=smart-brain
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
PORT=3001
```

Run the API:

```bash
npm run dev
```

### 2. Start the frontend

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

Run the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Build For Production

```bash
npm run build
npm run preview
```

## What This Project Demonstrates

- Full-stack application architecture with clear client/server separation
- Authentication and secure password handling
- Database integration and persistent user state
- Third-party API integration and response transformation
- Translating backend data into dynamic UI visuals
- Environment configuration for local and deployed setups

## Troubleshooting

### `VITE_API_URL` issues

Make sure `VITE_API_URL` points to a running backend server.

### `403 Forbidden`

Make sure the frontend domain is allowed by the backend CORS configuration.

### Sign-in issues

Check the backend logs, database connection, and stored user records.

## Future Improvements

- Add screenshots or a short demo GIF near the top
- Add loading, empty, and error states
- Support multiple face detections per image
- Add automated tests for auth and API flows
- Add database migrations and schema documentation
- Support image upload in addition to image URLs

## About Me

I’m a full-stack developer focused on building real-world applications that integrate APIs, databases, and modern frontend frameworks.

I’m actively seeking junior full-stack, frontend, or software engineering roles.

## Author

Brandon May

## License

MIT
