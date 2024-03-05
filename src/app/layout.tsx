import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Toaster } from 'sonner'
import Providers from "@/providers";
import "./globals.scss";

const noto = Noto_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-zen',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: 'MJ planner',
    template: `%s | MJ planner`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${noto.className} text-light`}>
        <Providers>
          {children}
          <Toaster theme="dark" position="bottom-right" duration={1500} />
        </Providers>
      </body>
    </html>
  );
}
