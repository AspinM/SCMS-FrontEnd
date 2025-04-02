import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactClientQuery } from "@/Query/ReactClientQuery";



import {Providers}  from '../app/Redux/Provider'


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // Include all potential weights
});
                                                                                                        

export const metadata: Metadata = {
  title: "SETLD WEB APP",
  description: "SETLD web application",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactClientQuery>
      <Providers>
        <html lang="en">
          <body className={roboto.className}>
            {children}
          </body>
        </html>
      </Providers>
    </ReactClientQuery>
  );
}
