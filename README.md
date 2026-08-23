

## Premium frontend refresh
The frontend now uses a dark graphite/electric-blue visual system, supplied QodeKraft AI imagery, animated hero visuals, and curated six-item public sections for courses, projects, internships and careers. Backend routes and database structure are preserved.

## Course registration + Razorpay

The course registration flow is implemented at `/register-course`.

Flow:
1. User enters full name, email, phone, referral ID and selects a course.
2. Backend creates a Razorpay Order using the course price stored in MySQL.
3. Razorpay Checkout opens in the browser.
4. After successful checkout, the browser sends the Razorpay payment ID/order ID/signature to the backend.
5. Backend verifies the HMAC signature, checks the payment is captured, checks the order and amount, and checks the UTR/transaction reference.
6. UTRs, Razorpay order IDs and payment IDs are unique in MySQL.
7. A `QKREG-YYYY-XXXXXXXX` registration ID is generated and the confirmation email is sent through the configured SMTP account.

### Required server environment

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_server_only_key_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-mail@example.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-mail@example.com
FRONTEND_URL=https://your-frontend-domain
```

Never put `RAZORPAY_KEY_SECRET` in frontend code or commit it to GitHub.

### Google Cloud deployment

For Cloud Run, add the variables above as service environment variables/secrets. Point `FRONTEND_URL` at the deployed frontend and expose the backend over HTTPS. For live Razorpay payments, replace the test key with the live key only after the Razorpay account and webhook/payment-capture settings are ready.
