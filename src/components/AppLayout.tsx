
import React from 'react';
import { AppHeader } from './AppHeader';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type AppLayoutProps = {
  children: React.ReactNode;
  title?: string;
  requireAuth?: boolean;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  requireAuth = true,
}) => {
  const { user, isLoading } = useAuth();

  // If authentication is required and user is not logged in, redirect to login
  if (requireAuth && !isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader title={title} />
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};
