# Smart Brain (Frontend)

A modern React-based web application that detects faces in images using AI.
Users can register, sign in, and submit image URLs to analyze facial data.

---

## Live Demo

https://smart-brain-app-32fac457676f.herokuapp.com/

---

## Tech Stack

* React (Vite)
* Tachyons (CSS)
* Fetch API
* Authentication (connected to backend)
* Deployed on Heroku

---

## Features

* User registration & sign-in
* Persistent user data (name, entries count)
* Image URL submission
* Face detection using AI API
* Entry count tracking
* Responsive UI

---

## 🔗 Backend

This frontend connects to the Smart Brain API:

https://safe-dawn-54877-2bdeb01ab080.herokuapp.com/

---

## Installation

Clone the repo:

```bash
git clone https://github.com/brandonmay-dev/facerecognitionbrain.git
cd facerecognitionbrain
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3001
```

For production (Heroku), set:

```bash
heroku config:set VITE_API_URL=https://safe-dawn-54877-2bdeb01ab080.herokuapp.com
```

---

## Running Locally

```bash
npm run dev
```

App runs at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Troubleshooting

### 404 / undefined API URL

Make sure `VITE_API_URL` is set correctly.

### 403 Forbidden

Ensure your backend allows your frontend domain in CORS.

### Sign-in issues

Check backend logs and database connection.

---

## Project Structure

```bash
src/
  components/
  App.jsx
  App.css
  index.css
  main.jsx
```

---

## Future Improvements

* JWT authentication
* Profile editing
* Image upload instead of URL
* Better UI/UX styling

---

## 👨‍💻 Author

Brandon May

---

## 📜 License

MIT
