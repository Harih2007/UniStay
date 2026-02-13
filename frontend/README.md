# UniStay Frontend

A modern React frontend for the UniStay student housing platform, built with Vite, Tailwind CSS, and React Router.

## Features

- 🏠 **Property Search**: Search for student housing by location
- 🗺️ **Interactive Maps**: View property locations with Leaflet.js
- 👤 **User Authentication**: JWT-based login/signup with role-based access
- 🏢 **Owner Dashboard**: Property owners can manage their listings
- 👨‍💼 **Admin Panel**: Admin verification system for property listings
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🔔 **Notifications**: Toast notifications for user feedback
- 🛡️ **Protected Routes**: Role-based route protection (student/owner/admin)

## Tech Stack

- **React 18** with Vite for fast development
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Leaflet** for maps
- **React Toastify** for notifications
- **JWT** authentication stored in localStorage

## Prerequisites

- Node.js 16+ and npm/yarn
- UniStay backend running on `http://127.0.0.1:8000`

## Installation

1. **Clone and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Backend API URL

The frontend is configured to connect to the backend at `http://127.0.0.1:8000/api`. To change this:

1. Open `src/api/axiosInstance.js`
2. Update the `API_BASE_URL` constant:
   ```javascript
   const API_BASE_URL = 'your-backend-url/api';
   ```

### Environment Variables (Optional)

Create a `.env` file in the frontend directory for environment-specific configuration:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
```

## Project Structure

```
src/
├── api/
│   └── axiosInstance.js      # Axios configuration with interceptors
├── components/
│   ├── Navbar.jsx           # Navigation component
│   ├── Footer.jsx           # Footer component
│   ├── RoomCard.jsx         # Room listing card
│   ├── RoomGallery.jsx      # Image gallery component
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── context/
│   └── AuthContext.jsx      # Authentication context
├── pages/
│   ├── Home.jsx             # Home page with search
│   ├── RoomDetails.jsx      # Room details with map
│   ├── Login.jsx            # Login page
│   ├── Signup.jsx           # Registration page
│   ├── OwnerDashboard.jsx   # Owner property management
│   ├── AdminDashboard.jsx   # Admin verification panel
│   ├── Profile.jsx          # User profile management
│   └── NotFound.jsx         # 404 page
├── utils/
│   ├── helpers.js           # Utility functions
│   └── geocode.js           # Location utilities
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css                # Global styles
```

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Rooms
- `GET /api/rooms` - Search rooms (with location query)
- `GET /api/rooms/{id}` - Get room details
- `GET /api/rooms/mine` - Get owner's rooms
- `POST /api/rooms` - Create new room (owner)
- `PUT /api/rooms/{id}` - Update room (owner)
- `DELETE /api/rooms/{id}` - Delete room (owner)
- `POST /api/rooms/{id}/inquiries` - Contact owner

### User Management
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update user profile

### Admin
- `GET /api/admin/rooms` - Get unverified rooms
- `PATCH /api/admin/verify/{id}` - Verify/reject room

## User Roles & Access

### Student
- Search and view rooms
- Contact property owners
- Manage profile

### Owner
- All student features
- Create, edit, delete property listings
- Access owner dashboard at `/owner`

### Admin
- All user features
- Access admin verification panel at `/admin/verify`
- Approve/reject property listings

## Features in Detail

### Search & Discovery
- Location-based room search
- Featured rooms on homepage
- Responsive room cards with images
- Verified property badges

### Property Details
- Image gallery with navigation
- Interactive Leaflet maps
- Owner contact information
- Amenities listing
- One-click inquiry system

### Owner Dashboard
- CRUD operations for property listings
- Real-time status updates (pending/verified/rejected)
- Image upload support
- Amenities management

### Admin Panel
- Review pending property listings
- Approve or reject with optional reasons
- Owner contact information for verification
- Bulk actions for efficient moderation

## Styling & UI

- **Mobile-first responsive design**
- **Tailwind CSS** utility classes
- **Custom component classes** for consistency
- **Loading states** and error handling
- **Accessible forms** with validation
- **Toast notifications** for user feedback

## Authentication Flow

1. User logs in via `/login`
2. JWT token stored in localStorage
3. Token automatically attached to API requests
4. Protected routes check authentication status
5. Role-based access control for owner/admin features
6. Automatic logout on token expiration

## Development Tips

1. **Hot Reload**: Vite provides instant hot reload during development
2. **API Errors**: Check browser console for detailed API error messages
3. **Authentication**: Use browser dev tools to inspect localStorage for tokens
4. **Maps**: Ensure proper latitude/longitude data for map functionality
5. **Images**: Placeholder images are used when room images fail to load

## Production Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Preview the build:**
   ```bash
   npm run preview
   ```

3. **Deploy the `dist` folder** to your hosting service

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend is running on `http://127.0.0.1:8000`
   - Check CORS configuration on backend
   - Verify API endpoints match backend routes

2. **Authentication Issues**
   - Clear localStorage if experiencing login problems
   - Check JWT token expiration
   - Verify backend authentication endpoints

3. **Map Not Loading**
   - Check internet connection for map tiles
   - Ensure latitude/longitude values are valid numbers
   - Verify Leaflet CSS is properly loaded

4. **Image Upload Issues**
   - Ensure backend image upload endpoint is configured
   - Check file size limits
   - Verify Cloudinary configuration if using cloud storage

## Contributing

1. Follow the existing code style and structure
2. Add proper error handling for new features
3. Include loading states for async operations
4. Test responsive design on mobile devices
5. Update this README for any new features or configuration changes

## License

This project is part of the UniStay platform. All rights reserved.