# Gmail API Setup for Contact Form

## Prerequisites
You need a Gmail account to send emails from your portfolio.

## Setup Steps

### 1. Enable 2-Factor Authentication on Gmail
1. Go to your [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

### 2. Generate App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Select "Other (Custom name)" as the device
4. Enter a name like "Portfolio Contact Form"
5. Click "Generate"
6. Copy the 16-character password (keep it secure!)

### 3. Install Dependencies
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### 4. Create Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

### 5. Add .env.local to .gitignore
Make sure `.env.local` is in your `.gitignore` file (it should be by default in Next.js)

### 6. Restart Development Server
After adding environment variables, restart your dev server:
```bash
npm run dev
```

## Testing
1. Navigate to the Contact section on your portfolio
2. Fill out the form with your details
3. Click "EXECUTE"
4. You should receive an email at the Gmail address you configured

## Troubleshooting

### "Invalid login" error
- Make sure 2FA is enabled on your Gmail account
- Verify you're using an App Password, not your regular Gmail password
- Check that GMAIL_USER matches the email address exactly

### Emails not sending
- Check the browser console for errors
- Check the terminal/server logs for error messages
- Verify the `.env.local` file is in the correct location
- Make sure you restarted the dev server after adding environment variables

### Email goes to spam
- This is common with transactional emails
- Consider using a dedicated email service like SendGrid, Mailgun, or Resend for production

## Production Deployment

When deploying to Vercel, Netlify, or other platforms:
1. Add the environment variables in your hosting platform's dashboard
2. Use the same `GMAIL_USER` and `GMAIL_APP_PASSWORD` values

## Alternative: Using EmailJS (No Backend Required)
If you prefer a simpler solution without backend setup, consider using [EmailJS](https://www.emailjs.com/) which works entirely from the client-side.
