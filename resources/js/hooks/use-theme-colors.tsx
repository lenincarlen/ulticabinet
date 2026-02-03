import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useEffect } from 'react';

/**
 * Converts hex color to oklch format (simplified version)
 */
function hexToOklch(hex: string): string | null {
    if (!hex || !hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        return null;
    }

    // Remove # if present
    hex = hex.replace('#', '');

    // Convert 3-digit to 6-digit
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Convert RGB to linear RGB
    const toLinear = (c: number) => {
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);

    // Convert to XYZ
    const x = (rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375) * 100;
    const y = (rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.0721750) * 100;
    const z = (rLinear * 0.0193339 + gLinear * 0.1191920 + bLinear * 0.9503041) * 100;

    // Convert XYZ to Lab
    const xn = 95.047;
    const yn = 100.0;
    const zn = 108.883;

    const fx = x / xn > 0.008856 ? Math.pow(x / xn, 1/3) : (7.787 * x / xn + 16/116);
    const fy = y / yn > 0.008856 ? Math.pow(y / yn, 1/3) : (7.787 * y / yn + 16/116);
    const fz = z / zn > 0.008856 ? Math.pow(z / zn, 1/3) : (7.787 * z / zn + 16/116);

    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const bLab = 200 * (fy - fz);

    // Convert Lab to LCH
    const c = Math.sqrt(a * a + bLab * bLab);
    const h = Math.atan2(bLab, a) * 180 / Math.PI;
    const hNormalized = h < 0 ? h + 360 : h;

    // Convert to OKLCH (approximation)
    const lOk = l / 100;
    const cOk = c / 150; // Rough approximation
    const hOk = hNormalized;

    return `oklch(${lOk.toFixed(3)} ${cOk.toFixed(3)} ${hOk.toFixed(1)})`;
}

/**
 * Applies theme colors from settings to CSS variables
 */
export function applyThemeColors(siteSettings: Record<string, string> | undefined) {
    if (!siteSettings) return;

    const root = document.documentElement;

    // Primary color
    if (siteSettings.theme_primary_color) {
        const oklch = hexToOklch(siteSettings.theme_primary_color);
        if (oklch) {
            root.style.setProperty('--primary', oklch);
            // Calculate primary-foreground based on brightness
            const hex = siteSettings.theme_primary_color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            root.style.setProperty('--primary-foreground', 
                brightness > 128 ? 'oklch(0.141 0.005 285.823)' : 'oklch(0.969 0.016 293.756)');
        }
    }

    // Secondary color
    if (siteSettings.theme_secondary_color) {
        const oklch = hexToOklch(siteSettings.theme_secondary_color);
        if (oklch) {
            root.style.setProperty('--secondary', oklch);
            const hex = siteSettings.theme_secondary_color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            root.style.setProperty('--secondary-foreground', 
                brightness > 128 ? 'oklch(0.141 0.005 285.823)' : 'oklch(0.969 0.016 293.756)');
        }
    }

    // Accent color
    if (siteSettings.theme_accent_color) {
        const oklch = hexToOklch(siteSettings.theme_accent_color);
        if (oklch) {
            root.style.setProperty('--accent', oklch);
            const hex = siteSettings.theme_accent_color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            root.style.setProperty('--accent-foreground', 
                brightness > 128 ? 'oklch(0.141 0.005 285.823)' : 'oklch(0.969 0.016 293.756)');
        }
    }

    // Font family
    if (siteSettings.theme_font_family) {
        root.style.setProperty('--font-sans', siteSettings.theme_font_family);
    }

    // Background color
    if (siteSettings.theme_background_color) {
        const oklch = hexToOklch(siteSettings.theme_background_color);
        if (oklch) {
            root.style.setProperty('--background', oklch);
        }
    }

    // Foreground color
    if (siteSettings.theme_foreground_color) {
        const oklch = hexToOklch(siteSettings.theme_foreground_color);
        if (oklch) {
            root.style.setProperty('--foreground', oklch);
        }
    }

    // Border color
    if (siteSettings.theme_border_color) {
        const oklch = hexToOklch(siteSettings.theme_border_color);
        if (oklch) {
            root.style.setProperty('--border', oklch);
        }
    }

    // Card colors
    if (siteSettings.theme_card_color) {
        const oklch = hexToOklch(siteSettings.theme_card_color);
        if (oklch) {
            root.style.setProperty('--card', oklch);
        }
    }

    if (siteSettings.theme_card_foreground_color) {
        const oklch = hexToOklch(siteSettings.theme_card_foreground_color);
        if (oklch) {
            root.style.setProperty('--card-foreground', oklch);
        }
    }
}

/**
 * Hook to apply theme colors from site settings
 */
export function useThemeColors() {
    const { siteSettings } = usePage<SharedData>().props;

    useEffect(() => {
        applyThemeColors(siteSettings);
    }, [siteSettings]);
}



