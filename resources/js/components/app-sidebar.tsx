import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BadgeDollarSignIcon,
    BarChart,
    BookOpen,
    Calendar1Icon,
    ComputerIcon,
    FileBarChart,
    FileText,
    Globe2,
    LayoutGrid,
    Menu,
    Package,
    PersonStandingIcon,
    Settings,
    SwatchBook,
    User2Icon,
    Users,
    X
} from 'lucide-react';
import LogoAppAdmin from './app-logo-admin';
import { type SharedData } from '@/types';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { title } from 'process';
import AppLogoAdmin from './app-logo-admin';

// Definir items del menú con roles permitidos
interface NavItemWithRoles extends NavItem {
    allowedRoles?: string[];
    allowedRolesForSubItems?: { [key: string]: string[] };
}

const allNavItems: NavItemWithRoles[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        allowedRoles: ['admin', 'operador', 'vendedor', 'tecnico'],
    },


    {
        title: "Clientes",
        href: "#",
        icon: User2Icon,
        allowedRoles: ['admin', 'operador', 'vendedor'],
        items: [
            {
                title: "Clientes",
                url: "/admin/customers",
            },
        ],
    },
    {
        title: 'Leads',
        href: '#',
        icon: Calendar1Icon,
        allowedRoles: ['admin', 'operador'],
        items: [
            {
                title: "Leads Management",
                url: "/admin/demo-requests?status=new",
            },

            {
                title: "Canceladas - Lost",
                url: "/admin/demo-requests?status=cancelled",
            },
        ],
    },



    {
        title: "Reportes",
        href: "#",
        icon: BarChart,
        allowedRoles: ['admin'],
        items: [
            {
                title: "Dashboard",
                url: "/reportes",
            },
            {
                title: "Ventas",
                url: "/reportes/ventas",
            },



            {
                title: "Clientes",
                url: "/reportes/clientes",
            },
        ],
    },
    {
        title: "Blog",
        href: "/admin/posts",
        icon: BookOpen,
        allowedRoles: ['admin'],
        items: [
            {
                title: "Entradas",
                url: "/admin/posts",
            },
            {
                title: "Nueva Entrada",
                url: "/admin/posts/create",
            },
        ],
    },
    {
        title: "Soluciones",
        href: "/admin/solutions",
        icon: Users,
        allowedRoles: ['admin'],
    },
    {
        title: "Servicios",
        href: "/admin/services",
        icon: BookOpen,
        allowedRoles: ['admin'],
    },
    {
        title: 'Usuarios',
        href: '/admin/users',
        icon: Users,
        allowedRoles: ['admin'],
        items: [
            {
                title: "Usuarios",
                url: "/admin/users",
            },
            {
                title: "Roles",
                url: "/roles",
            },
        ],
    },
    {
        title: "Ajustes generales",
        href: "/admin/configuracion/sitio",
        icon: Settings,
        allowedRoles: ['admin'],
    }
];

function normalizeRoles(userRoles: string[] | undefined): string[] {
    if (!userRoles || userRoles.length === 0) {
        return [];
    }

    return userRoles.map(role => {
        const normalized = role.toLowerCase();
        if (normalized === 'administrator') return 'admin';
        if (normalized === 'operator' || normalized === 'operador') return 'operador';
        if (normalized === 'technician' || normalized === 'tecnico') return 'tecnico';
        if (normalized === 'seller' || normalized === 'vendedor') return 'vendedor';
        return normalized;
    });
}

function filterNavItemsByRole(items: NavItemWithRoles[], userRoles: string[] | undefined): NavItem[] {
    if (!userRoles || userRoles.length === 0) {
        return [];
    }

    const normalizedRoles = normalizeRoles(userRoles);

    return items
        .filter(item => {
            if (!item.allowedRoles) {
                return false;
            }
            const normalizedAllowedRoles = item.allowedRoles.map(r => {
                const normalized = r.toLowerCase();
                if (normalized === 'administrator') return 'admin';
                if (normalized === 'operator' || normalized === 'operador') return 'operador';
                if (normalized === 'technician' || normalized === 'tecnico') return 'tecnico';
                if (normalized === 'seller' || normalized === 'vendedor') return 'vendedor';
                return normalized;
            });
            return normalizedRoles.some(role => normalizedAllowedRoles.includes(role));
        })
        .map(item => {
            if (item.items && item.items.length > 0) {
                const filteredSubItems = item.items.filter(subItem => {
                    if (item.allowedRolesForSubItems && item.allowedRolesForSubItems[subItem.title]) {
                        const subItemRoles = item.allowedRolesForSubItems[subItem.title].map(r => {
                            const normalized = r.toLowerCase();
                            if (normalized === 'administrator') return 'admin';
                            if (normalized === 'operator' || normalized === 'operador') return 'operador';
                            if (normalized === 'technician' || normalized === 'tecnico') return 'tecnico';
                            if (normalized === 'seller' || normalized === 'vendedor') return 'vendedor';
                            return normalized;
                        });
                        return normalizedRoles.some(role => subItemRoles.includes(role));
                    }
                    return true;
                });

                return {
                    ...item,
                    items: filteredSubItems,
                };
            }
            return item;
        });
}

const footerNavItems: NavItem[] = [
    {
        title: 'Site',
        href: 'https://misterservice.com',
        icon: Globe2,
    },
    {
        title: 'Documentacion',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRoles = auth.user?.roles || [];
    const [isCollapsed, setIsCollapsed] = useState(false);

    const filteredNavItems = useMemo(() => {
        return filterNavItemsByRole(allNavItems, userRoles);
    }, [userRoles]);

    return (
        <aside className={cn(
            "flex h-screen flex-col transition-all duration-300 ease-in-out border-r border-2 border-gray-700",
            "bg-[#2d3748] text-white",
            isCollapsed ? "w-16" : "w-64"
        )}>
            {/* Header */}
            <div className="flex h-16 items-center border-b border-gray-700 px-4 bg-[#1a202c]">
                {!isCollapsed && (
                    <Link href={dashboard()} className="flex items-center gap-2 flex-1">
                        <AppLogoAdmin />
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        "flex items-center justify-center rounded-lg p-2",
                        "hover:bg-accent/50 transition-colors",
                        isCollapsed && "w-full"
                    )}
                    aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
                >
                    {isCollapsed ? (
                        <Menu className="h-5 w-5" />
                    ) : (
                        <X className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-y-auto">
                <NavMain items={filteredNavItems} isCollapsed={isCollapsed} />
            </div>

            {/* Footer */}
            <div className="border-t">
                {!isCollapsed && (
                    <>
                        <NavFooter items={footerNavItems} className="p-2" />
                        <div className="border-t">
                            <NavUser />
                        </div>
                    </>
                )}
                {isCollapsed && (
                    <div className="p-2">
                        <NavUser isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>
        </aside>
    );
}
