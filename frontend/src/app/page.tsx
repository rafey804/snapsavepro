import { redirect } from 'next/navigation';
import { i18n } from '@/i18n/config';

// This page only renders when the user is at the root URL
// The middleware will handle redirects, but this provides a fallback
export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}
