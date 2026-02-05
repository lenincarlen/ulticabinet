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
    <nav className="flex flex-col gap-2 px-2 py-4">
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
                  "flex items-center gap-3 transition-colors duration-200 outline-none",
                  isCollapsed ? "justify-center py-2" : "px-2 py-2",
                  isActive
                    ? "text-blue-900 font-bold bg-[#0037ff]/5 rounded-md"
                    : "text-[#1d1d1d]/70 hover:text-[#0037ff] hover:bg-[#0037ff]/5 rounded-md",
                  "group relative"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                {item.icon && (
                  <item.icon className={cn(
                    "shrink-0 transition-colors",
                    isCollapsed ? "h-6 w-6" : "h-5 w-5",
                    isActive ? "text-[#0037ff]" : "text-[#1d1d1d]/50 group-hover:text-[#0037ff]"
                  )} />
                )}
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left text-sm">
                      {item.title}
                    </span>
                    <ChevronRight className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      isExpanded && "rotate-90",
                      isActive ? "text-[#0037ff]" : "text-[#1d1d1d]/30 group-hover:text-[#0037ff]"
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
                  <div className="flex flex-col gap-1 mt-1 ml-4 pl-4 border-l border-gray-100">
                    {item.items?.map((subItem) => {
                      const isSubActive = isSubItemActive(subItem.url)
                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          className={cn(
                            "flex items-center gap-3 px-2 py-1.5 text-sm transition-colors duration-200",
                            isSubActive
                              ? "text-[#0037ff] font-bold bg-[#0037ff]/5 rounded-md"
                              : "text-[#1d1d1d]/70 hover:text-[#0037ff] hover:bg-[#0037ff]/5 rounded-md"
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
              "flex items-center gap-3 transition-colors duration-200 outline-none",
              isCollapsed ? "justify-center py-2" : "px-2 py-2",
              isActive
                ? "text-[#0037ff] font-bold bg-[#0037ff]/5 rounded-md"
                : "text-[#1d1d1d]/70 hover:text-[#0037ff] hover:bg-[#0037ff]/5 rounded-md",
              "group relative"
            )}
            title={isCollapsed ? item.title : undefined}
          >
            {item.icon && (
              <item.icon className={cn(
                "shrink-0 transition-colors",
                isCollapsed ? "h-6 w-6" : "h-5 w-5",
                isActive ? "text-[#0037ff]" : "text-[#1d1d1d]/50 group-hover:text-[#0037ff]"
              )} />
            )}
            {!isCollapsed && (
              <span className="text-sm">
                {item.title}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

