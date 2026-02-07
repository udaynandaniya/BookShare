Below is a clean, GitHub-ready README.md — structured, professional, readable, and suitable for a real project portfolio.
I renamed NavneetHub → BookShare, removed the duration section, improved wording, added badges/icons, and made it feel like an actual deployable product.

You can copy-paste directly into README.md.

📚 BookShare – Buy & Sell Used Navneet Books in Your Area

Connect with nearby students to buy affordable used Navneet books or sell your completed ones. Save money, help others, and reduce waste.

🚀 About the Project

BookShare is a student-focused marketplace built for Standards 1–12 (GSEB/Gujarati medium students especially) to exchange used Navneet books locally.

Every academic year, thousands of students purchase new Navneet books. After exams, these books are often left unused — while other students struggle to afford them.
BookShare bridges this gap by enabling a direct, local, and verified exchange between buyers and sellers.

The platform encourages:

💰 Affordability

♻️ Reuse & sustainability

🤝 Student-to-student support

📍 Local community connection

❗ Problem

Students buy expensive Navneet books every year

Books become useless after exams

Sellers don’t know where to sell

Buyers want cheaper options

No trusted local marketplace exists specifically for school books

💡 Solution

BookShare provides a verified local marketplace where students can:

List their used Navneet books

Find nearby sellers

Filter by standard and condition

Contact sellers securely

No middleman. No commission. Just students helping students.

✨ Key Features
📱 User Experience

Responsive mobile-first UI

Modern TailwindCSS design

🌙 Light & Dark mode toggle

🌐 English / Gujarati language toggle

🔐 Secure Verification

Mobile number registration

Email OTP verification (1 minute validity, max 4 attempts)

Verified accounts only

📚 Book Listings

Minimum 4 images required

Select Standard (1–12)

Full set or partial set

Book condition:

🟢 New

🟡 Gently Used

🔴 Heavily Used

Price & location

Image zoom & fullscreen preview

🔎 Smart Search & Filters

Search by title or location

Filter by:

Standard

Area

Condition

Posting date

🔔 Buyer Alerts

Email notification when a matching book is listed

🛡 Fraud Prevention

Seller phone number visible

Optional WhatsApp contact link

No comments/reviews (prevents spam & fake ratings)

👤 Account Management

Update profile (verified via email OTP)

Permanently delete account (secure email verification)

📩 Support & Feedback

Users can send:

Feature requests

Queries

Suggestions
through the built-in contact system.

🧰 Tech Stack
Category	Technology
Frontend	Next.js, TypeScript
Styling	TailwindCSS
Backend	Next.js API Routes
Database	MongoDB
Authentication	NextAuth.js
Validation	Zod
Sessions	Cookies (2-month session)
Deployment	Vercel
🏗 How It Works

User signs up & verifies email

Seller uploads book listing with photos

Buyer searches or receives alert

Buyer contacts seller directly

They meet locally & exchange

Simple and practical — just like OLX, but built specifically for students and school books.

🎯 Target Users

School students (Std 1–12)

Parents

Tuition teachers

Local stationery buyers

♻️ Impact

BookShare helps:

Reduce academic waste

Make education affordable

Promote reuse culture

Support nearby students

🧪 Local Development Setup
# Clone repository
git clone https://github.com/yourusername/bookshare.git

# Go inside project
cd bookshare

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev


Open:

http://localhost:3000

🔐 Environment Variables

Create .env.local

MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
EMAIL_SERVER=
EMAIL_FROM=

🤝 Contributing

Contributions are welcome!

You can:

Report bugs

Suggest features

Improve UI

Optimize performance

Please open an issue or submit a pull request.

📌 Future Improvements

In-app chat system

Pincode-based location detection

Book recommendation system

Mobile app version

📄 License

This project is licensed under the MIT License.

🙌 Acknowledgements

Students who inspired the idea

Open-source community

Next.js & TailwindCSS contributors

Made with ❤️ for students.
