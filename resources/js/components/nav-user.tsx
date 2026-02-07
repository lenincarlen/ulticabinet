import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavUser({ isCollapsed = false }: { isCollapsed?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    if (isCollapsed) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            "flex items-center justify-center w-full p-2 rounded-lg text-gray-400 hover:text-white",
                            "hover:bg-white/5 transition-all duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        )}
                        data-test="sidebar-menu-button-collapsed"
                        title={auth.user?.name || 'Usuario'}
                    >
                        <User className="h-5 w-5" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 rounded-lg"
                    align="end"
                    side="right"
                >
                    <UserMenuContent user={auth.user} />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 w-full rounded-lg text-left text-gray-400 hover:text-white",
                        "hover:bg-white/5 transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                    data-test="sidebar-menu-button"
                >
                    <UserInfo user={auth.user} />
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 rounded-lg"
                align="end"
                side="top"
            >
                <UserMenuContent user={auth.user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
