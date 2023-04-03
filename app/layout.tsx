import { Nunito } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'AirBnB',
  description:
    '191 ülkedeki yerel ev sahipleriyle birlikte kalmak için benzersiz yerler bulun. Airbnb ile her yere ait olun.',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
