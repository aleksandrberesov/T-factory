import { useEffect, useState, useRef, useCallback } from 'react';
import { TStringElement } from './types';   
import { TNumberToStringFunc, TStringToStringFunc, TStringProc } from './types';        

type TLanguage = 'en' | 'ru';

type TWord = {
    id: number;
    key: string;
    word: string;
    annotation?: string;  
}; 

type TDictionaryWord = {
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
    selectedLang: string;
    languages: string[];
    setLanguage: TStringProc;
};

const AvailableLanguages: TLanguage[] = ["en", 'ru'];
const LanguageIDs : TStringElement[] = [
    {
        id: 0,  
        element: AvailableLanguages[0]
    },
    {
        id: 1,
        element: AvailableLanguages[1]
    }
];

const useLocalizaion = (initlang: string | undefined):ILocalizator => {
    
    const dictionaryRef = useRef<TDictionaryWord[]>([]);
    const [words, setWords] = useState<TWord[]>([]);
    const Lang = initlang || AvailableLanguages[0];

    useEffect(() => {
        
        fetch('/words.json')
            .then((response) => response.json())
            .then((data) => {
                dictionaryRef.current = data;
                setLanguage(Lang);
            });
    }, [Lang]);

    function PushWords(lang: keyof TDictionaryWord = "en"): TWord[]{
        let w: TWord[] = [];
        dictionaryRef.current.forEach((_word: TDictionaryWord) => {
            w.push({id: _word.id, key: _word.key, word: String(_word[lang]), annotation: _word.annotation});    
        });
        return w;
    };

    const setLanguage = useCallback((lang: string) => {
        let selectedLang: keyof TDictionaryWord = lang as keyof TDictionaryWord;
        setWords(PushWords(selectedLang));
    }, []);

    function getWordByID(id: number): string{
        const word = words.find((word: TWord) => word.id === id);
        if (word) {
          return word.word;
        }
        return String(id);
    };

    function getWord(search_word: string): string{
        const word = words.find((word: TWord) => word.key === search_word);
        if (word) {
          return word.word;
        }
        return String(search_word);
    };
    
    return {
        getWordByID,
        getWord,

        selectedLang: 'ru',
        languages: AvailableLanguages,
        setLanguage
    };
};

export default useLocalizaion;
export type { TLanguage };
export { LanguageIDs };