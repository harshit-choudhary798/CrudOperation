
Steps to use this :-
1.npm i (Install all required packages)
2.ng serve (to start angular server)
3.json-server db.json (this will start the db that is present in local system)

Crud Operation

1. Login Page
   - Implemented using HTML, CSS, and Angular framework.
   - Secure user authentication.

2. User Dashboard
   - After successful login, users are redirected to a dashboard.

 3. Add New Users
   - Form with fields for name, email, phone (multiple), addresses (multiple), and image upload.
   - Data stored in JSON format on the server using JSON Server.

 4. Users Table
   - Displayed in tabular format on the dashboard.
   - Each row represents a user with columns for name, email, phone, addresses, etc.

 5. Pagination
   - Implemented for the users' table for better user experience.

 6. CRUD Operations
    6.1. Create
   - Button to open a modal/form for adding a new user.
   - Upon submission, the data is sent to the server (JSON Server) for storage.

   6.2. Read
   - Displayed in the table on the dashboard.
   - Pagination for easy navigation through the user list.

   6.3. Update
   - Edit button in each row to open a modal/form pre-filled with the user's details.
   - Upon submission, the updated data is sent to the server.

   6.4. Delete
   - Delete button in each row to remove a user.
   - Sends a request to the server to delete the user.

 7. Action Buttons in the Table
   - Update: Opens a modal/form for updating user details.
   - Delete: Removes the user from the table and sends a request to delete from the server.
   - Preview: Opens a modal displaying detailed information about the user.
   - Print Detail: Prints the user's details.

 8. Angular Material
   - Utilized for UI components and styling.
   - Modals, forms, buttons, and table components from Angular Material.

 9. Image and Text Messages
   - Users can upload an image and input text messages like name, email, phone, and addresses.
   - Multiple phone numbers and addresses are supported.

 10. Data Storage
   - JSON Server used to store and retrieve user data.

11. Integration
   - Angular framework used to structure and manage the frontend logic.
   - HTML, CSS, and JavaScript for the overall design and interactivity.

![Screenshot (1179)](https://github.com/harshit-choudhary798/CrudOperation/assets/111317199/8653d3c4-fa43-4408-9ce0-3823bff22ae6)
![Screenshot (1178)](https://github.com/harshit-choudhary798/CrudOperation/assets/111317199/09f11f41-3902-45cf-aec9-692f4172e96b)
![Screenshot (1184)](https://github.com/harshit-choudhary798/CrudOperation/assets/111317199/f65bde3a-054b-4cdb-a3c7-c5fe97e27def)
![Screenshot (1182)](https://github.com/harshit-choudhary798/CrudOperation/assets/111317199/d7c592a1-c154-46b8-8873-7d711c0011a9)

