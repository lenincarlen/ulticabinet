import React from 'react';
import { Head } from '@inertiajs/react';

interface PosLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PosLayout({ children, title = 'Caja Registradora' }: PosLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {children}
            </div>
        </>
    );
}
