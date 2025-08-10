import React from 'react';
import AdminCMS from '@/components/AdminCMS';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { isAdmin, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirigir si no es admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <AdminCMS />;
};

export default AdminPage;
