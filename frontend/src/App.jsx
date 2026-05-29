import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleBasedRoute from "./components/RoleBasedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Chat from "./pages/Chat.jsx";
import Notifications from "./pages/Notifications.jsx";
import Reviews from "./pages/Reviews.jsx";
import Disputes from "./pages/Disputes.jsx";
import NotFound from "./pages/NotFound.jsx";

import ClientDashboard from "./pages/client/ClientDashboard.jsx";
import CreateGig from "./pages/client/CreateGig.jsx";
import MyGigs from "./pages/client/MyGigs.jsx";
import GigProposals from "./pages/client/GigProposals.jsx";
import ClientPayments from "./pages/client/ClientPayments.jsx";

import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard.jsx";
import FreelancerProfile from "./pages/freelancer/FreelancerProfile.jsx";
import BrowseGigs from "./pages/freelancer/BrowseGigs.jsx";
import ApplyGig from "./pages/freelancer/ApplyGig.jsx";
import MyProposals from "./pages/freelancer/MyProposals.jsx";
import Availability from "./pages/freelancer/Availability.jsx";
import FreelancerAnalytics from "./pages/freelancer/FreelancerAnalytics.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import VerifyFreelancers from "./pages/admin/VerifyFreelancers.jsx";
import ManageGigs from "./pages/admin/ManageGigs.jsx";
import PaymentMonitoring from "./pages/admin/PaymentMonitoring.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";

const App = () => (
  <>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/client/dashboard" element={<RoleBasedRoute role="client"><ClientDashboard /></RoleBasedRoute>} />
        <Route path="/client/create-gig" element={<RoleBasedRoute role="client"><CreateGig /></RoleBasedRoute>} />
        <Route path="/client/my-gigs" element={<RoleBasedRoute role="client"><MyGigs /></RoleBasedRoute>} />
        <Route path="/client/gigs/:gigId/proposals" element={<RoleBasedRoute role="client"><GigProposals /></RoleBasedRoute>} />
        <Route path="/client/payments" element={<RoleBasedRoute role="client"><ClientPayments /></RoleBasedRoute>} />

        <Route path="/freelancer/dashboard" element={<RoleBasedRoute role="freelancer"><FreelancerDashboard /></RoleBasedRoute>} />
        <Route path="/freelancer/profile" element={<RoleBasedRoute role="freelancer"><FreelancerProfile /></RoleBasedRoute>} />
        <Route path="/freelancer/browse-gigs" element={<RoleBasedRoute role="freelancer"><BrowseGigs /></RoleBasedRoute>} />
        <Route path="/freelancer/apply/:gigId" element={<RoleBasedRoute role="freelancer"><ApplyGig /></RoleBasedRoute>} />
        <Route path="/freelancer/proposals" element={<RoleBasedRoute role="freelancer"><MyProposals /></RoleBasedRoute>} />
        <Route path="/freelancer/availability" element={<RoleBasedRoute role="freelancer"><Availability /></RoleBasedRoute>} />
        <Route path="/freelancer/analytics" element={<RoleBasedRoute role="freelancer"><FreelancerAnalytics /></RoleBasedRoute>} />

        <Route path="/admin/dashboard" element={<RoleBasedRoute role="admin"><AdminDashboard /></RoleBasedRoute>} />
        <Route path="/admin/users" element={<RoleBasedRoute role="admin"><ManageUsers /></RoleBasedRoute>} />
        <Route path="/admin/verify-freelancers" element={<RoleBasedRoute role="admin"><VerifyFreelancers /></RoleBasedRoute>} />
        <Route path="/admin/gigs" element={<RoleBasedRoute role="admin"><ManageGigs /></RoleBasedRoute>} />
        <Route path="/admin/payments" element={<RoleBasedRoute role="admin"><PaymentMonitoring /></RoleBasedRoute>} />
        <Route path="/admin/analytics" element={<RoleBasedRoute role="admin"><AdminAnalytics /></RoleBasedRoute>} />

        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
        <Route path="/disputes" element={<ProtectedRoute><Disputes /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </>
);

export default App;
