# Smart Brain

Smart Brain is a full-stack AI face detection application that lets users register, sign in, submit image URLs, detect faces, and track their image submission count.

The app demonstrates a complete full-stack request flow: React frontend, Express API, PostgreSQL database, secure password handling, server-side Clarifai integration, and dynamic face box rendering in the browser.

- 👉 **Frontend Repo:** [smart-brain](https://github.com/brandonmay-dev/smart-brain)
- 👉 **Backend API:** [smart-brain-api](https://github.com/brandonmay-dev/smart-brain-api)
- 👉 **Live Demo:** [smartbrain.brandonmay.dev](https://smartbrain.brandonmay.dev/)

---

## Walkthrough

Watch the project walkthrough:

[![Smart Brain Walkthrough Thumbnail](./demo/Smart_Brain_Walkthrough_Thumbnail.png)](https://youtu.be/QchHpavFO8w)

---

## Why This Project Stands Out

Smart Brain is more than a UI-only demo. It shows how a frontend, backend, database, and third-party AI service work together in one application.

This project demonstrates:

- Building a responsive React frontend
- Designing and consuming RESTful API endpoints
- Implementing user registration and sign-in flows
- Hashing passwords securely on the backend
- Persisting user data with PostgreSQL
- Sending protected server-side requests to Clarifai
- Translating AI response data into visual UI output
- Managing environment configuration for local and deployed setups

---

## Key Highlights

- Full-stack authentication flow
- PostgreSQL-backed user persistence
- Server-side Clarifai API integration
- Real-time face box rendering on submitted images
- User-specific image submission tracking
- Separate frontend and backend repositories
- Environment-based deployment configuration

---

## What The App Does

- Allows users to register and sign in
- Accepts a public image URL from the user
- Sends the image URL to the backend for processing
- Uses Clarifai’s face detection model to analyze the image
- Renders a bounding box around the detected face
- Updates and displays the user’s image submission count

---

## Tech Stack

### Frontend

- **React 19** – component-based UI development
- **Vite** – fast development server and optimized builds
- **JavaScript ES6+**
- **Tachyons** – utility-first CSS styling
- **particles-bg** – animated background effects
- **react-parallax-tilt** – interactive UI enhancement

### Backend

- **Node.js** – JavaScript runtime
- **Express** – REST API routing and server logic
- **PostgreSQL** – relational database for user data
- **Knex** – SQL query builder
- **bcryptjs** – password hashing and authentication

### External Service

- **Clarifai API** – AI face detection model

---

## Request Flow

1. User registers, signs in, or submits an image URL
2. Frontend sends the request to the Express backend
3. Backend validates the request and interacts with PostgreSQL when needed
4. For image detection, the backend sends the image URL to Clarifai
5. Clarifai returns face detection coordinates
6. Backend sends the response data back to the frontend
7. React calculates the bounding box position based on the rendered image size
8. UI displays the face box and updates the user’s image submission count

---

## API Endpoints Used By The Frontend

- `POST /register` – create a new user
- `POST /signin` – authenticate an existing user
- `POST /imageurl` – send image URL to Clarifai through the backend
- `PUT /image` – update the user’s image submission count
- `GET /profile/:id` – retrieve user profile data

---

## Running Locally

### 1. Start the Backend

In the backend repo:

```bash
cd ../smart-brain-api
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

Run the backend:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:3001
```

---

### 2. Start the Frontend

In this repo:

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

---

## Deployment Notes

- The frontend is deployed at `smartbrain.brandonmay.dev`
- The backend API is deployed separately
- Clarifai credentials are stored on the backend, not exposed in the frontend
- The frontend uses `VITE_API_URL` to connect to the backend API
- Backend CORS settings must allow the deployed frontend domain

---

## What This Project Demonstrates

- Building a React frontend around a real backend API
- Separating frontend and backend responsibilities
- Implementing authentication and secure password handling
- Working with PostgreSQL data persistence
- Protecting third-party API credentials on the server
- Transforming AI response data into dynamic UI rendering
- Managing local and production environment variables
- Deploying a full-stack application across separate services

---

## Future Improvements

- Add loading, empty, and error states
- Support multiple detected faces per image
- Add automated tests for auth and API workflows
- Improve form validation and user feedback
- Add database migrations and seed files in the backend repo
- Refactor backend routes into controllers and services
- Add rate limiting and centralized error handling

---

## About Me

I’m Brandon May, a full-stack developer and Computer Science student focused on building clean, reliable web applications with practical frontend and backend workflows.

I’m currently seeking frontend, full-stack, contract, and remote-friendly developer opportunities.

- GitHub: [github.com/brandonmay-dev](https://github.com/brandonmay-dev)
- LinkedIn: [linkedin.com/in/brandonmaydev](https://www.linkedin.com/in/brandonmaydev)
