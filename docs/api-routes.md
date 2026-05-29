# API Routes

## Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

## Gigs
GET /api/gigs
POST /api/gigs
GET /api/gigs/my
GET /api/gigs/:id
PUT /api/gigs/:id/progress
GET /api/gigs/:id/recommendations

## Proposals
POST /api/proposals/:gigId
GET /api/proposals/gig/:gigId
GET /api/proposals/my/list
PUT /api/proposals/:id/status

## Admin
GET /api/admin/stats
GET /api/admin/users
PUT /api/admin/users/:id/suspend
PUT /api/admin/freelancers/:id/verify
GET /api/admin/gigs
