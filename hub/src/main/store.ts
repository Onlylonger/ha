import { create } from "zustand";

import { init, loadRemote } from "@module-federation/enhanced/runtime";

init({
  name: "hub",
  remotes: [
    {
      name: "plugin_a",
      // mf-manifest.json 是在 Module federation 新版构建工具中生成的文件类型，对比 remoteEntry 提供了更丰富的功能
      // 预加载功能依赖于使用 mf-manifest.json 文件类型
      entry: "http://localhost:3001/mf-manifest.json",
      alias: "plugin-a",
    },
  ],
  shared: {
    react: {
      shareConfig: {
        singleton: true,
        requiredVersion: "^19.0.0",
      },
    },

    "react-dom": {
      shareConfig: {
        singleton: true,
        requiredVersion: "^19.0.0",
      },
    },
  },
});

export const useMainStore = create<{
  [key: string]: any;
  menus: Record<string, any>[];
}>((set, get) => ({
  viewIds: {},
  menus: [],

  load() {
    // 使用别名加载
    loadRemote("plugin-a/entry").then((module: any) => {
      const { install } = module.default;
      install({
        registryView(id: string, cb: Function) {
          const { viewIds } = get();

          if (!viewIds[id]) {
            set({
              viewIds: {
                ...viewIds,
                [id]: cb,
              },
            });
          }
        },
        registryMenu(item: { id: string; label: string; onClick: Function }) {
          const { menus } = get();

          if (!menus.find((v) => v.id === item.id)) {
            set({
              menus: [
                ...menus,
                {
                  id: item.id,
                  label: item.label,
                  onClick: item.onClick,
                },
              ],
            });
          }
        },
      });
    });
  },
}));
