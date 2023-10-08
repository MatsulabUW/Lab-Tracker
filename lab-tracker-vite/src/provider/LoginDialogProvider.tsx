import { createContext } from "react";

type LoginDialogContextType = {
  onOpen: () => void;
};

const LoginDialogContext = createContext<LoginDialogContextType>({
  onOpen: () => {},
});

export default LoginDialogContext;
