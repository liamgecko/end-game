"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  MessageSquareText,
  PhoneCall,
  Home,
  MessageSquareOff,
  PhoneOff
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isIcon?: boolean;
}

export function AppTaskbar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  
  // Availability state
  const [conversationsAvailable, setConversationsAvailable] = React.useState(true);
  const [callsAvailable, setCallsAvailable] = React.useState(true);
  
  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', isIcon: true }
    ];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  const isHomePage = pathname === "/overview";
  
  return (
    <div className="flex items-center justify-between w-full pl-4 pr-6 py-1">
      {/* Left Section - Sidebar Toggle and Breadcrumbs */}
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-medium">Toggle sidebar <span className="inline-flex items-center gap-1 ml-1 bg-white/20 text-white px-1 py-0.25 rounded-sm font-medium border border-white/10">⌘ B</span></p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {!isHomePage && (
          <>
            <Separator orientation="vertical" className="!h-6 bg-gray-700" />
            
            {/* Breadcrumbs */}
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={item.href}>
                            {item.isIcon ? <Home className="h-3.5 w-3.5" strokeWidth={1.75} /> : item.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                          <BreadcrumbPage>
                            {item.isIcon ? <Home className="h-3.5 w-3.5" strokeWidth={1.75} /> : item.label}
                          </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
      </div>
      
      {/* Right Section - Controls */}
      <div className="flex items-center gap-2">
        {/* Conversations */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Toggle 
                  size="xs" 
                  variant="dark" 
                  aria-label="Toggle conversations availability"
                  pressed={conversationsAvailable}
                  onPressedChange={setConversationsAvailable}
                >
                  {conversationsAvailable ? (
                    <MessageSquareText strokeWidth={1.75} />
                  ) : (
                    <MessageSquareOff strokeWidth={1.75} />
                  )}
                </Toggle>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {conversationsAvailable 
                  ? "Currently available for conversations" 
                  : "Currently unavailable for conversations"
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Calls */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Toggle 
                  size="xs" 
                  variant="dark" 
                  aria-label="Toggle calls availability"
                  pressed={callsAvailable}
                  onPressedChange={setCallsAvailable}
                >
                  {callsAvailable ? (
                    <PhoneCall strokeWidth={1.75} />
                  ) : (
                    <PhoneOff strokeWidth={1.75} />
                  )}
                </Toggle>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {callsAvailable 
                  ? "Currently available for calls" 
                  : "Currently unavailable for calls"
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
} 