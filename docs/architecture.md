PrepPilot/
│
├── client/                     # Frontend (React)
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Button, Modal, Loader
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── dashboard/      # Dashboard widgets
│   │   │   ├── interview/      # Mock interview UI
│   │   │   ├── resume/         # Resume upload & view
│   │   │   └── admin/          # Admin-only components
│   │   │
│   │   ├── pages/              # Route-level pages
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── hooks/              # Custom hooks
│   │   ├── context/            # Auth & global state
│   │   ├── services/           # API calls (Axios)
│   │   ├── utils/              # Helper functions
│   │   ├── routes/             # Protected routes
│   │   ├── styles/             # Tailwind / global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/                     # Backend (Node + Express)
│   ├── src/
│   │   ├── config/             # DB, Cloudinary, AI config
│   │   │   ├── db.js
│   │   │   ├── cloudinary.js
│   │   │   └── gemini.js
│   │   │
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Resume.js
│   │   │   ├── Interview.js
│   │   │   └── Session.js
│   │   │
│   │   ├── controllers/        # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── resume.controller.js
│   │   │   ├── interview.controller.js
│   │   │   └── admin.controller.js
│   │   │
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── resume.routes.js
│   │   │   ├── interview.routes.js
│   │   │   └── admin.routes.js
│   │   │
│   │   ├── middlewares/        # Auth, RBAC, validation
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── services/           # AI & business services
│   │   │   ├── ai.service.js
│   │   │   ├── resumeParser.js
│   │   │   └── recommendation.service.js
│   │   │
│   │   ├── utils/              # Helpers & constants
│   │   ├── validators/         # Zod / Joi schemas
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── docs/                       # Documentation
│   ├── architecture.md
│   ├── api.md
│   └── screenshots/
│
├── .gitignore
├── README.md
└── docker-compose.yml (optional)
