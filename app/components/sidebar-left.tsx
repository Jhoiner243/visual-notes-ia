"use client"

import { PanelRight } from 'lucide-react'
import Link from 'next/link'
import { Sidebar, SidebarHeader, SidebarMenuButton, SidebarTrigger } from '../../components/ui/sidebar'
import { TooltipProvider } from '../../components/ui/tooltip'
import { cn } from '../../lib/utils'

export default function MinimalSidebarLeft() {
  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
      	collapsible="icon"
				className="relative flex h-full flex-col border-border border-r bg-background text-foreground transition-all duration-300 ease-in-out"
      >
        <SidebarHeader className="flex w-full flex-row justify-between group-data-[collapsible=icon]:flex-col">
					<div className="flex items-center gap-2">
						<Link
							href="/"
							className={cn(
								"flex items-center gap-2",
								"group-data-[collapsible=icon]:flex-col",
							)}
							aria-label="Text0 Home"
						>
	

						</Link>
					</div>
					<SidebarMenuButton
						tooltip="Toggle Sidebar"
						className="flex h-8 w-8 items-center justify-center"
						asChild
					>
						<SidebarTrigger>
							<PanelRight className="h-4 w-4" />
						</SidebarTrigger>
					</SidebarMenuButton>
				</SidebarHeader>
      </Sidebar>
    </TooltipProvider>
  )
}
