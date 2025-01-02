import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import EventsIndex from '../components/EventsIndex';
import EventDetails from '../components/EventDetails';
import EditProfileModal from '../components/EditProfileModal';
import UpcominngEvents from '../components/UpcomingEvents';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "events",
        element: <EventDetails />,
      },
      {
        path: "events/:eventId",
        element: <EventsIndex />,
      },
      {
        path: "events/:eventId",
        element: <EventsIndex />,
      },
      {
        path: "profile/edit",
        element: <EditProfileModal />,
      },
      {
        path: "profile/rsvps",
        element: <UpcominngEvents />,
      },
    ],
  },
]);