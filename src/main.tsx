import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from './pages/index.ts';
import { AuthLayout } from './components/index.ts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  < React.StrictMode >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode >,
);