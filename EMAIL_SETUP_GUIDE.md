# 📧 Email Setup Guide

The contact form now sends emails directly instead of saving to database!

---

## 🎯 **What Changed:**

✅ **Contact form sends emails** to your inbox  
✅ **Auto-reply sent to customer** confirming receipt  
✅ **No database storage** - clean and simple  
✅ **Professional HTML email templates**  

---

## 🔧 **Setup Instructions:**

### **Step 1: Choose Email Service**

**Option A: Gmail (Easiest for testing)**

1. Go to your Google Account
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

**Option B: Outlook/Hotmail**

Use your regular email and password with these settings:
- Host: `smtp-mail.outlook.com`
- Port: `587`

**Option C: SendGrid (Best for production)**

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create API key
3. Use these settings:
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - User: `apikey`
   - Pass: Your API key

---

### **Step 2: Configure Environment Variables**

Edit `server/.env`:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
CONTACT_EMAIL=info@prestigebuild.com
```

**For Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourname@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # 16-character app password
CONTACT_EMAIL=yourname@gmail.com
```

**For Outlook:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=yourname@outlook.com
SMTP_PASS=your-regular-password
CONTACT_EMAIL=yourname@outlook.com
```

**For SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=noreply@yourdomain.com
```

---

### **Step 3: Install Dependencies**

```bash
cd server
npm install
```

This installs `nodemailer` (email sending library).

---

### **Step 4: Test the Setup**

```bash
# Start backend
cd server
npm run dev

# In another terminal, test with curl:
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

**Expected:**
- ✅ API returns success message
- ✅ Email appears in your inbox
- ✅ Auto-reply sent to test@example.com
- ✅ Console shows: `✉️ Email sent: <message-id>`

---

## 📬 **What You'll Receive:**

### **Company Email (to you):**

```
Subject: New Contact Form: Test Message

From: Test User

Name: Test User
Email: test@example.com
Phone: 555-1234
Subject: Test Message

Message:
This is a test message

---
Sent from Prestige Build Construction website
```

### **Auto-Reply (to customer):**

```
Subject: Thank you for contacting Prestige Build

Thank You, Test User!

We've received your message and appreciate you reaching out to us. 
Our team will review your inquiry and get back to you within 24-48 hours.

What happens next?
One of our construction specialists will contact you to discuss 
your project requirements and answer any questions you may have.

If you need immediate assistance, feel free to call us at (555) 123-4567.

Best regards,
The Prestige Build Team
```

---

## 🚨 **Troubleshooting:**

### **Error: "Invalid login"**

**Gmail users:**
- Make sure you're using App Password, not regular password
- Enable 2-Factor Authentication first
- App passwords are 16 characters (no spaces)

**Outlook users:**
- Check username is correct (full email address)
- Try regular password first
- May need to enable "Less secure app access"

---

### **Error: "Connection timeout"**

**Solutions:**
- Check firewall isn't blocking port 587
- Try port 465 with `secure: true` in config
- Make sure SMTP host is correct

---

### **Error: "Recipient rejected"**

**Solutions:**
- Check CONTACT_EMAIL is valid
- For Gmail: Can't send to same address you're sending from
- Use different email for CONTACT_EMAIL

---

### **Emails go to spam**

**Solutions:**
- Add your domain to SPF records
- Use a professional email service (SendGrid, AWS SES)
- Don't use Gmail for production (use it for testing only)

---

## 🎨 **Customization:**

### **Change Email Templates:**

Edit `server/src/config/email.js`:

```javascript
// Company notification email
html: `
  <h2>New Contact: ${subject}</h2>
  <p>From: ${name} (${email})</p>
  <p>${message}</p>
`

// Auto-reply email
html: `
  <h1>Thank you, ${contactName}!</h1>
  <p>Your custom message here...</p>
`
```

### **Change Company Info:**

In `server/src/config/email.js`, update:
- Company name
- Phone number
- Response time (24-48 hours)
- Any other details

---

## 🔐 **Security Best Practices:**

### **1. Never Commit Passwords**

```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore
```

### **2. Use Environment Variables**

```javascript
// ✅ Good
const password = process.env.SMTP_PASS;

// ❌ Bad
const password = "my-actual-password";
```

### **3. Use App Passwords (Gmail)**

Never use your main Google password!

### **4. Production: Use Professional Service**

For production, use:
- SendGrid (100 emails/day free)
- AWS SES (62,000 emails/month free)
- Mailgun (5,000 emails/month free)
- Postmark (100 emails/month free)

---

## 🚀 **Production Deployment:**

### **Render:**

1. Go to your backend service
2. Add environment variables:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   CONTACT_EMAIL=noreply@yourdomain.com
   ```
3. Redeploy

### **Railway/DigitalOcean:**

Same process - add environment variables in dashboard.

---

## 📊 **Email Limits:**

| Service | Free Tier | Best For |
|---------|-----------|----------|
| Gmail | ~500/day | Testing only |
| SendGrid | 100/day | Small sites |
| AWS SES | 62,000/mo | Production |
| Mailgun | 5,000/mo | Medium sites |
| Postmark | 100/mo | Transactional |

---

## ✅ **Verification Checklist:**

After setup:

- [ ] `.env` file created with credentials
- [ ] `nodemailer` installed (`npm install`)
- [ ] Backend server running
- [ ] Test email sent successfully
- [ ] Email received in inbox
- [ ] Auto-reply works
- [ ] No errors in console
- [ ] Passwords not committed to git
- [ ] Production service configured (if deploying)

---

## 🆘 **Still Having Issues?**

1. **Check console logs** - backend shows email errors
2. **Test SMTP settings** - use online SMTP tester
3. **Verify credentials** - double-check username/password
4. **Check spam folder** - emails might be filtered
5. **Try different port** - 587, 465, or 25

---

## 💡 **Pro Tips:**

1. **Test with real email** first, not test@example.com
2. **Check spam folder** when testing
3. **Use SendGrid for production** - much more reliable
4. **Monitor email sending** - set up logging
5. **Rate limit contact form** - prevent spam (already implemented)

---

**Your contact form is now email-powered! 📧✨**
