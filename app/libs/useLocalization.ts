import { useEffect, useState, useRef } from 'react';   
import { TNumberToStringFunc, TStringToStringFunc, TStringProc } from './types';        

type TWord = {
    id: number; 
    key: string;
    en: string; 
    ru: string; 
    annotation: string;
};

interface IDictionary {
    getWordByID: TNumberToStringFunc;  
    getWord: TStringToStringFunc;  
};

interface ILocalizator extends IDictionary {
    language: string;
    languages: string[];
    setLanguage: TStringProc;
};

const AvailableLanguages: string[] = ['en', 'ru'];

const useLocalizaion = ():ILocalizator => {
    const [Language, setLanguage] = useState(AvailableLanguages[0]); 
    const dictionaryRef = useRef<TWord[]>([]);

    useEffect(() => {
        if (dictionaryRef.current && dictionaryRef.current.length === 0){
            fetch('/words.json')
                .then((response) => response.json())
                .then((data) => {
                    dictionaryRef.current = data;
                });    
        }
    }, []);

    function getWordByID(id: number): string{
        const result_word = dictionaryRef.current.find((word: TWord) => word.id === id);
        if (result_word && result_word[Language as keyof TWord]) {
          return String(result_word[Language as keyof TWord]);
        }
        return String(id);
    };

    function getWord(search_word: string): string{
        const result_word = dictionaryRef.current.find((word: TWord) => word.key === search_word);
        if (result_word && result_word[Language as keyof TWord]) {
          return String(result_word[Language as keyof TWord]);
        }
        return String(search_word);
    };
    
    return {
        getWordByID,
        getWord,
        language: Language,
        languages: AvailableLanguages,
        setLanguage,
    };
};

export default useLocalizaion;
export type { IDictionary, ILocalizator };