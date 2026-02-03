import ThemeProvider from '@/components/ThemeProvider';
import { type ReactNode } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';

interface TechnicianLayoutProps {
    children: ReactNode;
}

export default ({ children }: TechnicianLayoutProps) => (
    <ThemeProvider>
        <AppShell variant="header">
            <AppHeader />
            <AppContent variant="header" className="bg-background">
                {children}
            </AppContent>
        </AppShell>
    </ThemeProvider>
);
