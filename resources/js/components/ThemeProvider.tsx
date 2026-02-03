import { useThemeColors } from '@/hooks/use-theme-colors';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Apply theme colors from settings
    useThemeColors();

    return <>{children}</>;
}
