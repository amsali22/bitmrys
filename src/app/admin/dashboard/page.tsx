import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardClient from '@/components/admin/dashboard-client';

export default async function AdminDashboard() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect('/admin/login');
  }

  return (
    <DashboardClient
      user={{
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      }}
    />
  );
}
