Employee Management System


The Employee Management System is a web application designed to streamline employee data management. It provides an intuitive interface for performing CRUD (Create, Read, Update, Delete) operations on employee records. This project is ideal for small to medium-sized organizations seeking efficient employee data handling.

Tech Stack: 
The system is built using the following technologies:

Frontend: React, Styled-Components, React-Bootstrap
Backend: Node.js, Express.js
Database: MongoDB (NoSQL database for data storage)
Others: RESTful APIs, JavaScript, CSS for styling  


Functionalities
Add Employee:
Allows administrators to add new employee records by providing necessary details such as name, email, position, and department.

View Employee Records:
Displays all employee data in a clean, tabular format with options to sort and filter records.

Edit Employee Details:
Enables administrators to update an employee's information such as their role, contact details, or status.

Delete Employee Records:
Provides the option to remove employees who are no longer part of the organization.

Pagination:
Supports pagination for easy navigation through large datasets.

Search Functionality:
Allows searching employees by name, department, or other attributes.

How to Run the Application
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd employee-management-system
Install Dependencies:

bash
Copy code
npm install
cd client
npm install
Set Up Environment Variables:
Create a .env file in the root directory with the following:

env
Copy code
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
Run the Server:

bash
Copy code
npm run server
Run the Client:
Open a new terminal and run:

bash
Copy code
npm start
Access the Application:
Open your browser and navigate to http://localhost:3000.

Features in Development

