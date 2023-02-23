import DumbContextFactory from "./DumbContextFactory.tsx";

interface wordtype {
  name: string;
  meaning: string;
  id: number;
}

export type WordState = {
  loaded: boolean;
  thesis_id: number;
  thesis_name: string,
  words : [wordtype];
};

const defaultState: WordState = {
  loaded: true,
  thesis_id: 0,
  thesis_name: "thesis name",
  words: [{"name" : "apple", "meaning" : "りんご", "id" : 1}, {"name" : "banana", "meaning" : "バナナ", "id" : 2}, {"name" : "wow", "meaning" : "わお", "id" : 3}]
};

const {
  DumbContextProvider: WordContextProvider,
  useDumbContext: useContext
} = DumbContextFactory<WordState>("WordContext", defaultState, {
  persist: {
    type: "local",
    key: "Word"
  }
});

const useWordContext = () => {
  const { state, setState } = useContext();

  return {
    word: state,
    setWord: (newState: Partial<WordState>) => {
      setState({ ...state, ...newState });
    }
  };
};

export { WordContextProvider, useWordContext };

