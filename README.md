# Experiences App

## Overview

This full stack web application allows likeminded users to connect with each other for real world experiences. Users create experiences they'd like others to join, and can join existing experiences from the site as well. 
Moreover, the application includes a rating and report system to make sure users are connecting with the right folks to give them the best experiences possible.

The application is built with the following key tools, as well as various smaller supporting packages:
- **Frontend:** React
- **Backend:** FastAPI
- **Database:** MongoDB

## Features

- **Login and Token Validation:** Authenticates users via a hashing scheme with bcrypt and generates JWT tokens for authentication needs.
- **Experience Creation and Database Querying:** Uses MongoDB to both post new experiences and find experiences applicable to a user's preferences.
- **Rating System:** Allows reporting and rating to ensure positive experiences for users.
- **Group Messaging:** Within experiences, users can message each other to sort out logistical details for their meeting.
- **Experience Details:** Users can browse experiences and view details related to each experience, such as location, those who have signed up, and scheduling

## Prerequisites

Before running the application locally, ensure you have the following installed:

- Node.js and npm (for React frontend)
- Python and pip (for FastAPI backend)
- MongoDB (either local installation or a MongoDB service)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Frontend (React)

1. Navigate to the `frontend` directory:
cd frontend

2. Install dependencies:
npm install

3. Create a `.env` file in the `frontend` directory with the following content:
VITE_BACKEND_BASE_URL=http://127.0.0.1:8000 # Replace with your FastAPI backend URL

5. Start the React development server:
npm start

5. Open your browser and visit `http://localhost:3000` to view the application.

### Backend (FastAPI)

1. Navigate to the `backend` directory:
cd backend

2. Create a virtual environment (optional but recommended):
python -m venv venv source venv/bin/activate # On Windows use venv\Scripts\activate

3. Install dependencies:
pip install -r requirements.txt

4. Set up environment variables:
Create a `.env` file in the `backend` directory with the following content:
MONGO_DB_USER = user0  # Replace with a MongoDB user
MONGO_DB_PASSWORD = password #  Replace with the password for the MongoDB user above

5. Run the FastAPI server:
fastapi dev main.py

6. The FastAPI server will start at `http://localhost:8000`.

(The server's endpoints are listed and detailed via Swagger in backend/endpoints.yaml.

## To-dos

The project has certain major planned features which are not part of this MVP effort. These include:

- Integrating a notification system with experience sign-up and rating
- Image/blob storage for both messaging and experience details
- Administrative processes, for moderating experience content and handling user reports

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
