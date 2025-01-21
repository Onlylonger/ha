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
});

export const useMainStore = create<any>((set, get) => ({
  viewIds: {},

  load() {
    const { viewIds } = get();

    // 使用别名加载
    loadRemote("plugin-a/entry").then((module: any) => {
      const { install } = module.default;
      install({
        registryView(id: string, cb: Function) {
          console.log(id, cb);
          if (!viewIds[id]) {
            set({
              viewIds: {
                ...viewIds,
                [id]: cb,
              },
            });
          }
        },
      });
    });
  },
}));
