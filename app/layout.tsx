import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hackjklu.com"),
  title: "HackJKLU v4.0",
  description:
    "HackJKLU v4.0 is a high-energy offline hackathon happening from March 7-9, 2025, at JK Lakshmipat University. Compete for cash prizes worth up to Rs. 2,00,000!",
  keywords: [
    "Hackathon",
    "JK Lakshmipat University",
    "HackJKLU",
    "Coding",
    "Tech",
    "Competition",
    "Cash Prizes",
    "Devfolio",
    "Web Development",
    "Hackathon",
    "Cyber Security",
    "AI/ML",
    "IoT",
    "Game Development",
    "AR/VR",
  ],
  authors: [
    {
      name: "Preet Taparia, Team HackJKLU, Council of Technical Affairs, JKLU",
    },
  ],
  openGraph: {
    title: "HackJKLU v4.0",
    description:
      "Join HackJKLU v4.0, a dynamic offline hackathon from March 7-9, 2025, with cash prizes and the chance to showcase your tech skills!",
    url: "https://www.hackjklu.com",
    type: "website",
  },
  twitter: {
    title: "HackJKLU v4.0",
    description:
      "HackJKLU v4.0 is a high-energy, offline hackathon with exciting prizes and opportunities for college students, school students, and tech enthusiasts!",
    card: "summary_large_image",
  },
  other: {
    "google-site-verification": "8n02rwqYXn26PtramspGciQKyueVuaY-IvEt05wSnMw",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
