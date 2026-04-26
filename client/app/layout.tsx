import type { Metadata } from 'next';
import './index.css';
import Wrapper from './Wrapper';

export const metadata: Metadata = {
  title: 'reservation @mj',
  description: "Marc Joemil Mendoza's Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
