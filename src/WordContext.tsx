import DumbContextFactory from "./DumbContextFactory.tsx";

interface wordtype {
  id: number;
  word: string;
  meaning: string;
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
  words: [{"id" : 1, "word" : "apple", "meaning" : "りんご"},
          {"id" : 2, "word" : "banana", "meaning" : "バナナ"}, 
          {"id" : 3, "word" : "wow", "meaning" : "わお"},
          { id: 1, word:'vocabulary',meaning:'語彙'},
          { id: 2, word:'assist',meaning:'補助する'},
          { id: 3, word:'extract',meaning:'抽出する'},
          { id: 4, word:'display',meaning:'展示する、表示する'},
          { id: 5, word:'elementary',meaning:'初等の'},
          { id: 6, word:'relatively',meaning:'比較的'},
          { id: 7, word:'additionally',meaning:'さらに'},
          { id: 8, word:'format',meaning:'書式、形式'},
          { id: 9, word:'press',meaning:'押す'},
          { id: 10, word:'remove',meaning:'取り除く'},
          { id: 11, word:'tiger',meaning:'虎'},
          { id: 12, word:'horse',meaning:'馬'},
          { id: 13, word:'cow',meaning:'牛'},
          { id: 14, word:'snake',meaning:'蛇'},
          { id: 15, word:'mouse',meaning:'ネズミ'},
          { id: 16, word:'whale',meaning:'クジラ'},
          { id: 17, word:'shark',meaning:'サメ'},
          { id: 18, word:'batterfly',meaning:'チョウ'},
          { id: 19, word:'monkey',meaning:'猿'},
          { id: 20, word:'deer',meaning:'鹿'}        
        ]
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

