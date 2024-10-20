import { PropsWithChildren, ReactElement } from "react";

export interface RenderVerticalListProps extends PropsWithChildren {
  data: T[];
  /* key identifier for list */
  keyIndex: string;
  /* Load card page size default 10 */
  pageSize?: number;
  /* Type is for handling pagination from client side or server side default client */
  type?: "client" | "server";
  /* custom container classname for render list default: overflow-y-auto no-scrollbar w-full h-auto */
  containerClassName?: string;
  /* fake loader for client side load more timeout default 600 */
  clientSideLoaderTimeout?: number;
  customLoadMoreComponent?: React.ReactNode;
  /* still under development for server side */
  onLoadMore?: () => void;
  children: (item: T, index: number) => ReactElement;
  bottomOffset?: string | number;
}
