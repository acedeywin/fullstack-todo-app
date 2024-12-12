import ClientProviders from '../components/ClientProviders';

export const metadata = {
  title: 'To-Do App',
  description: 'A modern, To-Do application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
