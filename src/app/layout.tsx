import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Solace Candidate Assignment',
    description: 'Show us what you got',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className='h-full bg-gray-100' lang='en'>
            <body className={`${inter.className} h-full`}>
                <div className='min-h-full'>
                    <header className='bg-white shadow-sm'>
                        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                                Solace Advocates
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}
