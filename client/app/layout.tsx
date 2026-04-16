import type { Metadata } from 'next';
import './index.css';
import CursorOverlay from './animations/cursor/CursorOverlay';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <CursorOverlay /> */}
      </body>
    </html>
  );
}
