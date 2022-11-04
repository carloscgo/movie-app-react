import get from "lodash/get";
import routes from "./routes";

export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

const REACT_APP = get(window, "REACT_APP", {});

export {
  routes,
  REACT_APP
};
