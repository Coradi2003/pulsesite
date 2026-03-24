import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#07050f]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
