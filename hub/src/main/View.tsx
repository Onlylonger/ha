import { useParams } from "react-router-dom";
import { useMainStore } from "./store";
import { useMemo } from "react";

export const View = () => {
  const params = useParams();

  const viewIds = useMainStore((state) => state.viewIds);

  let pluginHolder = useMemo(() => {
    if (params.viewId && viewIds[params.viewId]) {
      return viewIds[params.viewId]();
    }
    return null;
  }, [params.viewId, viewIds]);

  console.log(params);

  return <div>{pluginHolder}-11</div>;
};
