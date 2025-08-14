"use client"

import { useState } from "react"
import { ArrowLeft, Bot, PenLine, Shapes, Sparkles, Plus, Copy, Trash2, Play, Save } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Available modules for AI agents
const AVAILABLE_MODULES = [
  { id: "contacts", name: "Contacts", description: "Access to contact database and management" },
  { id: "conversations", name: "Conversations", description: "Chat history and conversation threads" },
  { id: "responses", name: "Responses", description: "Pre-written response templates and suggestions" },
  { id: "campaigns", name: "Campaigns", description: "Marketing campaign data and analytics" },
  { id: "events", name: "Events", description: "Event management and scheduling information" },
  { id: "calls", name: "Calls", description: "Call logs and telephony data" }
]

export default function CreateConditionsPage() {
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [tools, setTools] = useState([
    {
      id: 1,
      toolType: "",
      operator: "",
      action: ""
    }
  ])


  // Tool configuration options
  const toolOptions = [
    { value: "add_label_conversation", label: "Add a label to the conversation" },
    { value: "add_note_contact", label: "Add a note to the contact" },
    { value: "add_note_conversation", label: "Add a note to the conversation" },
    { value: "add_contact_event", label: "Add contact to event" },
    { value: "add_contact_organisation", label: "Add contact to organisation" },
    { value: "add_label_contact", label: "Add label to contact" },
    { value: "add_to_campaign", label: "Add to campaign" },
    { value: "assign_conversation_agent", label: "Assign conversation to agent or team" },
    { value: "email", label: "Email" },
    { value: "generate_document", label: "Generate Document" },
    { value: "invite_unibuddy_community", label: "Invite to Unibuddy Community" },
    { value: "remove_label_contact", label: "Remove label from contact" },
    { value: "sms", label: "SMS" },
    { value: "sync_to_crm", label: "Sync To CRM" },
    { value: "trigger_message_contact", label: "Trigger a message to the contact" },
    { value: "update_engagement_score", label: "Update a contact's engagement score" },
    { value: "update_contact_field", label: "Update contact field contents" },
    { value: "update_task_objective", label: "Update task and objective" }
  ]

  const operatorOptions = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Does not equal" },
    { value: "contains", label: "Contains" },
    { value: "greater_than", label: "Greater than" },
    { value: "less_than", label: "Less than" },
    { value: "is_empty", label: "Is empty" },
    { value: "is_not_empty", label: "Is not empty" }
  ]

  const getActionOptions = (toolType: string) => {
    const actionMap: { [key: string]: Array<{ value: string; label: string }> } = {
      contact_created: [
        { value: "send_welcome_email", label: "Send Welcome Email" },
        { value: "add_to_campaign", label: "Add to Campaign" },
        { value: "assign_agent", label: "Assign Agent" }
      ],
      contact_updated: [
        { value: "send_update_email", label: "Send Update Email" },
        { value: "update_tags", label: "Update Tags" },
        { value: "create_task", label: "Create Task" }
      ],
      form_submitted: [
        { value: "send_confirmation", label: "Send Confirmation" },
        { value: "notify_team", label: "Notify Team" },
        { value: "schedule_followup", label: "Schedule Follow-up" }
      ],
      email_opened: [
        { value: "update_engagement", label: "Update Engagement" },
        { value: "send_followup", label: "Send Follow-up" }
      ],
      page_visited: [
        { value: "track_visit", label: "Track Visit" },
        { value: "show_popup", label: "Show Popup" }
      ],
      lead_score: [
        { value: "escalate_lead", label: "Escalate Lead" },
        { value: "send_high_value_offer", label: "Send High-Value Offer" }
      ],
      company_size: [
        { value: "route_to_enterprise", label: "Route to Enterprise Team" },
        { value: "send_scale_appropriate_content", label: "Send Scale-Appropriate Content" }
      ],
      industry: [
        { value: "send_industry_specific_content", label: "Send Industry-Specific Content" },
        { value: "assign_industry_specialist", label: "Assign Industry Specialist" }
      ]
    }
    return actionMap[toolType] || []
  }



  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const addTool = () => {
    const newTool = {
      id: Date.now(),
      toolType: "",
      operator: "",
      action: ""
    }
    setTools([...tools, newTool])
  }

  const removeTool = (toolId: number) => {
    setTools(tools.filter(tool => tool.id !== toolId))
  }

  const cloneTool = (toolId: number) => {
    const toolToClone = tools.find(tool => tool.id === toolId)
    if (toolToClone) {
      const clonedTool = {
        ...toolToClone,
        id: Date.now()
      }
      setTools([...tools, clonedTool])
    }
  }

  const updateTool = (toolId: number, field: string, value: string) => {
    setTools(tools.map(tool => 
      tool.id === toolId ? { ...tool, [field]: value } : tool
    ))
  }



  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving AI agent:", { selectedModules, tools })
  }

  const handleTest = () => {
    // TODO: Implement test functionality
    console.log("Testing AI agent:", { selectedModules, tools })
  }

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
                <Textarea
                  id="prompt"
                  placeholder="Write clear, specific instructions for your AI agent. For example: 'You are a customer support assistant. Your role is to help customers with technical issues, provide solutions, and escalate complex problems to human agents when necessary. Always be polite, professional, and helpful.'"
                  className="min-h-[120px] mt-1 font-mono"
                />
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

        {/* Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shapes className="h-5 w-5 text-primary" />
              Tools
            </CardTitle>
            <CardDescription>
              Configure the tools and conditions that will determine when and how your AI agent operates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tools.map((tool, index) => (
                <div key={tool.id} className="p-4 border rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-2 justify-between w-full">

                    {/* Tool Selection */}
                    <div className="w-full">
                       <Select 
                         value={tool.toolType} 
                         onValueChange={(value) => updateTool(tool.id, 'toolType', value)}
                       >
                         <SelectTrigger className="w-full bg-white">
                           <SelectValue placeholder="Select tool" />
                         </SelectTrigger>
                        <SelectContent>
                          {toolOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Operator */}
                    <div className="w-[158px]">
                      <Select 
                        value={tool.operator} 
                        onValueChange={(value) => updateTool(tool.id, 'operator', value)}
                      >
                        <SelectTrigger className="w-[158px] bg-white">
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Action */}
                    <div className="w-full">
                      <Select 
                        value={tool.action} 
                        onValueChange={(value) => updateTool(tool.id, 'action', value)}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          {getActionOptions(tool.toolType).map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => cloneTool(tool.id)}
                        className="h-8 w-8"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTool(tool.id)}
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Tool Button */}
              <Button onClick={addTool} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add another tool
              </Button>
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
    </div>
  )
}
