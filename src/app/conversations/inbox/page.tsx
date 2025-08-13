"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PanelLeftIcon, ListFilterPlus, Search, ListFilter, ArrowDownNarrowWide, CircleCheckBig, UserPlus, X, ShieldX, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";



export default function ConversationsInboxPage() {
  const [isSubmenuExpanded, setIsSubmenuExpanded] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());



  const toggleSubmenu = () => {
    setIsSubmenuExpanded(!isSubmenuExpanded);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full">
      <div className="h-[calc(100vh-56px)]">
        <ResizablePanelGroup direction="horizontal" className="min-h-full">

          <div className={`${isSubmenuExpanded ? 'w-[280px]' : 'w-[54px]'} border-r transition-all duration-300`}>
            <div className={`border-b py-3 flex justify-between items-center h-[56px] ${isSubmenuExpanded ? 'pl-5 pr-3' : 'px-2'}`}>
              {isSubmenuExpanded && <h1 className="text-lg font-bold tracking-tight">Inbox</h1>}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="iconSm" 
                    onClick={toggleSubmenu}
                    className={!isSubmenuExpanded ? 'mx-auto' : ''}
                  >
                    <PanelLeftIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{isSubmenuExpanded ? 'Collapse sidebar' : 'Expand sidebar'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            {isSubmenuExpanded && (
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="px-3 py-4 space-y-6">
                  {/* Search Box */}
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search conversations"
                      className="pl-8 h-8 !text-xs"
                    />
                  </div>
                  
                  {/* Filters Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 px-2">Filters</h3>
                    <div className="space-y-1">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">My conversations</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">15</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Unassigned</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">0</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Open</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">1,450</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Closed</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">15,002</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Sent</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">12,495</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Assigned to bot</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">888</Badge>
                    </div>
                    </div>
                  </div>
                  
                  {/* Pinned Filters Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-700 mb-2 px-2">Pinned filters</h3>
                    <div className="space-y-1">
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Admissions enquiries</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">15</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
                      <span className="text-sm overflow-hidden truncate">Prospects</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-white">15</Badge>
                    </div>
                    </div>
                  </div>
                  
                  {/* Create Filter Button */}
                  <Button variant="secondary" size="sm" className="w-full">
                    <ListFilterPlus className="h-4 w-4 mr-2" />
                    Create filter
                  </Button>
                </div>
              </ScrollArea>
            )}
          </div>
        
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="border-b px-4 py-3 h-[56px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedItems.size > 0 ? (
                  <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={selectedItems.size === 0 ? false : selectedItems.size === 6 ? true : "indeterminate"}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            // Select all available items
                            setSelectedItems(new Set(['matt-lanham', 'sarah-johnson', 'mike-chen', 'emma-wilson', 'david-brown', 'lisa-garcia']));
                          } else {
                            // Deselect all items
                            setSelectedItems(new Set());
                          }
                        }}
                      />
                    <span className="text-sm font-medium">{selectedItems.size} selected</span>
                  </div>
                ) : (
                  <>
                        <Select defaultValue="all">
                         <SelectTrigger>
                           <div className="flex items-center gap-1">
                             <ListFilter className="h-4 w-4" strokeWidth={2.5} />
                             <div className="min-w-0 flex-1 overflow-hidden truncate max-w-[68px]">
                               <SelectValue placeholder="Filter" />
                             </div>
                           </div>
                         </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All conversations</SelectItem>
                          <SelectItem value="team-assigned">Team assigned: awaiting agent</SelectItem>
                          <SelectItem value="waiting-response">Waiting for a response</SelectItem>
                          <SelectItem value="your-assignments" className="font-bold">Your assignments</SelectItem>
                          <SelectItem value="directly-to-you">Directly to you</SelectItem>
                          <SelectItem value="admission-team">Admission team</SelectItem>
                          <SelectItem value="facebook-messenger-team">Facebook messenger team</SelectItem>
                          <SelectItem value="email-inbox">Email inbox</SelectItem>
                        </SelectContent>
                      </Select>
                                         
                        <Select defaultValue="newest">
                         <SelectTrigger>
                           <div className="flex items-center gap-1">
                             <ArrowDownNarrowWide className="h-4 w-4" strokeWidth={2.5} />
                             <div className="min-w-0 flex-1 overflow-hidden truncate max-w-[100px]">
                               <SelectValue placeholder="Sort" />
                             </div>
                           </div>
                         </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                      </Select>
                  </>
                )}
              </div>
              
              {selectedItems.size > 0 && (
                <div className="flex items-center gap-[1px]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="iconSm">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Assign conversations</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="iconSm">
                        <ShieldX className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Mark conversations as spam</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="iconSm">
                        <CircleCheckBig className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Close conversations</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="iconSm" className="hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Delete conversations</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
            
            <ScrollArea className="h-full p-2">
              <ul className="space-y-[1px]">

                <li 
                  className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
                    selectedItems.has('matt-lanham') 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`} 
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>ML</AvatarFallback>
                      </Avatar>
                      <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-full bg-gray-50 rounded-full border border-white transition-opacity duration-200 ${
                        selectedItems.has('matt-lanham') 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <Checkbox 
                          checked={selectedItems.has('matt-lanham')}
                          onCheckedChange={() => toggleItemSelection('matt-lanham')}
                          className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden max-w-[220px] w-full">
                        <h4 className="m-0 text-sm font-medium">Matt Lanham</h4>
                        <div className="text-xs text-muted-foreground truncate"><span className="font-semibold">You:</span> Lorem ipsum dolor sit amet lorem ipsum dolor sit ametYou: Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                      14m 
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="iconSm">
                          <CircleCheckBig className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>

                <li 
                  className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
                    selectedItems.has('sarah-johnson') 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`} 
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-full bg-gray-50 rounded-full border border-white transition-opacity duration-200 ${
                        selectedItems.has('sarah-johnson') 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <Checkbox 
                          checked={selectedItems.has('sarah-johnson')}
                          onCheckedChange={() => toggleItemSelection('sarah-johnson')}
                          className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden max-w-[220px] w-full">
                        <h4 className="m-0 text-sm font-medium">Sarah Johnson</h4>
                        <div className="text-xs text-muted-foreground truncate"><span className="font-semibold">Sarah:</span> Hi there! I have a question about the new features you mentioned in the email.</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                      32m 
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="iconSm">
                          <CircleCheckBig className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>

                <li 
                  className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
                    selectedItems.has('mike-chen') 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`} 
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-full bg-gray-50 rounded-full border border-white transition-opacity duration-200 ${
                        selectedItems.has('mike-chen') 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <Checkbox 
                          checked={selectedItems.has('mike-chen')}
                          onCheckedChange={() => toggleItemSelection('mike-chen')}
                          className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden max-w-[220px] w-full">
                        <h4 className="m-0 text-sm font-medium">Mike Chen</h4>
                        <div className="text-xs text-muted-foreground truncate"><span className="font-semibold">You:</span> Thanks for the quick response yesterday. The solution worked perfectly!</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                      1h 
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="iconSm">
                          <CircleCheckBig className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>

                <li 
                  className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
                    selectedItems.has('emma-wilson') 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`} 
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-full bg-gray-50 rounded-full border border-white transition-opacity duration-200 ${
                        selectedItems.has('emma-wilson') 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <Checkbox 
                          checked={selectedItems.has('emma-wilson')}
                          onCheckedChange={() => toggleItemSelection('emma-wilson')}
                          className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden max-w-[220px] w-full">
                        <h4 className="m-0 text-sm font-medium">Emma Wilson</h4>
                        <div className="text-xs text-muted-foreground truncate"><span className="font-semibold">Emma:</span> Can we schedule a call for next week? I&apos;d like to discuss the project timeline.</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                      2h 
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="iconSm">
                          <CircleCheckBig className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>

                <li 
                  className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
                    selectedItems.has('david-brown') 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`} 
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>DB</AvatarFallback>
                      </Avatar>
                      <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-full bg-gray-50 rounded-full border border-white transition-opacity duration-200 ${
                        selectedItems.has('david-brown') 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <Checkbox 
                          checked={selectedItems.has('david-brown')}
                          onCheckedChange={() => toggleItemSelection('david-brown')}
                          className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden max-w-[220px] w-full">
                        <h4 className="m-0 text-sm font-medium">David Brown</h4>
                        <div className="text-xs text-muted-foreground truncate"><span className="font-semibold">You:</span> I&apos;ve sent over the updated proposal. Let me know if you need any changes.</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                      3h 
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="iconSm">
                          <CircleCheckBig className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>

                <li 
                  className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
                    selectedItems.has('lisa-garcia') 
                      ? 'bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`} 
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>LG</AvatarFallback>
                      </Avatar>
                      <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 h-full w-full bg-gray-50 rounded-full border border-white transition-opacity duration-200 ${
                        selectedItems.has('lisa-garcia') 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <Checkbox 
                          checked={selectedItems.has('lisa-garcia')}
                          onCheckedChange={() => toggleItemSelection('lisa-garcia')}
                          className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden max-w-[220px] w-full">
                        <h4 className="m-0 text-sm font-medium">Lisa Garcia</h4>
                        <div className="text-xs text-muted-foreground truncate"><span className="font-semibold">Lisa:</span> The new dashboard looks amazing! Great work on the redesign.</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                      5h 
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="iconSm">
                          <CircleCheckBig className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>
              </ul>
            </ScrollArea>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={50} minSize={20}>
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Column 2</h2>
                <p className="text-muted-foreground">
                  This is the second resizable column with its own scroll area.
                </p>
                {/* Add your content here */}
              </div>
            </ScrollArea>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={25} minSize={20}>
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Column 3</h2>
                <p className="text-muted-foreground">
                  This is the third resizable column with its own scroll area.
                </p>
                {/* Add your content here */}
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
} 