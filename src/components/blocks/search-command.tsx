"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Home,
  Megaphone,
  Globe,
  Building,
  Settings,
  BarChart3,
  Mail,
  ClipboardList,
  CalendarFold,
  MessageSquareText,
  PhoneCall,
  BookUser,
  Inbox,
  Search,
  Clock,
  Navigation,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Phone,
  Building2,
  Cog,
  User,
  Database,
  MessageCircle,
  Globe2,
} from "lucide-react";

const searchItems = [
  {
    title: "Overview",
    href: "/overview",
    icon: Home,
    description: "Main dashboard and overview",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: ClipboardList,
    description: "Create and manage forms",
  },
  {
    title: "Events",
    href: "/events",
    icon: CalendarFold,
    description: "Manage events and calendars",
  },
  {
    title: "Conversations",
    href: "/conversations",
    icon: MessageSquareText,
    description: "Chat and messaging",
  },
  {
    title: "Broadcasts",
    href: "/broadcasts",
    icon: Megaphone,
    description: "Email and SMS campaigns",
  },
  {
    title: "Calls",
    href: "/calls",
    icon: PhoneCall,
    description: "Call management and history",
  },
  {
    title: "Organisations",
    href: "/organisations",
    icon: Building,
    description: "Organization management",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Application settings",
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: BookUser,
    description: "Contact management",
  },
  {
    title: "Dashboards",
    href: "/dashboards",
    icon: BarChart3,
    description: "Analytics and reports",
  },
  {
    title: "Responses",
    href: "/responses",
    icon: Inbox,
    description: "Response management",
  },
  {
    title: "Messages",
    href: "/messages",
    icon: Mail,
    description: "Message center",
  },
];

// Recently viewed items (you can make this dynamic based on user activity)
const recentlyViewedItems = [
  {
    title: "Gecko Open Day 2025",
    href: "/events/gecko-open-day-2025",
  },
  {
    title: "Open Day Registration Form",
    href: "/forms/open-day-registration",
  },
  {
    title: "Conversation with Jonny Urquhart",
    href: "/conversations/jonny-urquhart",
  },
];

// Navigation items organized by category
const navigationItems = {
  forms: [
    {
      title: "Forms",
      href: "/forms",
      icon: ClipboardList,
      shortcut: "F",
    },
  ],
  events: [
    {
      title: "Events",
      href: "/events",
      icon: CalendarFold,
      shortcut: "E",
    },
  ],
  conversations: [
    {
      title: "Conversations",
      href: "/conversations",
      icon: MessageSquareText,
      shortcut: "C",
    },
  ],
  broadcasts: [
    {
      title: "Broadcasts",
      href: "/broadcasts",
      icon: Megaphone,
      shortcut: "B",
    },
  ],
  calls: [
    {
      title: "Calls",
      href: "/calls",
      icon: PhoneCall,
      shortcut: "A",
    },
  ],
  landingPages: [
    {
      title: "Landing pages",
      href: "/landing-pages",
      icon: Globe,
      shortcut: "L",
    },
  ],
};

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleOpenSearch = () => {
      setOpen(true);
    };

    document.addEventListener("keydown", down);
    window.addEventListener("openSearch", handleOpenSearch);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("openSearch", handleOpenSearch);
    };
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, settings, and more..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Recently viewed section */}
        <CommandGroup heading="Recently viewed">
          {recentlyViewedItems.map((item) => (
            <CommandItem
              key={item.href}
              value={item.title}
              onSelect={() => runCommand(() => router.push(item.href))}
            >
              <div>
                <div className="font-medium">{item.title}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Navigation sections */}
        <CommandGroup heading="Navigation">
          {Object.entries(navigationItems).map(([category, items]) => (
            <div key={category}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={item.title}
                    onSelect={() => runCommand(() => router.push(item.href))}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                    </div>
                    <span className="pointer-events-none inline-flex select-none items-center gap-1 bg-gray-50 text-gray-500 px-1 py-0.25 rounded-sm font-medium !text-xs border border-gray-200">
                      ⌘ {item.shortcut}
                    </span>
                  </CommandItem>
                );
              })}
            </div>
          ))}
        </CommandGroup>


      </CommandList>
    </CommandDialog>
  );
} 