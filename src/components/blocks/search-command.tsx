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
        <CommandGroup heading="Pages">
          {searchItems.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <Icon className="mr-2 h-4 w-4" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
} 