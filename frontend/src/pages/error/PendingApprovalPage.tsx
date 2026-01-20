import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PendingApprovalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-900 mb-4">Pending Approval</h1>
        <p className="text-yellow-800 mb-8 max-w-md">
          Your alumni account is currently pending approval by an administrator. Please check back
          later.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
