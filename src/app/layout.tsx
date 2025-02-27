import type { Metadata } from 'next';
import ThemeRegistry from '../components/ThemeRegistry';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Plataforma de Prestadores Médicos',
  description: 'Sistema de gestión de prestadores médicos y servicios de salud',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          {children}
          <Toaster />
        </ThemeRegistry>
      </body>
    </html>
  );
}