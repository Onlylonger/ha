import { useState } from "react";

export function Count(props: any) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        {count}-{props.children}
      </div>
      <div>
        <button onClick={() => setCount((pre) => pre + 1)}>Plus</button>
      </div>
    </div>
  );
}

export default {
  install(ctx: any) {
    ctx.registryView("demo", () => {
      return <Count>demo</Count>;
    });
    // ctx.registryView("demo2", () => {
    //   return <Count>demo2</Count>;
    // });
    // ctx.registryView("dem3", () => {
    //   return <Count>dem3</Count>;
    // });
    // ctx.registryView("demo4", () => {
    //   return <Count>demo4</Count>;
    // });
    ctx.registryMenu({
      id: "demo",
      label: "demo",
    });
    ctx.registryMenu({
      id: "demo2",
      label: "demo2",
    });
    ctx.registryMenu({
      id: "dem3",
      label: "dem3",
    });
    ctx.registryMenu({
      id: "demo4",
      label: "demo4",
    });
    //
  },
};
