import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function AppLogo() {
    const { siteSettings } = usePage<SharedData>().props;
    const [imageError, setImageError] = useState(false);

    const logoPath = siteSettings?.company_logo
        ? (siteSettings.company_logo.startsWith('storage/') || siteSettings.company_logo.startsWith('images/')
            ? `/${siteSettings.company_logo}`
            : `/storage/${siteSettings.company_logo}`)
        : '/images/ulticabinet-logo.png';

    const companyName = siteSettings?.company_name || 'Mister Services RD';
    const initials = companyName.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();

    return (
        <>
            <div className="flex aspect-square w-full h-full items-center justify-center  rounded-full  overflow-hidden  ">
                {!imageError ? (
                    <img
                        src={logoPath}
                        width={32}
                        height={32}
                        alt={`${companyName} Logo`}
                        className="w-full h-full object-contain   "
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-sidebar-primary-foreground font-bold">
                        {initials}
                    </div>
                )}
            </div>

        </>
    );
}
