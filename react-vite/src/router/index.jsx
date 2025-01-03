import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
// import ListEvents from '../components/ListEvents';
import EventDetails from '../components/EventDetails';
import EditProfileModal from '../components/EditProfileModal';
import UpcominngEvents from '../components/UpcomingEvents';
import ProfilePage from '../components/ProfilePage';
import Layout from './Layout';
import GroupComponent from '../components/GroupComponent';

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
      // {
      //   path: "events/:eventId",
      //   element: <ListEvents />,
      // },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "profile/edit",
        element: <EditProfileModal />,
      },
      {
        path: "profile/rsvps",
        element: <UpcominngEvents />,
      },
      {
        path: "groups/new",
        element: <GroupComponent />,
      },
    ],
  },
]);