# Travel Management System

The **Travel Management System** is a web application designed to help users easily book travel packages that include flights, hotels, and other services. It features a modern interface, seamless payment integration, and an efficient backend to manage bookings, users, and transactions.

## Tech Stack Used

- **Frontend**: Vite.js (React + TypeScript)
- **Styling**: Tailwind CSS
- **Backend**: ASP.NET Web API
- **Database**: MySQL
- **Code Quality**: SonarQube
- **Containerization**: Docker
- **Payment Integration**: Razorpay (optional)
- **Email Notifications**: SMTP (optional)


## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

- [Docker](https://www.docker.com/get-started) (for containerization)
- MySQL (local or via Docker)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Soumyadip1245/Travel-TS.git
   
2. **Setup Env:**

To configure the application and add the following environment variables:

    ```bash
    # MySQL configuration
    MYSQL_ROOT_PASSWORD=<your_mysql_root_password>  # required
    MYSQL_DB=travel                                  # don't change
    MYSQL_HOST=travelsql                             # don't change

    # Razorpay configuration (optional)
    RAZORPAY_KEY_ID=<your_razorpay_key_id>          # required if you want to enable Razorpay
    RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>  # required if you want to enable Razorpay

    # SMTP configuration (optional)
    SMTP_USERNAME=<your_smtp_username>                # required if you want to enable email
    SMTP_PASSWORD=<your_smtp_password>                # required if you want to enable email

3. **Run Docker:**

    ```bash
    docker-compose up --build

4. **View Application:**

    ```bash
    http://localhost:5173/

  ### SonarQube 
![image](https://github.com/user-attachments/assets/5bb0b3b0-eb80-4546-abd3-d74dd1ce929d)
