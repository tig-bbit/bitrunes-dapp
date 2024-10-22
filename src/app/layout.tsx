import "./globals.css";

import type { Metadata } from "next";
import { fontInter } from "~/shared/assets/fonts/inter";
import { cn } from "~/shared/lib/utils";
import { fontManrope } from "~/shared/assets/fonts/manrope";
import { ThemeProvider } from "./_theme";
import { PageRoot } from "~/pages/root";
import TanstackQueryProvider from "./_providers";
import { Toaster } from "~/shared/ui/common";
import { WalletProvider } from "./_providers/wallet-provider";

export const metadata: Metadata = {
  title: 'BitRunes',
  description: 'Etching Begins With BitRunes',
  keywords: 'BitRunes, Etching',
  openGraph: {
    type: "website",
    url: "https://bitrunes.net/",
    title: "Bitrunes",
    description: "Etching Begins With BitRunes",
    siteName: "BitRunes",
    images: [{
      url: "https://app.bitrunes.net/images/bitrunes-og.png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://bitrunes.net/",
    title: "Bitrunes",
    description: "Etching Begins With BitRunes",
    images: "https://app.bitrunes.net/images/bitrunes-og.png"
  }
};

const fontVariables = [fontInter.variable, fontManrope.variable];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={cn(...fontVariables, "bg-body light:bg-white-gradient")}
        style={{
          backgroundImage:
            "radial-gradient(rgb(189 189 189 / 4%) -25%, rgba(255, 255, 255, 0))",
        }}
      >
        <TanstackQueryProvider>
          <WalletProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <PageRoot>{children}</PageRoot>

              <Toaster />
            </ThemeProvider>
          </WalletProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
