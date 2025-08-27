import { SidebarProvider } from '../../components/ui/sidebar';
import MinimalSidebarLeft from '../components/sidebar-left';

export default function Protectedlayout({children}:  Readonly<{
	children: React.ReactNode;
}>) {
  return (
  <SidebarProvider
  defaultOpen={true}
  className="grid h-dvh grid-rows-[auto_1fr]"
  >
    <div className="row-span-2 flex">
    <MinimalSidebarLeft />
          <main className="relative flex flex-1 overflow-auto">
						<div className="grid flex-1">{children}</div>
					</main>

          </div>
  </SidebarProvider>    
  )
}
