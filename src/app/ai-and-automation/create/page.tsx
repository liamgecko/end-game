"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Save, Bot, Play, Sparkles, PlusCircle, PenLine, Shapes, ArrowLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Available modules for AI agents
const AVAILABLE_MODULES = [
  { id: "contacts", name: "Contacts", description: "Access to contact database and management" },
  { id: "conversations", name: "Conversations", description: "Chat history and conversation threads" },
  { id: "responses", name: "Responses", description: "Pre-written response templates and suggestions" },
  { id: "campaigns", name: "Campaigns", description: "Marketing campaign data and analytics" },
  { id: "events", name: "Events", description: "Event management and scheduling information" },
  { id: "calls", name: "Calls", description: "Call logs and telephony data" }
]

export default function CreateAIAgentPage() {
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [prompt, setPrompt] = useState("")
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashQuery, setSlashQuery] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 })
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingCommand, setEditingCommand] = useState<{ text: string; span: HTMLElement } | null>(null)
  const [showToolOptions, setShowToolOptions] = useState(false)
  const [selectedTool, setSelectedTool] = useState<string>("")
  const slashMenuRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLDivElement>(null)

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const removeModule = (moduleId: string) => {
    setSelectedModules(prev => prev.filter(id => id !== moduleId))
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving AI agent:", { selectedModules, prompt })
  }

  const handleTest = () => {
    // TODO: Implement test functionality
    console.log("Testing AI agent:", { selectedModules, prompt })
  }

  const handlePromptChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const value = target.innerText || target.textContent || ""
    setPrompt(value)
    
    // Check for slash command
    const selection = window.getSelection()
    if (!selection) return
    
    const cursorPos = selection.anchorOffset || 0
    setCursorPosition(cursorPos)
    
    // Find the word before cursor in the current text node
    const range = selection.getRangeAt(0)
    const node = range.startContainer
    const nodeText = node.textContent || ""
    const nodeOffset = range.startOffset
    
    // Get text before cursor in this specific node
    const textBeforeCursor = nodeText.substring(0, nodeOffset)
    const lastWord = textBeforeCursor.split(/\s/).pop() || ""
    
    if (lastWord.startsWith("/")) {
      // Only calculate position if menu wasn't already open
      if (!showSlashMenu) {
        // Calculate position for the slash menu
        const textarea = target
        
        // Create a temporary span to measure text width
        const span = document.createElement('span')
        span.style.font = window.getComputedStyle(textarea).font
        span.style.visibility = 'hidden'
        span.style.position = 'absolute'
        span.style.whiteSpace = 'pre'
        span.textContent = textBeforeCursor
        document.body.appendChild(span)
        
        const textWidth = span.offsetWidth
        document.body.removeChild(span)
        
        // Calculate position relative to textarea
        const textareaRect = textarea.getBoundingClientRect()
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20
        
        // Calculate position relative to viewport
        const top = textareaRect.top + 40
        
        // Calculate the exact position of the "/" character
        const left = textareaRect.left + textWidth
        
        // Ensure dropdown doesn't go off-screen
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const dropdownWidth = 256 // w-64 = 16rem = 256px
        const dropdownHeight = 256 // max-h-64 = 16rem = 256px
        
        let adjustedLeft = left
        let adjustedTop = top
        
        // Check right boundary
        if (left + dropdownWidth > viewportWidth) {
          adjustedLeft = viewportWidth - dropdownWidth - 20
        }
        
        // Check bottom boundary
        if (top + dropdownHeight > viewportHeight) {
          adjustedTop = top - dropdownHeight - 20
        }
        
        // Check left boundary
        if (adjustedLeft < 20) {
          adjustedLeft = 20
        }
        
        // Check top boundary
        if (adjustedTop < 20) {
          adjustedTop = 20
        }
        
        setSlashMenuPosition({
          top: adjustedTop,
          left: adjustedLeft
        })
      }
      
      setShowSlashMenu(true)
      setSlashQuery(lastWord.slice(1))
    } else {
      setShowSlashMenu(false)
      setSlashQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle Enter key to create new lines
    if (e.key === 'Enter') {
      e.preventDefault()
      document.execCommand('insertLineBreak', false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  const insertSlashCommand = (text: string) => {
    if (!textareaRef.current) return
    
    const selection = window.getSelection()
    if (!selection) return
    
    const range = selection.getRangeAt(0)
    const node = range.startContainer
    const nodeText = node.textContent || ""
    const nodeOffset = range.startOffset
    
    // Find the "/" character before the cursor in this node
    const textBeforeCursor = nodeText.substring(0, nodeOffset)
    const slashIndex = textBeforeCursor.lastIndexOf('/')
    
    if (slashIndex !== -1) {
      // Remove the "/" and any text after it on the same line
      const newText = nodeText.substring(0, slashIndex)
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = newText
      }
      
      // Create a span with background styling for the inserted text
      const span = document.createElement('span')
      span.textContent = text
      span.className = 'bg-blue-100 px-1 rounded cursor-pointer hover:bg-blue-200 transition-colors'
      span.contentEditable = 'false'
      span.onclick = () => handleSpanClick(span, text)
      
      // Insert the styled span at the position where "/" was
      const newRange = document.createRange()
      newRange.setStart(node, slashIndex)
      newRange.setEnd(node, slashIndex)
      newRange.insertNode(span)
      
      // Move cursor after the inserted span
      newRange.setStartAfter(span)
      newRange.setEndAfter(span)
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
    
    // Update the prompt state
    const newPrompt = textareaRef.current.innerText || textareaRef.current.textContent || ""
    setPrompt(newPrompt)
    
    setShowSlashMenu(false)
    setSlashQuery("")
  }

  const handleSpanClick = (span: HTMLElement, text: string) => {
    setEditingCommand({ text, span })
    setShowEditDialog(true)
  }

  const handleEditCommand = (newText: string) => {
    if (editingCommand) {
      editingCommand.span.textContent = newText
      editingCommand.span.className = 'bg-blue-200 px-1 rounded cursor-pointer hover:bg-blue-300 transition-colors'
      editingCommand.span.onclick = () => handleSpanClick(editingCommand.span, newText)
      
      // Update the prompt state
      if (textareaRef.current) {
        const newPrompt = textareaRef.current.innerText || textareaRef.current.textContent || ""
        setPrompt(newPrompt)
      }
    }
    setShowEditDialog(false)
    setEditingCommand(null)
  }

  // Get tool-specific options for the nested view
  const getToolSpecificOptions = (toolType: string) => {
    const toolOptionsMap: { [key: string]: Array<{ value: string; label: string }> } = {
      "Add a label": [
        { value: "urgent", label: "Urgent" },
        { value: "follow_up", label: "Follow Up" },
        { value: "resolved", label: "Resolved" },
        { value: "escalated", label: "Escalated" },
        { value: "new_lead", label: "New Lead" }
      ],
      "Add a note": [
        { value: "general_note", label: "General Note" },
        { value: "meeting_notes", label: "Meeting Notes" },
        { value: "follow_up_reminder", label: "Follow Up Reminder" },
        { value: "customer_feedback", label: "Customer Feedback" }
      ],
      "Add contact to event": [
        { value: "webinar", label: "Webinar" },
        { value: "conference", label: "Conference" },
        { value: "demo", label: "Demo" },
        { value: "meeting", label: "Meeting" },
        { value: "workshop", label: "Workshop" }
      ],
      "Add contact to campaign": [
        { value: "email_campaign", label: "Email Campaign" },
        { value: "social_media", label: "Social Media" },
        { value: "content_marketing", label: "Content Marketing" },
        { value: "product_launch", label: "Product Launch" }
      ]
    }
    return toolOptionsMap[toolType] || []
  }

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool)
    setShowToolOptions(true)
  }

  const goBackToTools = () => {
    setShowToolOptions(false)
    setSelectedTool("")
  }

  // Handle click outside to close slash menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        slashMenuRef.current && 
        !slashMenuRef.current.contains(event.target as Node) &&
        textareaRef.current && 
        !textareaRef.current.contains(event.target as Node)
      ) {
        setShowSlashMenu(false)
        setSlashQuery("")
      }
    }

    if (showSlashMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSlashMenu])

  // Update slash query when prompt changes to enable real-time filtering
  useEffect(() => {
    if (showSlashMenu) {
      const lastWord = prompt.split(/\s/).pop() || ""
      if (lastWord.startsWith("/")) {
        setSlashQuery(lastWord.slice(1))
      }
    }
  }, [prompt, showSlashMenu])

  return (
    <div className="xl:px-24 lg:px-20 md:px-16 sm:px-8 px-0 py-12">  
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create an AI agent</h1>
            <p className="text-muted-foreground">
              Build intelligent agents that can help automate workflows across your system
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenLine className="h-5 w-5 text-primary" />
              Basic details
            </CardTitle>
            <CardDescription>
              Give your AI agent a name and describe its purpose
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Agent name *
              </Label>
              <Input 
                id="name" 
                placeholder="e.g., Customer Support Assistant, Lead Qualification Bot"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea 
                id="description" 
                placeholder="Describe what this AI agent does, its goals, and how it will help your team..."
                rows={3}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Module Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shapes className="h-5 w-5 text-primary" />
              Module access
            </CardTitle>
            <CardDescription>
              Select which system modules this AI agent can access and work with
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Module Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Available modules
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AVAILABLE_MODULES.map(module => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-sm border-1 cursor-pointer transition-all hover:shadow-sm ${
                      selectedModules.includes(module.id)
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-border hover:border-gray-400'
                    }`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{module.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {module.description}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Prompt builder
            </CardTitle>
            <CardDescription>
              Craft the instructions that will guide your AI agent&apos;s behavior and responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="prompt" className="text-sm font-medium">
                  AI agent instructions *
                </Label>
                <div className="border rounded-sm bg-gray-50 mt-1">
                                      <div className="border rounded-b-lg rounded-t-sm bg-white mx-[-1px] mt-[-1px] relative">
                                          <div
                        ref={textareaRef}
                        id="prompt" 
                        contentEditable
                        className="font-mono text-sm border-0 appearance-none resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 focus-visible:shadow-none h-[116px] p-3 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
                        data-placeholder="Write clear, specific instructions for your AI agent. For example: 'You are a customer support assistant. Your role is to help customers with technical issues, provide solutions, and escalate complex problems to human agents when necessary. Always be polite, professional, and helpful.'"
                        onInput={handlePromptChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                      />
                      
                      {/* Slash Command Menu */}
                      {showSlashMenu && (
                        <div
                          ref={slashMenuRef}
                          className="absolute w-80 max-h-96 overflow-y-auto bg-white border rounded-lg shadow-lg z-50"
                          style={{
                            position: 'fixed',
                            top: slashMenuPosition.top,
                            left: slashMenuPosition.left,
                          }}
                        >
                          {!showToolOptions ? (
                            // First level: Tool selection and other options
                            <>
                              <div className="p-3 border-b">
                                <div className="text-sm font-medium">Insert</div>
                              </div>
                          
                          {/* Tools */}
                          {(() => {
                            const tools = ["Add a label", "Add a note", "Add contact to event", "Add contact to campaign"].filter(item => 
                              item.toLowerCase().includes(slashQuery.toLowerCase())
                            );
                            return tools.length > 0 ? (
                              <div className="p-1">
                                <div className="text-xs font-medium text-muted-foreground px-2 py-1">Tools</div>
                                {tools.map((item, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm flex items-center justify-between"
                                    onClick={() => handleToolSelect(item)}
                                  >
                                    <span>{item}</span>
                                    <span className="text-gray-400">→</span>
                                  </button>
                                ))}
                              </div>
                            ) : null;
                          })()}
                          
                          {/* Template tags */}
                          {(() => {
                            const templateTags = [
                              { label: "Contact name", value: "{{contact.name}}" },
                              { label: "Company name", value: "{{company.name}}" },
                              { label: "Email address", value: "{{contact.email}}" },
                              { label: "Phone number", value: "{{contact.phone}}" },
                              { label: "Custom field", value: "{{custom.field}}" }
                            ].filter(item => 
                              item.label.toLowerCase().includes(slashQuery.toLowerCase())
                            );
                            return templateTags.length > 0 ? (
                              <div className="p-1">
                                <div className="text-xs font-medium text-muted-foreground px-2 py-1">Template tags</div>
                                {templateTags.map((item, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                                    onClick={() => insertSlashCommand(item.value)}
                                  >
                                    {item.label}
                                  </button>
                                ))}
                              </div>
                            ) : null;
                          })()}
                          
                          {/* Channels */}
                          {(() => {
                            const channels = ["Email", "SMS", "WhatsApp", "Facebook Messenger", "Slack"].filter(item => 
                              item.toLowerCase().includes(slashQuery.toLowerCase())
                            );
                            return channels.length > 0 ? (
                              <div className="p-1">
                                <div className="text-xs font-medium text-muted-foreground px-2 py-1">Channels</div>
                                {channels.map((item, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                                    onClick={() => insertSlashCommand(`${item} channel`)}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            ) : null;
                          })()}
                          
                          {/* Widgets */}
                          {(() => {
                            const widgets = ["Live chat widget", "Contact form", "FAQ widget", "Booking calendar"].filter(item => 
                              item.toLowerCase().includes(slashQuery.toLowerCase())
                            );
                            return widgets.length > 0 ? (
                              <div className="p-1">
                                <div className="text-xs font-medium text-muted-foreground px-2 py-1">Widgets</div>
                                {widgets.map((item, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                                    onClick={() => insertSlashCommand(item)}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            ) : null;
                          })()}
                          
                          {/* Knowledge base */}
                          {(() => {
                            const knowledgeBase = ["Financial aid", "Product guides", "Troubleshooting", "Best practices"].filter(item => 
                              item.toLowerCase().includes(slashQuery.toLowerCase())
                            );
                            return knowledgeBase.length > 0 ? (
                              <div className="p-1">
                                <div className="text-xs font-medium text-muted-foreground px-2 py-1">Knowledge base</div>
                                {knowledgeBase.map((item, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                                    onClick={() => insertSlashCommand(item)}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            ) : null;
                          })()}
                          
                          {/* No results message */}
                          {(() => {
                            const allItems = [
                              ...["AI assistant", "Workflow engine", "Data processor", "Analytics engine"],
                              ...["Contact name", "Company name", "Email address", "Phone number", "Custom field"],
                              ...["Email", "SMS", "WhatsApp", "Facebook Messenger", "Slack"],
                              ...["Chat widget", "Contact form", "FAQ widget", "Booking calendar"],
                              ...["FAQ articles", "Product guides", "Troubleshooting", "Best practices"]
                            ];
                            const hasResults = allItems.some(item => 
                              item.toLowerCase().includes(slashQuery.toLowerCase())
                            );
                            return !hasResults && slashQuery.length > 0 ? (
                              <div className="p-3">
                                <div className="text-sm text-muted-foreground">No results found</div>
                              </div>
                            ) : null;
                                                      })()}
                            </>
                          ) : (
                            // Second level: Tool-specific options
                            <>
                              <div className="p-3 border-b bg-gray-50">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={goBackToTools}
                                    className="p-1 hover:bg-gray-200 rounded"
                                  >
                                    <ArrowLeft className="h-4 w-4" />
                                  </button>
                                  <div className="text-sm font-medium">{selectedTool}</div>
                                </div>
                              </div>
                              <div className="p-1">
                                {getToolSpecificOptions(selectedTool).map((option) => (
                                  <button
                                    key={option.value}
                                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                                    onClick={() => insertSlashCommand(`${selectedTool}: ${option.label}`)}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                  </div>
                  <div className="bg-gray-50 px-2 py-1 rounded-b-sm flex items-center justify-between">
                    <DropdownMenu>

                      <Tooltip>
                        <TooltipTrigger asChild>

                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="iconSm">
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Insert a command</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <DropdownMenuContent className="w-64" align="start">
                        <DropdownMenuLabel>Insert</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        {/* Tools */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <span>Tools</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>AI assistant</DropdownMenuItem>
                            <DropdownMenuItem>Workflow engine</DropdownMenuItem>
                            <DropdownMenuItem>Data processor</DropdownMenuItem>
                            <DropdownMenuItem>Analytics engine</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        
                        {/* Template tags */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <span>Template tags</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Contact name</DropdownMenuItem>
                            <DropdownMenuItem>Company name</DropdownMenuItem>
                            <DropdownMenuItem>Email address</DropdownMenuItem>
                            <DropdownMenuItem>Phone number</DropdownMenuItem>
                            <DropdownMenuItem>Custom field</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        
                        {/* Widgets */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <span>Widgets</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Chat widget</DropdownMenuItem>
                            <DropdownMenuItem>Contact form</DropdownMenuItem>
                            <DropdownMenuItem>FAQ widget</DropdownMenuItem>
                            <DropdownMenuItem>Booking calendar</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        
                        {/* Channels */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <span>Channels</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>SMS</DropdownMenuItem>
                            <DropdownMenuItem>WhatsApp</DropdownMenuItem>
                            <DropdownMenuItem>Facebook Messenger</DropdownMenuItem>
                            <DropdownMenuItem>Slack</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        
                        {/* Knowledge base */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <span>Knowledge base</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>FAQ articles</DropdownMenuItem>
                            <DropdownMenuItem>Product guides</DropdownMenuItem>
                            <DropdownMenuItem>Troubleshooting</DropdownMenuItem>
                            <DropdownMenuItem>Best practices</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <span className="text-xs text-muted-foreground">
                      Type <span className="font-semibold py-0.5 px-2 bg-gray-100 border border-gray-200 rounded-sm">/</span> to insert commands
                    </span>
                  </div>
                 </div>
              </div>
              
              {/* Prompt Tips */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">💡 Prompt writing tips</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Be specific about the agent&apos;s role and responsibilities</li>
                  <li>• Include examples of good responses</li>
                  <li>• Set clear boundaries and limitations</li>
                  <li>• Specify the tone and personality you want</li>
                  <li>• Mention how to handle edge cases or escalations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleTest}
          >
            <Play className="h-4 w-4 mr-2" />
            Test AI agent
          </Button>
          <Button 
            size="lg" 
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save AI agent
          </Button>
        </div>
      </div>

      {/* Edit Command Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Command</DialogTitle>
            <DialogDescription>
              Modify the text of the selected command.
            </DialogDescription>
          </DialogHeader>
          {editingCommand && (
            <Input
              value={editingCommand.text}
              onChange={(e) => setEditingCommand({ ...editingCommand, text: e.target.value })}
              placeholder="Enter new command text"
            />
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false)
                setEditingCommand(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => editingCommand && handleEditCommand(editingCommand.text)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
