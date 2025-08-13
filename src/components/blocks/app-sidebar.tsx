"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  ChevronRight,
  Search,
  Star,
  MoreHorizontal,
  Edit3,
  Trash2,
  Zap
} from "lucide-react";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();
  
  // Favorites state
  const [favorites, setFavorites] = React.useState<Array<{
    id: string;
    title: string;
    originalTitle: string;
    href: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }>>([]);

  // Rename modal state
  const [renameModalOpen, setRenameModalOpen] = React.useState(false);
  const [selectedFavorite, setSelectedFavorite] = React.useState<{ id: string; title: string } | null>(null);
  const [newTitle, setNewTitle] = React.useState("");
  
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  
  // Add current page to favorites
  const addToFavorites = () => {
    // Check if we've reached the limit of 5 favorites
    if (favorites.length >= 5) {
      return; // Don't add if limit reached
    }

    const pageTitle = getPageTitle(pathname);
    const currentPage = {
      id: pathname, // Use pathname as unique ID
      title: pageTitle,
      originalTitle: pageTitle,
      href: pathname,
      icon: getPageIcon(pathname),
    };
    
    if (!favorites.some(fav => fav.href === pathname)) {
      const newFavorites = [...favorites, currentPage];
      setFavorites(newFavorites);
      // Dispatch event to update taskbar with the current favorites list
      const event = new CustomEvent('favoritesUpdated', { 
        detail: { 
          favorites: newFavorites.map(fav => fav.href),
          favoritesCount: newFavorites.length
        }
      });
      window.dispatchEvent(event);
    }
  };
  
  // Remove current page from favorites
  const removeFromFavorites = () => {
    const newFavorites = favorites.filter(fav => fav.href !== pathname);
    setFavorites(newFavorites);
    // Dispatch event to update taskbar with the current favorites list
    const event = new CustomEvent('favoritesUpdated', { 
      detail: { 
        favorites: newFavorites.map(fav => fav.href),
        favoritesCount: newFavorites.length
      }
    });
    window.dispatchEvent(event);
  };

  // Remove specific favorite by id
  const removeSpecificFavorite = (id: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(newFavorites);
    // Dispatch event to update taskbar with the current favorites list
    const event = new CustomEvent('favoritesUpdated', { 
      detail: { 
        favorites: newFavorites.map(fav => fav.href),
        favoritesCount: newFavorites.length
      }
    });
    window.dispatchEvent(event);
  };

  // Rename specific favorite
  const renameFavorite = (id: string, newTitle: string) => {
    setFavorites(prev => prev.map(fav => 
      fav.id === id ? { ...fav, title: newTitle } : fav
    ));
  };

  // Open rename modal
  const openRenameModal = (favorite: { id: string; title: string }) => {
    setSelectedFavorite(favorite);
    setNewTitle(favorite.title);
    setRenameModalOpen(true);
  };

  // Handle save rename
  const handleSaveRename = () => {
    if (selectedFavorite && newTitle.trim() !== '') {
      renameFavorite(selectedFavorite.id, newTitle.trim());
      setRenameModalOpen(false);
      setSelectedFavorite(null);
      setNewTitle("");
    }
  };

  // Handle cancel rename
  const handleCancelRename = () => {
    setRenameModalOpen(false);
    setSelectedFavorite(null);
    setNewTitle("");
  };
  
  // Get page title based on pathname
  const getPageTitle = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'Overview';
    
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  };
  
  // Get page icon based on pathname
  const getPageIcon = (path: string) => {
    if (path.startsWith('/forms')) return ClipboardList;
    if (path.startsWith('/events')) return CalendarFold;
    if (path.startsWith('/conversations')) return MessageSquareText;
    if (path.startsWith('/broadcasts')) return Megaphone;
    if (path.startsWith('/calls')) return PhoneCall;
    if (path.startsWith('/organisations')) return Building;
    if (path.startsWith('/settings')) return Settings;
    if (path.startsWith('/overview')) return Home;
    return Home; // default
  };
  
  // Listen for addToFavorites event
  React.useEffect(() => {
    const handleAddToFavorites = () => {
      addToFavorites();
    };
    
    const handleRemoveFromFavorites = () => {
      removeFromFavorites();
    };

    const handleRequestCurrentFavorites = () => {
      // Send current favorites to taskbar
      const event = new CustomEvent('favoritesUpdated', { 
        detail: { 
          favorites: favorites.map(fav => fav.href),
          favoritesCount: favorites.length
        }
      });
      window.dispatchEvent(event);
    };
    
    window.addEventListener('addToFavorites', handleAddToFavorites);
    window.addEventListener('removeFromFavorites', handleRemoveFromFavorites);
    window.addEventListener('requestCurrentFavorites', handleRequestCurrentFavorites);
    
    return () => {
      window.removeEventListener('addToFavorites', handleAddToFavorites);
      window.removeEventListener('removeFromFavorites', handleRemoveFromFavorites);
      window.removeEventListener('requestCurrentFavorites', handleRequestCurrentFavorites);
    };
  }, [pathname, favorites]); // Re-run when pathname or favorites change
  
  return (
    <Sidebar className="border-none" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-condensed.svg"
            alt="Logo"
            width={120}
            height={32}
            className="h-auto w-8"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Search Button */}
        <div className="px-4 py-2">
          <Button
            onClick={() => {
              // This will trigger the command dialog
              const event = new CustomEvent('openSearch');
              window.dispatchEvent(event);
            }}
            variant="ghost"
            className="w-full justify-between bg-gray-950 border border-gray-800 hover:bg-gray-900 hover:text-gray-50 px-2 group-data-[collapsible=icon]:bg-gray-950 group-data-[collapsible=icon]:border-gray-950 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:hover:bg-gray-900 group-data-[collapsible=icon]:hover:text-gray-50"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="text-left font-normal transition-all duration-200 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden text-[13px]">
                Search Gecko
              </span>
            </span>
            <span className="pointer-events-none inline-flex select-none items-center gap-1 bg-gray-700 text-gray-300 px-1 py-0.25 rounded-sm font-medium !text-xs border border-gray-600 transition-all duration-200 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
              ⌘ K
            </span>
          </Button>
        </div>
        
        {/* Favourites Section */}
        {favorites.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Favourites</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {favorites.map((favorite) => (
                  <SidebarMenuItem key={favorite.id}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={favorite.href}
                        className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <span>{favorite.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-48" side="right" align="start">
                        <DropdownMenuItem
                          onClick={() => openRenameModal({ id: favorite.id, title: favorite.title })}
                        >
                          Rename menu label
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => removeSpecificFavorite(favorite.id)}
                        >
                          Remove from favourites
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Overview */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/overview" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/overview" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <Home className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Forms */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <ClipboardList className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Forms</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <ClipboardList className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                       <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                         <ClipboardList className="h-4 w-4" strokeWidth={1.5} />
                         <span>Forms</span>
                       </DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link 
                           href="/forms/create" 
                           className={`flex items-center ${
                             isActive("/forms/create") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                           }`}
                         >
                           <span>Create new form</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link 
                           href="/forms/forms-overview" 
                           className={`flex items-center ${
                             isActive("/forms/forms-overview") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                           }`}
                         >
                           <span>Forms overview</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuLabel className="mt-2">Settings</DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link 
                           href="/settings/contact-fields" 
                           className={`flex items-center ${
                             isActive("/settings/contact-fields") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                           }`}
                         >
                           <span>Contact fields</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link 
                           href="/settings/field-options" 
                           className={`flex items-center ${
                             isActive("/settings/field-options") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                           }`}
                         >
                           <span>Field options</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/forms/create" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/forms/create") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Create new form</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/forms/forms-overview" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/forms/forms-overview") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Forms overview</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      {/* Settings Group */}
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu className="p-0">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/contact-fields" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Contact fields</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/field-options" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Field options</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Events */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <CalendarFold className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Events</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <CalendarFold className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                       <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                         <CalendarFold className="h-4 w-4" strokeWidth={1.5} />
                         <span>Events</span>
                       </DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href="/events/create" className={`flex items-center ${isActive("/events/create") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                           <span>Create new event</span>
                         </Link>
                       </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/events/events-overview" className={`flex items-center ${isActive("/events/events-overview") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                           <span>Events overview</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuLabel className="mt-2">Settings</DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/hosts" className="flex items-center">
                           <span>Hosts</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/locations" className="flex items-center">
                           <span>Locations</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/share" className="flex items-center">
                           <span>Share events</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/deleted" className="flex items-center">
                           <span>Deleted events</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/events/create" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/events/create") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Create new event</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/events/events-overview" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/events/events-overview") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Events overview</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      {/* Settings Group */}
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu className="p-0">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/hosts" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Hosts</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/locations" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Locations</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/share" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Share events</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/deleted" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Deleted events</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Conversations */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <MessageSquareText className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Conversations</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <MessageSquareText className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                       <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                         <MessageSquareText className="h-4 w-4" strokeWidth={1.5} />
                         <span>Conversations</span>
                       </DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/inbox" className="flex items-center">
                           <span>Inbox</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/knowledge-base" className="flex items-center">
                           <span>Knowledge base</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/ai-agents" className="flex items-center">
                           <span>AI agents</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/widgets" className="flex items-center">
                           <span>Widgets</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/channels" className="flex items-center">
                           <span>Channels</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/workflows" className="flex items-center">
                           <span>Workflows</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/conversations/reporting" className="flex items-center">
                           <span>Reporting</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuLabel className="mt-2">Settings</DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/users" className="flex items-center">
                           <span>Users</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/teams" className="flex items-center">
                           <span>Teams</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/saved-replies" className="flex items-center">
                           <span>Saved replies</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/inbox" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/inbox") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Inbox</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/knowledge-base" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/knowledge-base") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Knowledge base</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/ai-agents" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/ai-agents") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>AI agents</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/widgets" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/widgets") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Widgets</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/channels" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/channels") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Channels</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/workflows" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/workflows") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Workflows</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/conversations/reporting" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/conversations/reporting") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Reporting</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      {/* Settings Group */}
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu className="p-0">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/users" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Users</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/teams" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Teams</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/saved-replies" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Saved replies</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Broadcasts */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <Megaphone className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Broadcasts</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <Megaphone className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                       <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                         <Megaphone className="h-4 w-4" strokeWidth={1.5} />
                         <span>Broadcasts</span>
                       </DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/broadcasts/create" className="flex items-center">
                           <span>Create new campaign</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/broadcasts/campaigns" className="flex items-center">
                           <span>Campaigns</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuLabel className="mt-2">Settings</DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/templates" className="flex items-center">
                           <span>Email & SMS templates</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/broadcasts/create" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/broadcasts/create") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Create new campaign</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/broadcasts/campaigns" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/broadcasts/campaigns") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Campaigns</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      {/* Settings Group */}
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu className="p-0">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/templates" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Email & SMS templates</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Calls */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <PhoneCall className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Calls</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                         <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                           <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
                           <span>Calls</span>
                         </DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/calls/overview" className="flex items-center">
                           <span>Call overview</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/calls/history" className="flex items-center">
                           <span>Call history</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/calls/campaigns" className="flex items-center">
                           <span>Call campaigns</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/calls/scripts" className="flex items-center">
                           <span>Call scripts</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/calls/reporting" className="flex items-center">
                           <span>Reporting</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuLabel className="mt-2">Settings</DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/agents" className="flex items-center">
                           <span>Call agents</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/numbers" className="flex items-center">
                           <span>Numbers</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calls/campaigns" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/calls/campaigns") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Call overview</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calls/history" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/calls/history") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Call history</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calls/campaigns" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/calls/campaigns") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Call campaigns</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calls/scripts" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/calls/scripts") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Call scripts</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calls/reporting" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/calls/reporting") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Reporting</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      {/* Settings Group */}
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu className="p-0">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/agents" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Call agents</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/numbers" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Numbers</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Landing pages */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/ai-and-automation" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/ai-and-automation" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <Zap className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>AI and automation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Landing pages */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/landing-pages" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/landing-pages" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <Globe className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>Landing pages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Organisations */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <Building className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Organisations</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <Building className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                       <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                         <Building className="h-4 w-4" strokeWidth={1.5} />
                         <span>Organisations</span>
                       </DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/organisations/list" className="flex items-center">
                           <span>Overview</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuLabel className="mt-2">Settings</DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/fields" className="flex items-center">
                           <span>Organisation fields</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/types" className="flex items-center">
                           <span>Organisation types</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/organisations/list" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/organisations/list") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Overview</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      
                      {/* Settings Group */}
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu className="p-0">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/fields" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Organisation fields</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <Link href="/settings/types" className="transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                  <span>Organisation types</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Settings */}
              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={isCollapsed ? (e) => e.preventDefault() : undefined}>
                    <SidebarMenuButton className="transition-all duration-200 ease-in-out">
                      <Settings className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                      <span>Settings</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {isCollapsed && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="absolute inset-0 cursor-pointer h-8 w-8 rounded flex items-center justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ease-in-out">
                          <Settings className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start" side="right" sideOffset={8}>
                       <DropdownMenuLabel className="flex items-center gap-3 text-sm font-semibold mb-1 mt-1">
                         <Settings className="h-4 w-4" strokeWidth={1.5} />
                         <span>Settings</span>
                       </DropdownMenuLabel>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/account" className="flex items-center">
                           <span>Account settings</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/user-management" className="flex items-center">
                           <span>User management</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/data" className="flex items-center">
                           <span>Data management</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/field-management" className="flex items-center">
                           <span>Field management</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/call-sms" className="flex items-center">
                           <span>Call & SMS settings</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/chat" className="flex items-center">
                           <span>Chat settings</span>
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link href="/settings/portal" className="flex items-center">
                           <span>Portal settings</span>
                         </Link>
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  <CollapsibleContent>
                    <SidebarMenuSub className={isCollapsed ? "pointer-events-none" : ""}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/all" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/all") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>All settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/account" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/account") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Account settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/user-management" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/user-management") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>User management</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/data" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/data") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Data management</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/field-management" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/field-management") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Field management</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/call-sms" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/call-sms") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Call & SMS settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/chat" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/chat") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Chat settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/settings/portal" className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive("/settings/portal") ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                            <span>Portal settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Contacts */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/contacts" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/contacts" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <BookUser className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>Contacts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Dashboards */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/dashboards" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/dashboards" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>Dashboards</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Responses */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/responses" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/responses" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <Inbox className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>Responses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Messages */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/messages" 
                    className={`transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === "/messages" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                  >
                    <Mail className="h-4 w-4 transition-colors duration-200 ease-in-out" strokeWidth={1.5} />
                    <span>Messages</span>
                  </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:px-2 transition-all duration-200 ease-in-out">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer rounded-lg p-2 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8">
                <AvatarImage src="https://ca.slack-edge.com/T033X4G5T-UBZJTN5QU-e37bbcbdfcaa-512" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
              <div className="flex flex-col overflow-hidden transition-all duration-200 ease-in-out group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
                <span className="text-sm font-medium whitespace-nowrap">Liam Young</span>
                <span className="text-xs text-sidebar-foreground/70 whitespace-nowrap">liam@geckoengage.com</span>
          </div>
        </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="right" sideOffset={0} forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Liam Young</p>
                <p className="text-xs leading-none text-muted-foreground">liam@geckoengage.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Product changes</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Service status</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Gecko academy</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Contact support</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Product feedback</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>User settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Security preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>My accounts</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:text-red-600 hover:bg-red-50 focus:text-red-600 focus:bg-red-50">
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      {/* Rename Modal */}
      <Dialog open={renameModalOpen} onOpenChange={setRenameModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename favourite</DialogTitle>
            <DialogDescription>
              Enter a new label for this favourite item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                New menu label
              </Label>
              <Input
                id="name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new label..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveRename();
                  } else if (e.key === 'Escape') {
                    handleCancelRename();
                  }
                }}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelRename}>
              Cancel
            </Button>
            <Button onClick={handleSaveRename} disabled={!newTitle.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
} 