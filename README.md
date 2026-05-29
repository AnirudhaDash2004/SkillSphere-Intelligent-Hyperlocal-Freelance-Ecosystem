# SkillSphere – Intelligent Hyperlocal Freelance Ecosystem

A MERN full-stack internship project based on the Nayoda PDF requirements.

## Core Demo Flow
Client registers -> posts gig -> freelancer registers -> creates profile -> applies to gig -> client accepts proposal -> chat/reviews/notifications -> admin monitors users, gigs, payments and analytics.

## Run
1. Open two terminals.
2. Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Update `backend/.env` with your MongoDB Atlas URI before testing real data.
