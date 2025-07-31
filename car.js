// const express = require('express');
// const bodyParser = require('body-parser');
// const { body, validationResult } = require('express-validator');
// const db = require('./db'); // Database connection

// const app = express();

// MAILTRAP_API_KEY=your-mailtrap-api-key-here
// // ...existing code...
// require('dotenv').config(); // Add this at the top, after your requires/imports

// import MailtrapClient from "./lib/MailtrapClient";
// // ...existing code...

// // Initialize Mailtrap client with API key
// const mailtrap = new MailtrapClient({ apiKey: process.env.MAILTRAP_API_KEY });
// // ...existing code...
// WHATSAPP_API_KEY=your-whatsapp-api-key-or-token-here
// const whatsappApiKey = process.env.WHATSAPP_API_KEY;
// // Use whatsappApiKey with your WhatsApp API client
// // ...existing code...

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files

// // Form validation rules
// const formValidationRules = [
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('firstName').notEmpty().withMessage('First name is required'),
//     body('lastName').notEmpty().withMessage('Last name is required'),
//     body('phone').notEmpty().withMessage('Phone number is required'),
//     body('vin').notEmpty().withMessage('VIN number is required'),
//     body('paymentMethod').notEmpty().withMessage('Payment method is required')
// ];

// // Form submission endpoint
// app.post('/api/submit-form', formValidationRules, async (req, res) => {
//     const errors = validationResult(req);
    

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { email, firstName, lastName, phone, vin, paymentMethod } = req.body;
        
//         // Insert into database
//         const result = await db.query(
//             'INSERT INTO customer_info (email, first_name, last_name, phone, vin, payment_method) VALUES (?, ?, ?, ?, ?, ?)',
//             [email, firstName, lastName, phone, vin, paymentMethod]
//         );
        
//         res.json({ success: true, message: 'Form submitted successfully!' });
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



// // Start the server

const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const db = require('./db'); // Database connection
require('dotenv').config(); // Load environment variables

const MailtrapClient = require('./lib/MailtrapClient'); // Use require for CommonJS

const app = express();

// Initialize Mailtrap client with API key from .env
const mailtrap = new MailtrapClient({ apiKey: process.env.MAILTRAP_API_KEY });

// WhatsApp API key from .env
const whatsappApiKey = process.env.WHATSAPP_API_KEY;
// Use whatsappApiKey with your WhatsApp API client

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Form validation rules
const formValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('vin').notEmpty().withMessage('VIN number is required'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required')
];

// Form submission endpoint
app.post('/api/submit-form', formValidationRules, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, firstName, lastName, phone, vin, paymentMethod } = req.body;

        // Insert into database
        const result = await db.query(
            'INSERT INTO customer_info (email, first_name, last_name, phone, vin, payment_method) VALUES (?, ?, ?, ?, ?, ?)',
            [email, firstName, lastName, phone, vin, paymentMethod]
        );

        res.json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});