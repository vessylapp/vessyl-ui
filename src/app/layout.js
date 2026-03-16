import "./globals.css";

export const metadata = {
    title: "Vessyl",
    description: "A fast and reliable alternative to Railway and Vercel.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
