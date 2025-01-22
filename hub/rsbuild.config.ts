import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    // pluginModuleFederation({
    //   name: "hub",
    //   remotes: {
    //     "plugin-a": "plugin_a@http://localhost:3001/mf-manifest.json",
    //   },
    //   shared: ["react", "react-dom"],
    // }),
  ],
});
