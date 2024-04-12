Task Manager App
The Task Manager app is a full-stack web application for managing tasks. It consists of a client-side React application for the frontend and a Node.js/Express server for the backend. The app allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks, as well as search and filter tasks based on various criteria.

NODE VERSION : 21.5.0 !!

Features
Create, read, update, and delete tasks
Search tasks by keyword
Filter tasks by status, priority, or due date
User-friendly interface with React Router for navigation
Integration with external APIs for additional functionality
Utilizes stores for state management
Installation
To run the Task Manager app locally, follow these steps:

Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the client directory and install dependencies:

bash
Copy code
cd client
npm install
Navigate to the server directory and install dependencies:

bash
Copy code
cd ../server
npm install
Usage
To start the Task Manager app, follow these steps:

Start the JSON server (backend):

bash
Copy code
cd server
npm start
This will start the JSON server on http://localhost:5000 by default.

Start the React client (frontend):

bash
Copy code
cd ../client
npm start
This will start the React client on http://localhost:3000 by default.

Open your web browser and navigate to http://localhost:3000 to access the Task Manager app.

Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.