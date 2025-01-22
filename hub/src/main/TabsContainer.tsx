import { Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTabStore } from "./tab-store";

export const TabsContainer = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const tablist = useTabStore((state) => state.tablist);
  const set = useTabStore((state) => state.set);

  const params = useParams();
  const navigate = useNavigate();

  return (
    <Tabs
      value={activeTab}
      onChange={(_, v) => {
        set({
          activeTab: v,
        });
        navigate(`/${params.lab}/${params.lab}/${v}`);
      }}
    >
      {tablist.map((v, i) => (
        <Tab
          label={
            <span className="inline-flex gap-5">
              <span>{v.label}</span>
              <span
                onClick={(e) => {
                  const tmp = [...tablist];
                  const id = v.value === activeTab ? false : activeTab;
                  tmp.splice(i, 1);
                  set({
                    tablist: tmp,
                    activeTab: id,
                  });

                  if (id) {
                    navigate(`/${params.lab}/${params.lab}/${id}`);
                  } else {
                    navigate(`/${params.lab}/${params.lab}`);
                  }

                  e.stopPropagation();
                }}
              >
                X
              </span>
            </span>
          }
          value={v.value}
          key={v.value}
        />
      ))}
    </Tabs>
  );
};
