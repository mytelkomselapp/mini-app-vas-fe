import * as React from "react";
import { RenderListProps } from "./types";
import { cn } from "../../lib/string.utils";
import style from "./RenderList.module.css";
import Show from "../Show";
import CustomInterceptor from "../CustomInterceptor";

const RenderList: React.FC<RenderListProps> = ({
  data,
  keyIndex = "",
  containerClassName = "",
  type = "client",
  pageSize = 10,
  clientSideLoaderTimeout = 600,
  customLoadMoreComponent,
  onLoadMore,
  children,
}) => {
  const [showLoadMore, setShowLoadMore] = React.useState<boolean>(false);
  const [currentPageSize, setCurrentPageSize] =
    React.useState<number>(pageSize);

  const LoadingState: React.ReactNode = (
    <div className="w-full my-4">
      <p className="text-xs text-textSecondary text-center font-semibold">
        <span className={style["loader"]} />
        Loading
      </p>
    </div>
  );

  const dataDisplayed = React.useMemo(() => {
    if (type === "client") {
      return data?.slice(0, currentPageSize);
    }

    return data;
  }, [data, currentPageSize, type]);

  const handleInterceptLoadMore = React.useCallback(() => {
    if (currentPageSize < data?.length) {
      setShowLoadMore(true);
      if (type === "client") {
        return setTimeout(() => {
          setCurrentPageSize(currentPageSize + pageSize);
          setShowLoadMore(false);
        }, clientSideLoaderTimeout);
      }
      onLoadMore?.();
    }
  }, [type, currentPageSize]);

  return (
    <div
      className={cn(
        "overflow-y-auto no-scrollbar w-full h-auto",
        containerClassName
      )}
    >
      {dataDisplayed?.map((item, idx) => (
        <React.Fragment key={`${item[keyIndex]}-${idx}`}>
          <React.Suspense fallback={LoadingState}>
            {children(item, idx)}
          </React.Suspense>
        </React.Fragment>
      ))}
      <Show when={!showLoadMore}>
        <CustomInterceptor onEnter={handleInterceptLoadMore} />
      </Show>
      <Show when={showLoadMore}>
        <Show when={!!customLoadMoreComponent}>{customLoadMoreComponent}</Show>
        <Show when={!customLoadMoreComponent}>
          <div className="w-full my-4">
            <p className="text-xs text-textSecondary text-center font-semibold">
              <span className={style["loader"]} />
              Load More
            </p>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default RenderList;
