import { create } from "zustand";

export const useTabStore = create<{
  tablist: {
    label: string;
    value: string;
  }[];
  activeTab: string;
  set: any;

  initTab: (id: string) => void;
}>((set, get) => ({
  tablist: [],
  activeTab: "",

  set,

  initTab(viewId: string) {
    const { tablist } = get();

    set({
      activeTab: viewId,
    });

    if (!tablist.find((v) => v.value === viewId)) {
      set({
        tablist: [
          ...tablist,
          {
            value: viewId,
            label: viewId,
          },
        ],
      });
    }
  },
}));
