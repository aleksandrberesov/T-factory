import { useRef } from 'react';   
import { TNumberToStringFunc, TStringToStringFunc, TStringProc } from '../libs/types';        
import useRefValue from '../libs/data-hooks/value';
import useViewsManager from './viewsManager';
import { IViewController } from './viewController';

type TWord = {
    id: number; 
    key: string;
    en: string; 
    ru: string; 
    annotation: string;
};

type TDictionary = {

};

interface IDictionary {
    language: string;    
    getWordByID: TNumberToStringFunc;  
    getWord: TStringToStringFunc;  
};

interface ILocalizator {
    languages: string[];
    dictionary: IDictionary;
    set: TStringProc;
    init: () => Promise<boolean>;
    addView: (view: IViewController<IDictionary>) => void;
};

const AvailableLanguages: string[] = ['en', 'ru'];

const useLocalizaion = ():ILocalizator => {
    const viewsManager = useViewsManager<IDictionary>({});
    const Language = useRefValue<string>(''); 
    const dictionaryRef = useRef<TWord[]>([]);
    const init = async ()=>{
        if (dictionaryRef.current && dictionaryRef.current.length === 0){
                await fetch('/words.json')
                      .then((response) => response.json())
                      .then((data) => {
                          dictionaryRef.current = data;
                      }).finally(() => {
                      });    
        }    
        return dictionaryRef.current.length > 0;
    };
    function set(lang: string){
        if (AvailableLanguages.includes(lang)){
            Language.set(lang);
        } else {
            Language.set('en');
        }
        viewsManager.updateAll({language: Language.get(), getWordByID, getWord});
    };
    function getWordByID(id: number): string{
        const result_word = dictionaryRef.current.find((word: TWord) => word.id === id);
        if (result_word && result_word[Language.get() as keyof TWord]) {
          return String(result_word[Language.get() as keyof TWord]);
        }
        return String(id);
    };
    function getWord(search_word: string): string{
        const result_word = dictionaryRef.current.find((word: TWord) => word.key === search_word);
        if (result_word && result_word[Language.get() as keyof TWord]) {
          return String(result_word[Language.get() as keyof TWord]);
        }
        return String(search_word);
    };
    function addView(view: IViewController<IDictionary>){
        viewsManager.add(view);
        view.update({language: Language.get(), getWordByID, getWord});
    } 
    return {
        languages: AvailableLanguages,
        dictionary: {
            language: Language.get(), 
            getWordByID, 
            getWord    
        },
        set,
        init,
        addView,
    };
};

export default useLocalizaion;
export type { IDictionary, ILocalizator, TDictionary };