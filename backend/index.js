import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors' ;



const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();


// Middleware to log requests
app.use((req, res, next) => {
  console.log('Request Method:', req.method); // Log the method
  console.log('Request URL:', req.url); // Log the URL
  console.log('Request Headers:', req.headers); // Log headers
  console.log('Request Body:', req.body); // Log body
  next();
});

const secretKey = process.env.JWT_SECRET; // JWT secret key
const otpExpiryTime = 5 * 60 * 1000; // OTP expiry time in milliseconds (5 minutes)

// Setup MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Utility to send OTP via email
const sendOtpEmail = (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS // Consider using environment variables for sensitive information
    }
  });

  let mailOptions = {
    from: 'kidusamanuel0371@gmail.com',
    to: email,
    subject: 'Your OTP for Portal Login',
    text: `Your OTP code is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('OTP email sent:', info.response);
    }
  });
};

// Generate random OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token

  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.sendStatus(403); // Invalid token, forbidden
    }
    req.user = user; // Save user information from token
    next();
  });
};


// Login route
app.post('/login', (req, res) => {
  const { user_id, phone_number } = req.body;

  db.query('SELECT * FROM users WHERE user_id = ? AND phone_number = ?', [user_id, phone_number], (err, result) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }

      const user = result[0];
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + otpExpiryTime);

      // Update user OTP and expiry in DB
      db.query('UPDATE users SET otp_code = ?, otp_expiry = ? WHERE user_id = ?', [otp, otpExpiry, user_id], (err) => {
          if (err) {
              console.error('Failed to update OTP in DB:', err);
              return res.status(500).json({ error: 'Failed to send OTP' });
          }

          sendOtpEmail(user.email, otp); // Send OTP email
          res.json({ message: 'OTP sent to your registered email.' }); // Success message
      });
  });
});



app.post('/verify-otp', (req, res) => {
  const { user_id, otp } = req.body;

  db.query('SELECT * FROM users WHERE user_id = ? AND otp_code = ?', [user_id, otp], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length === 0) return res.status(400).json({ error: 'Invalid OTP' });

      const user = result[0];
      if (new Date() > new Date(user.otp_expiry)) {
          return res.status(400).json({ error: 'OTP has expired' });
      }

      // Generate the token
      const token = jwt.sign({ user_id: user.user_id }, secretKey, { expiresIn: '1h' });
      console.log('Generated Token:', token);
      res.json({ token });
  });
});

// Get user dashboard information
app.get('/dashboard', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;

  db.query(
      `SELECT u.user_id, u.name, u.phone_number, u.email, u.account_amount, u.due_date, u.starting_date, 
              s.package_id, s.duration_in_months, s.total_price, p.package_speed
       FROM users u
       LEFT JOIN subscriptions s ON u.current_subscription_id = s.subscription_id
       LEFT JOIN packages p ON p.package_id = s.package_id
       WHERE u.user_id = ?`, 
      [user_id], 
      (err, result) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ error: err });
          }
          if (result.length === 0) {
              return res.status(404).json({ error: 'No subscriptions found' });
          }

          const userData = result[0];
          res.json({
              user_id: userData.user_id,
              name: userData.name,
              phone_number: userData.phone_number,
              email: userData.email,
              due_date: userData.due_date,
              starting_date: userData.starting_date,
              account_amount: userData.account_amount,
              package: {
                  id: userData.package_id, // Add package_id here
                  speed: userData.package_speed,
                  duration: userData.duration_in_months,
                  total_price: userData.total_price
              }
          });
      }
  );
});

// Update user profile
app.put('/update-profile', authenticateToken, (req, res) => {
  const { name, email, phone_number } = req.body;
  const user_id = req.user.user_id;

  db.query('UPDATE users SET name = ?, email = ?, phone_number = ? WHERE user_id = ?', 
    [name, email, phone_number, user_id], 
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT user_id, name, phone_number, email, account_amount FROM users', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result); // Send the array of users back in the response
  });
});

// Payment route - Make a payment for the user
app.post('/make-payment', authenticateToken, (req, res) => {
  const { subscription_id } = req.body; // Remove payment amount from body
  const user_id = req.user.user_id;

  // Fetch user's current subscription
  db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, userResult) => {
    if (err) return res.status(500).json({ error: err });
    if (userResult.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = userResult[0];

    // Fetch subscription details
    db.query('SELECT * FROM subscriptions WHERE subscription_id = ?', [subscription_id], (err, subResult) => {
      if (err) return res.status(500).json({ error: err });
      if (subResult.length === 0) return res.status(404).json({ error: 'Subscription not found' });

      const subscription = subResult[0];
      const payment_amount = subscription.total_price; // Automatically take subscription price

      const payment_date = new Date();
      let starting_date;
      let due_date;

      if (new Date(user.due_date) < payment_date) {
        starting_date = payment_date;
      } else {
        starting_date = new Date(user.due_date);
      }

      // Calculate new due date based on subscription duration
      due_date = new Date(starting_date);
      due_date.setMonth(due_date.getMonth() + subscription.duration_in_months);

      // Insert payment record
      db.query('INSERT INTO payments (user_id, subscription_id, payment_date, pay_amount) VALUES (?, ?, ?, ?)', 
        [user_id, subscription_id, payment_date, payment_amount], 
        (err) => {
          if (err) return res.status(500).json({ error: err });

          // Update user's starting_date and due_date
          db.query('UPDATE users SET starting_date = ?, due_date = ?, current_subscription_id = ? WHERE user_id = ?', 
            [starting_date, due_date, subscription_id, user_id], 
            (err) => {
              if (err) return res.status(500).json({ error: err });
              res.json({ message: 'Payment successful, subscription updated.' });
            }
          );
      });
    });
  });
});

// Get available packages
app.get('/packages', (req, res) => {
  db.query('SELECT * FROM packages', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Get subscription plan based on package ID
app.get('/get-subscription-plan/:package_id', authenticateToken, (req, res) => {
  const packageId = req.params.package_id;

  db.query('SELECT * FROM subscriptions WHERE package_id = ?', [packageId], (err, result) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: err });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'No subscription plans found for this package.' });
      }
      res.json(result);
  });
});


// Package management route for upgrading/downgrading subscriptions

app.put('/change-subscription', authenticateToken, (req, res) => {
  const { new_package_id } = req.body;
  const user_id = req.user.user_id;

  console.log('Changing subscription for User ID:', user_id, 'to Package ID:', new_package_id);

  // Fetch user details
  db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, userResult) => {
      if (err) {
          console.error('Error fetching user:', err);
          return res.status(500).json({ error: 'Error fetching user.' });
      }
      
      // Check if user exists
      if (userResult.length === 0) {
          console.error('User not found for ID:', user_id);
          return res.status(404).json({ error: 'User not found.' });
      }

      const user = userResult[0];
      const currentDueDate = new Date(user.due_date);
      const currentDate = new Date();

      // Fetch package details
      db.query('SELECT * FROM packages WHERE package_id = ?', [new_package_id], (err, packageResult) => {
          if (err) {
              console.error('Error fetching package:', err);
              return res.status(500).json({ error: 'Error fetching package.' });
          }
          if (packageResult.length === 0) {
              console.error('Package not found for ID:', new_package_id);
              return res.status(404).json({ error: 'Package not found.' });
          }

          const packageDetails = packageResult[0];

          // Check for existing subscriptions for the package ID with duration of 1 month
          db.query('SELECT subscription_id FROM subscriptions WHERE package_id = ? AND duration_in_months = ?', [new_package_id, 1], (err, subscriptionResult) => {
              if (err) {
                  console.error('Error fetching subscription:', err);
                  return res.status(500).json({ error: 'Error fetching subscription.' });
              }
              
              if (subscriptionResult.length === 0) {
                  return res.status(404).json({ error: 'No one-month subscription found for this package.' });
              }

              const subscriptionId = subscriptionResult[0].subscription_id;

              // If current subscription is still active
              if (currentDate < currentDueDate) {
                  console.log(`Subscription change will take effect after ${user.due_date}`);
                  return res.json({
                      message: `Your subscription will be upgraded/downgraded to the ${packageDetails.package_name} plan after the current subscription ends on ${user.due_date}.`
                  });
              } else {
                  // If the current subscription has expired, update the subscription ID
                  db.query('UPDATE users SET current_subscription_id = ? WHERE user_id = ?', 
                      [subscriptionId, user_id], (err) => {
                          if (err) {
                              console.error('Error updating subscription:', err);
                              return res.status(500).json({ error: 'Error updating subscription.' });
                          }
                          res.json({
                              message: 'Your subscription has been updated successfully.'
                          });
                      });
              }
          });
      });
  });
});


// Get all payments made by the user
app.get('/payments', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;

  db.query(
      `SELECT p.payment_id, p.payment_date, p.pay_amount, s.subscription_id, 
              s.duration_in_months, pkg.package_speed
       FROM payments p
       JOIN subscriptions s ON p.subscription_id = s.subscription_id
       JOIN packages pkg ON s.package_id = pkg.package_id
       WHERE p.user_id = ?`,
      [user_id],
      (err, result) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ error: err });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: 'No payments found for this user.' });
          }

          // Format the result to be more user-friendly
          const payments = result.map(payment => ({
              payment_id: payment.payment_id,
              payment_date: payment.payment_date,
              amount: payment.pay_amount,
              subscription_id: payment.subscription_id,
              package_speed: payment.package_speed,
              duration: payment.duration_in_months // Subscription duration in months
          }));

          res.json({ payments });
      }
  );
});


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
