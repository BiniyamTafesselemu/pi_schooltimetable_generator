-- Create the database for your project
CREATE DATABASE IF NOT EXISTS portal;
USE portal;

-- Create Packages Table (Internet Packages and their Prices)
CREATE TABLE packages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    package_speed VARCHAR(10) NOT NULL,  -- Example: '2 Mbps', '3 Mbps'
    price DECIMAL(10, 2) NOT NULL        -- Price for the package
);

-- Create Subscriptions Table (Store subscription durations and total prices)
CREATE TABLE subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT,  -- Link to the package
    duration_in_months INT,  -- Subscription duration in months (1, 6, 12)
    total_price DECIMAL(10, 2) NOT NULL,  -- Total price for the duration
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE
);


-- Enable the event scheduler
SET GLOBAL event_scheduler = ON;

-- Create a scheduled event to run the update query daily
CREATE EVENT deactivate_expired_users
ON SCHEDULE EVERY 1 DAY
DO
  UPDATE users
  SET is_active = FALSE
  WHERE due_date < CURRENT_DATE;


-- Create Users Table (No Password, Login with ID and Phone Number)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    otp_code VARCHAR(10),  -- Temporary OTP for login
    otp_expiry DATETIME,    -- Expiry time for OTP
    account_amount DECIMAL(10, 2) DEFAULT 0.00,
    current_subscription_id INT,  -- Link to the subscription
    starting_date DATE,                -- starting date for subscription 
    due_date DATE,                -- Due date for subscription renewal
    is_active BOOLEAN DEFAULT TRUE,  -- Whether the user is active or inactive based on payment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (current_subscription_id) REFERENCES subscriptions(subscription_id) ON DELETE SET NULL
);

-- Create Payments Table (Track payment details for each user)
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    subscription_id INT,
    payment_date DATE NOT NULL,
    pay_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id) ON DELETE CASCADE
);

