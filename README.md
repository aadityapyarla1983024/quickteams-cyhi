# Hackathon Team Management PWA

This Progressive Web Application (PWA) is designed to streamline team formation, management, and collaboration during hackathons. It empowers users to create teams, join projects, manage member requests, and track activities effectively — all within a responsive, user-friendly React app integrated with Firebase backend services.

---

## Features

- **User Authentication and Profiles:** Secure login and personalized user profiles with skill and strength tags.
- **Team Creation & Management:** Create new hackathon teams with detailed metadata including skills required, strengths, max members, event info, and venue.
- **Team Browsing & Joining:** Explore available teams and join those that match your expertise.
- **Member Requests & Approvals:** Handle join requests and approvals seamlessly.
- **Team Details & Editing:** View detailed team information and edit team properties.
- **Member Leave & Team Deletion:** Allow members to leave teams, with automatic deletion if last member exits.
- **Responsive PWA:** Works smoothly across devices and supports installation as a PWA.
- **Role-based Protection:** Routes guarded to ensure only authenticated users can access team management functions.
- **Real-time Firestore Integration:** Fast, scalable, and secure real-time database updates and sync.

---

## Tech Stack

- **Frontend:** React.js, React Router, Material-UI (MUI) components, React Hooks
- **Backend:** Firebase Authentication, Firestore Database
- **Tools:** Firestore security rules, PWA support, ES6+, Vite/CRA (customizable)

---

## Installation & Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/hackathon-team-pwa.git
   cd hackathon-team-pwa
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure Firebase:

   - Create a Firebase project.
   - Enable Authentication (Email/Google).
   - Enable Firestore database.
   - Configure security rules.
   - Replace `firebase.js` config with your project credentials.

4. Run the app locally:

   ```
   npm start
   ```

5. Build for production:
   ```
   npm run build
   ```

---

## Usage

- **Landing Page:** Shareable entry point guiding users to login or explore.
- **Create Profile:** Setup your skill profile to customize your team matching.
- **Browse Teams:** View available teams with key details; join those that fit your skills.
- **Create Team:** Launch your own team with defined requirements.
- **Team Details:** See team makeup, skills, members, and requests.
- **Edit Team:** Update team info and requirements via an intuitive interface.
- **Leave Team:** Exit teams while maintaining data integrity.
- **Team Requests:** Manage incoming join requests (accept/decline).
- **My Teams:** Track teams you joined.

---

## Code Highlights

- **Firestore Data Structure:**

  - `users` collection: user profiles (uid, name, avatarUrl, skills, strengths)
  - `teams` collection: team metadata including memberIds (array of user uids), skillsRequired, strengthsRequired, venue, eventKey, etc.

- **Routing:**

  - Protected routes with authentication guard.
  - Dynamic routing for team details and editing pages.

- **UI Components:**

  - Utilizes MUI for accessible and responsive design.
  - Custom Chip input component for skills and strengths tagging.

- **Firestore Queries:**
  - Batched queries to fetch member profiles efficiently.
  - Updates and deletes with Firestore SDK.

---

## Best Practices & Tips

- Ensure Firestore security rules properly protect collections, restricting update/delete by team owners and members only.
- Use Firebase emulator suite for local testing.
- Cache user profiles locally for performance.
- Use React Suspense and lazy loading for improved user experience.
- Deploy as a PWA to allow offline usage and install capability.

---

## Contributors

- Your Name — Developer & Architect
- Team Members — Roles (if applicable)

---

## License

MIT License

---

## Contact

For questions or collaboration, contact [Your Email] or open an issue on GitHub.

---

This app can be extended with features like chat, notifications, project milestones, and analytics for richer hackathon team management experience.
