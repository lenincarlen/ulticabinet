import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const StaffManagement: React.FC = () => {
  console.log('StaffManagement component is rendering');
  return (
    <AppLayout>
      <Head title="Staff Management" />
      <div>
        <h1>Staff Management</h1>
        <p>This is the Staff Management page.</p>
      </div>
    </AppLayout>
  );
};

export default StaffManagement;