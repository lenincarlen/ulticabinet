"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { Link, usePage } from '@inertiajs/react'
import { type NavItem } from '@/types'
import { cn } from "@/lib/utils"

export function NavMain({
  items,
  isCollapsed = false,
}: {
  items: NavItem[]
  isCollapsed?: boolean
}) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const { url } = usePage()

  const toggleItem = (itemTitle: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemTitle)) {
      newExpanded.delete(itemTitle)
    } else {
      newExpanded.add(itemTitle)
    }
    setExpandedItems(newExpanded)
  }

  const isItemActive = (item: NavItem) => {
    if (item.href && url === item.href) return true
    if (item.items) {
      return item.items.some(subItem => url === subItem.url)
    }
    return false
  }

  const isSubItemActive = (subItemUrl: string) => {
    return url === subItemUrl
  }

  return (
    <nav className="flex flex-col gap-1 px-2 py-2">
      {items.map((item) => {
        const hasSubItems = item.items && item.items.length > 0
        const isExpanded = expandedItems.has(item.title)
        const isActive = isItemActive(item)

        if (hasSubItems) {
          return (
            <div key={item.title} className="flex flex-col">
              {/* Parent Item */}
              <button
                onClick={() => !isCollapsed && toggleItem(item.title)}
                className={cn(
                  "flex items-center gap-3 rounded-lg transition-all duration-200",
                  isCollapsed ? "justify-center p-2" : "px-3 py-2.5",
                  "hover:bg-accent/50 active:scale-[0.98]",
                  "group relative",
                  isActive && "bg-accent font-medium"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                {item.icon && (
                  <item.icon className={cn(
                    "h-6 w-6 shrink-0 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )} />
                )}
                {!isCollapsed && (
                  <>
                    <span className={cn(
                      "flex-1 text-left text-sm transition-colors",
                      isActive ? "text-foreground font-medium" : "text-foreground"
                    )}>
                      {item.title}
                    </span>
                    <ChevronRight className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-200",
                      isExpanded && "rotate-90",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )} />
                  </>
                )}
              </button>

              {/* Submenu - Animated (only when not collapsed) */}
              {!isCollapsed && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="flex flex-col gap-0.5 mt-1 ml-3 pl-6 border-l-2 border-border/50">
                    {item.items?.map((subItem) => {
                      const isSubActive = isSubItemActive(subItem.url)
                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            "hover:bg-accent/50 active:scale-[0.98]",
                            "text-sm",
                            isSubActive
                              ? "bg-accent/70 text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        }

        // Simple item without subitems
        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg transition-all duration-200",
              isCollapsed ? "justify-center p-2" : "px-3 py-2.5",
              "hover:bg-accent/50 active:scale-[0.98]",
              "group relative",
              isActive && "bg-accent font-medium"
            )}
            title={isCollapsed ? item.title : undefined}
          >
            {item.icon && (
              <item.icon className={cn(
                "h-6 w-6 shrink-0 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )} />
            )}
            {!isCollapsed && (
              <span className={cn(
                "text-sm transition-colors",
                isActive ? "text-foreground font-medium" : "text-foreground"
              )}>
                {item.title}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
