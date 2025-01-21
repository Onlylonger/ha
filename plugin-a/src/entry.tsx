export default {
  install(ctx: any) {
    ctx.registryView("demo", () => {
      return <>pluginView</>;
    });
    //
  },
};
