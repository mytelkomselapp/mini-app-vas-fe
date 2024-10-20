import { FC, PropsWithChildren } from "react";

interface Props {
  /** IF false the children wont be rendered */
  when: boolean;
  fallbackComponent?: React.ReactNode;
}

/**
 * Conditional render component
 */
const Show: FC<PropsWithChildren<Props>> = ({
  children,
  when,
  fallbackComponent,
}) => {
  if (!when) {
    if (!!fallbackComponent) return fallbackComponent;

    return null;
  }

  // Actually we need `fragment` :9
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default Show;
