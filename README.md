# Project Overview

The project consists of a backend in PHP and a frontend in React, with integration of an external API to obtain additional job offers.

### **Main Features**

### **Backend (PHP)**

**Technologies Used**:

- **Language**: PHP Vanilla (no frameworks).
- **Database**: MySQL (for internal storage).
- **External API**: Consumed via cURL.
- **Modular Structure (Layered Architecture)** maintaining separated responsibilities.
    - **Controllers**: Handles HTTP requests and returns responses.
    - **Services**: Contains business logic and orchestrates operations.
    - **Repositories**: Manages data access (database or external API).

**Functionalities**:

- **Job Posting**: Endpoints to create, read, update, and delete job offers.
- **Job Search**: Combined search of internal and external job offers.
- **External API Integration**: Consumes an external API to obtain additional job offers.
- **Alert System (Conceptual)**: Subscription for candidates to receive email notifications.

### **Available Endpoints**

- **GET** `/get_all_job_posts.php`: Retrieves all job offers.
- **GET** `/get_job_post.php`: Retrieves a specific job offer by ID.
- **POST** `/create_job_post.php`: Creates a new job offer.
- **PUT** `/update_job_post.php`: Updates an existing job offer.
- **DELETE** `/delete_job_post.php`: Deletes a job offer.

### **Frontend (React)**

- **Modern User Interface**: Developed with React, Vite, and SCSS.
- **State Management**: Uses Redux Toolkit Query to handle state and API requests.
- **Routing**: Page navigation with React Router.

### **Requirements**

1. **XAMPP**: To run the backend (Apache and MySQL).
2. **Node.js**: To run the frontend.
3. **Composer**: To manage backend dependencies.
4. **NPM**: To manage frontend dependencies.

### **Backend Installation and Configuration**

1. Clone the repository into **htdocs**.
2. **Configure the database**:
    - Open phpMyAdmin (http://localhost/phpmyadmin).
    - Create a new database named `avature`.
    - Import the database schema from `sql/setup.sql`.
3. Configure credentials in **config/database.php** if necessary:

```php
return [
    'db' => [
        'host' => 'localhost', // Database server
        'port' => '3306',      // MySQL port
        'user' => 'root',      // MySQL user
        'password' => '',      // MySQL password (empty by default in XAMPP)
        'database' => 'avature', // Database name
    ],
];
```
4. Install Composer dependencies: composer install.
5. Start XAMPP services: Apache and MySQL.

### **Frontend Installation and Configuration**
1. Navigate to the frontend folder: `cd .../htdocs/av-challenge/client`
2. Install NPM dependencies: `npm install`
3. Start the development server: The frontend will be available by default at `http://localhost:5173`.

### **Project Structure**
### **Backend**
```
.
├── api/                  # API endpoints
├── config/               # Database configuration
├── src/                  # Source code
│   ├── Controller/       # Controllers (HTTP logic)
│   ├── Services/         # Services (business logic)
│   ├── Repositories/     # Repositories (data access)
│   ├── Database/         # Database connection
│   └── Interfaces/       # Interfaces for component decoupling
├── sql/                  # SQL scripts for the database
└── vendor/               # Composer dependencies
```
### **Frontend**
```
.
├── public/               # Static files (images, etc.)
├── src/                  # Source code
│   ├── components/       # Reusable components
│   ├── configs/          # Project configurations
│   ├── pages/            # Application pages
│   ├── store/            # State management with Redux Toolkit
│   ├── styles/           # SCSS styles
│   ├── utils/            # Utilities
│   ├── App.jsx           # Main component
│   └── main.jsx          # Entry point
├── .env                  # Environment variables
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

Additional Notes

External API: Ensure the external service (https://github.com/avatureta/jobberwocky-extra-source-v2) is running to obtain external job offers.
CORS: Endpoints are configured to allow requests from http://localhost:5173 (React frontend).

