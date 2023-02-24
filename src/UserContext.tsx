import DumbContextFactory from "./DumbContextFactory.tsx";

interface thesistype {
  name: string;
  date: string;
  id: number;
}

export type UserState = {
  loaded: boolean;
  is_login: boolean;
  name: string;
  user_id: number;
  level: number;
  thesis: [thesistype];
};

const defaultState: UserState = {
  loaded: true,
  is_login: false,
  name: "匿名",
  user_id: -1,
  level: 0,
  thesis: [{"name": "pon", "date": "2023/02/23", "id": 1}, {"name": "ponz", "date": "2023/02/23", "id": 2}, {"name": "ponzu", "date": "2023/02/23", "id": 3}]
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

