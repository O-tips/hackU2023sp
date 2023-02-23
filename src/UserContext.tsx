import DumbContextFactory from "./DumbContextFactory.tsx";

export type UserState = {
  loaded: boolean;
  name: string;
  user_id: number;
  thesis: [string];
};

const defaultState: UserState = {
  loaded: true,
  name: "匿名",
  user_id: -1,
  thesis: ["ここに論文を追加します"]
};

const {
  DumbContextProvider: UserContextProvider,
  useDumbContext: useContext
} = DumbContextFactory<UserState>("UserContext", defaultState, {
  persist: {
    type: "local",
    key: "user"
  }
});

const useUserContext = () => {
  const { state, setState } = useContext();

  return {
    user: state,
    setUser: (newState: Partial<UserState>) => {
      setState({ ...state, ...newState });
    }
  };
};

export { UserContextProvider, useUserContext };

