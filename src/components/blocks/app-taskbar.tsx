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
  PhoneOff,
  Star
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
  
  // Favorites state - this should be shared with sidebar, but for now we'll manage it here
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [favoritesCount, setFavoritesCount] = React.useState(0);
  
  // Check if current page is favorited
  const isFavorited = favorites.includes(pathname);
  
  // Check if favorites limit is reached and current page is not favorited
  const isDisabled = favoritesCount >= 5 && !isFavorited;
  
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
  
  // Listen for favorite changes from sidebar and request initial state
  React.useEffect(() => {
    const handleFavoritesUpdated = (event: CustomEvent) => {
      const { favorites: updatedFavorites, favoritesCount: updatedCount } = event.detail;
      setFavorites(updatedFavorites);
      setFavoritesCount(updatedCount);
    };
    
    // Request current favorites from sidebar when component mounts
    const requestFavoritesEvent = new CustomEvent('requestCurrentFavorites');
    window.dispatchEvent(requestFavoritesEvent);
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated as EventListener);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated as EventListener);
    };
  }, []);
  
  return (
    <div className="flex items-center justify-between w-full pl-4 pr-6 py-2">
      {/* Left Section - Sidebar Toggle and Breadcrumbs */}
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent sideOffset={0}>
              <p className="text-medium">Toggle sidebar <span className="inline-flex items-center gap-1 ml-1 bg-gray-700 text-gray-300 px-1 py-0.25 rounded-sm font-medium border border-gray-600">⌘ B</span></p>
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
        {/* Star Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => {
                  if (isDisabled) return; // Don't do anything if disabled
                  
                  if (isFavorited) {
                    const event = new CustomEvent('removeFromFavorites');
                    window.dispatchEvent(event);
                  } else {
                    const event = new CustomEvent('addToFavorites');
                    window.dispatchEvent(event);
                  }
                }}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 size-7 rounded-sm mr-2 ${
                  isDisabled ? 'text-gray-400 cursor-not-allowed opacity-75' : 'text-gray-300 hover:text-gray-50 hover:bg-gray-800 cursor-pointer'
                }`}
              >
                <Star className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} strokeWidth={1.5} />
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={0}>
              <p className="text-medium">
                {isDisabled 
                  ? 'Maximum of 5 favourites reached' 
                  : isFavorited 
                    ? 'Remove from favourites' 
                    : 'Add to favourites'
                } 
                {!isDisabled && (
                  <span className="inline-flex items-center gap-1 ml-1 bg-gray-700 text-gray-300 px-1 py-0.25 rounded-sm font-medium border border-gray-600">⌘ F</span>
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="!h-6 bg-gray-700 mr-2" />

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
            <TooltipContent sideOffset={0}>
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
            <TooltipContent sideOffset={0}>
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