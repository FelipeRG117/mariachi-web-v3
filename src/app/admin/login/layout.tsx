/**
 * Admin Login Layout
 *
 * Separate layout for login page (no sidebar, no auth check)
 */

'use client';

import { AuthProvider } from '@/lib/auth/AuthContext';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
