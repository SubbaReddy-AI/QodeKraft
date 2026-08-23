# Frontend Test Notes

The public frontend and admin dashboard should be manually tested before deployment.

## Public Frontend Checklist

- Home page loads correctly.
- Navigation links work.
- Service detail pages load by slug.
- Course detail pages load by slug.
- Project detail pages load by slug.
- Internship application form submits successfully.
- Job application form submits successfully.
- Contact form submits successfully.
- Newsletter subscription works.
- Mobile navigation works.
- Not-found page appears for invalid routes.

## Admin Dashboard Checklist

- Login rejects invalid credentials.
- Login redirects authenticated administrators to the dashboard.
- Sidebar navigation works on desktop and mobile.
- Create, update, and delete actions work for content records.
- Applications can have their status updated.
- Logout redirects to the login page.
- Protected pages redirect unauthenticated users to `/login`.

## Backend Test Command

Run from the project root:

```bash
pytest tests/backend