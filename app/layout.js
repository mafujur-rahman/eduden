// app/layout.js
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";

import { Lexend } from "next/font/google";
import localFont from "next/font/local";
import ClientWrapper from "./ClientWrapper";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const gucina = localFont({
  src: "./font/gucina.bold.otf",
  variable: "--font-gucina",
});

export const metadata = {
  title: "eduden | Home",
  description: "Best course platform in kolkata",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        data-new-gr-c-s-check-loaded="14.1264.0"
        cz-shortcut-listen="true"
        data-gr-ext-installed=""
        className={`${lexend.variable} ${gucina.variable} antialiased bg-[#010101] text-white`}
      >
        <ClientWrapper>
          <Navbar />
          {children}
          <Footer />
        </ClientWrapper>

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-0E6MDVDWR9" />

        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1503986430687883');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1503986430687883&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </body>
    </html>
  );
}
