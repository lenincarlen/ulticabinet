import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { cn } from '@/lib/utils';

export function NavFooter({
    items,
    className,
}: {
    items: NavItem[];
    className?: string;
}) {
    return (
        <nav className={cn("flex flex-col gap-1", className)}>
            {items.map((item) => (
                <a
                    key={item.title}
                    href={resolveUrl(item.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                >
                    {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                    <span>{item.title}</span>
                </a>
            ))}
        </nav>
    );
}
