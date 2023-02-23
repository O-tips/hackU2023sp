import DumbContextFactory from "./DumbContextFactory.tsx";

export type ThesisState = {
  date: string;
  thesis_id: number;
  thesis_name: [string];
};

const defaultState: ThesisState = {
  date: "2023/02/23",
  thesis_id: 0,
  thesis_name: "ぽん"
};

const {
  DumbContextProvider: ThesisContextProvider,
  useDumbContext: useContext
} = DumbContextFactory<ThesisState>("ThesisContext", defaultState, {
  persist: {
    type: "local",
    key: "thesis"
  }
});

const useThesisContext = () => {
  const { state, setState } = useContext();

  return {
    thesis: state,
    setThesis: (newState: Partial<ThesisState>) => {
      setState({ ...state, ...newState });
    }
  };
};

export { ThesisContextProvider, useThesisContext };

