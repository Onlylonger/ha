import { Outlet } from "react-router-dom";
import { useMainStore } from "./store";
import { useEffect } from "react";

export const MainLayout = () => {
  const load = useMainStore((state) => state.load);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex h-full">
      <aside className="w-[80px] flex-shrink-0 border-gray-200 border-r">
        aside
      </aside>
      <section className="flex-1 flex flex-col">
        <header className="h-[56px] flex-shrink-0">tabs</header>
        <main className="flex-1">
          <Outlet />
        </main>
      </section>
    </div>
  );
};
