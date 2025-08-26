import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { DefaultChatTransport } from 'ai';
import { PanelRight, Send, Upload, X } from 'lucide-react';
import React from 'react';

export interface AIChatSidebarProps {
	content: string;
	isEnabled: boolean;
	onPendingUpdate?: (update: string | null) => void;
}

export default function AiSidebarRigth({
  content,
  isEnabled,
  onPendingUpdate
}: Readonly<AIChatSidebarProps>) {

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [input, setInput] = React.useState('');
  const {messages, error, sendMessage, status, stop, resumeStream} = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/v1/chat/notes`,
    })
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({
      text: input,
    });
    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage({
        text: input,
      });
      setInput('');
      handleSubmit(e)
    }
  };
  return (
    <SidebarProvider  >
      <Sidebar collapsible='icon' side='right'
				className="relative h-full border-border border-l bg-background text-foreground transition-all duration-300 ease-in-out"
      variant='sidebar'
      > 
    <SidebarHeader className="flex flex-row items-center justify-between border-b bg-background px-4 group-data-[collapsible=icon]:px-2">
					<div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
						<h2 className="font-semibold text-sm">FillStep</h2>
				
					</div>
					<SidebarMenuButton
						tooltip="Toggle AI Assistant"
						className="-mr-2 h-8 w-8"
						asChild
					>
						<SidebarTrigger>
							<PanelRight className="h-4 w-4" />
						</SidebarTrigger>
					</SidebarMenuButton>
				</SidebarHeader>
        <SidebarContent className='group-data-[collapsible=icon]:p-0'>
        <SidebarGroup
						className={cn(
							"border-b bg-background p-2",
							"group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:p-1",
						)}
					>
						<div className="space-y-2 group-data-[collapsible=icon]:space-y-1">
							<div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-1">
								<div className="group-data-[collapsible=icon]:hidden">
									<div
										className="overflow-hidden rounded-md border border-border/40"
									>
										<div className="flex items-center justify-between border-border/40 border-b bg-muted px-3 py-1.5">
											<span className="font-medium text-foreground text-xs">
												Contextos
											</span>
												<Button
													variant="outline"
													size="sm"
													className="h-6 px-2 text-xs hover:bg-accent/50"
												>
													<Upload className="!size-3" />
													Agregar
												</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</SidebarGroup>

          {/* Messages the user sends */}
          <SidebarGroup className="min-h-0 flex-1 group-data-[collapsible=icon]:hidden">
						<ScrollArea className="min-h-0 flex-1" ref={scrollAreaRef}>
							<div className="flex flex-col gap-3 p-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={cn(
											"break-words rounded-lg px-3 py-2 text-sm leading-relaxed",
											message.role === "user"
												? "bg-primary/10 text-foreground"
												: "bg-muted/50 text-foreground/90",
										)}
									>
										{content}
									</div>
								))}
								{error && (
									<div className="rounded-lg bg-destructive/10 px-3 py-2 text-destructive text-sm overflow-auto">
										Error: {error.message}
									</div>
								)}
							</div>
						</ScrollArea>
					</SidebarGroup >

          {/* Input area */}
          <SidebarGroup 
          className="border-t bg-background p-2 group-data-[collapsible=icon]:hidden"
          >
            <form 
							className="flex flex-col gap-2"
            >
              <div className="relative">
								<Textarea
									value={input}
									onChange={handleInputChange}
									onKeyDown={handleKeyDown}
									placeholder={
										status === "streaming" ? "Generating..." : "Ask me anything"
									}
									className={cn(
										"flex w-full min-w-0 shrink px-3 py-1 text-sm",
										"disabled:cursor-not-allowed disabled:opacity-50",
										"placeholder:text-muted-foreground",
										"max-h-[400px] min-h-[64px]",
										"pr-24",
										"resize-none",
									)}
									rows={1}
									disabled={status === "streaming"}
									spellCheck="false"
									autoCapitalize="off"
									autoComplete="off"
									autoCorrect="off"
									aria-label="Chat input"
								/>
								<div className="-translate-y-1/2 absolute top-1/2 right-1 flex items-center gap-1">
									{status === "streaming" ? (
										<Button
											type="button"
											size="icon"
											variant="ghost"
											className="h-6 w-6"
											onClick={stop}
											aria-label="Stop generating"
										>
											<X className="h-3 w-3" />
										</Button>
									) : (
										<Button
											type="submit"
											size="icon"
											variant="ghost"
											className="h-6 w-6"
											disabled={!input.trim()}
											aria-label="Send message"
										>
											<Send className="h-3 w-3" />
										</Button>
									)}
								</div>
							</div>
            </form>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
