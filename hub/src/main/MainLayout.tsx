import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useMainStore } from "./store";
import { useEffect } from "react";
import { TabsContainer } from "./TabsContainer";
import { Button } from "@mui/material";

export const MainLayout = () => {
  const load = useMainStore((state) => state.load);
  const menus = useMainStore((state) => state.menus);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    load();
  }, []);

  const handleNav = (viewId: string) => {
    navigate(`/${params.lab}/${params.lab}/${viewId}`);
  };

  return (
    <div className="flex h-full">
      <aside className="w-[80px] flex-shrink-0 border-gray-200 border-r">
        {menus.map((v) => (
          <Button key={v.id} onClick={() => handleNav(v.id)}>
            {v.label}
          </Button>
        ))}
      </aside>
      <section className="flex-1 flex flex-col">
        <header className="h-[56px] flex-shrink-0">
          <TabsContainer />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </section>
    </div>
  );
};
