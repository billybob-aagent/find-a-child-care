import "./globals.css";

export const metadata = {
    title: "Find a Child Care",
    description: "Child care search app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="font-sans">
            <head>
                {/* Link to fonts.css from the public folder */}
                <link rel="stylesheet" href="/fonts/fonts.css" />
            </head>
            <body>{children}</body>
        </html>
    );
}
