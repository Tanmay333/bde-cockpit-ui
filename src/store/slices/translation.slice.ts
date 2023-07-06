import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    SupportedLanguage,
    supportedLanguages,
    Translations,
} from '../../assets/translations/common';
import { useAppSelector } from '../utils/hooks';

export const TRANSLATION_KEY = 'translation';

const getSupportedLanguageFromLocale = (locale: string): SupportedLanguage => {
    const language = locale.slice(0, 2);

    return (
        Object.values(SupportedLanguage).find(
            (supportedLanguage) => supportedLanguage === language,
        ) || SupportedLanguage.ENGLISH
    );
};

const getDefaultLanguage = (): SupportedLanguage => {
    return getSupportedLanguageFromLocale(navigator.language);
};

export interface TranslationState {
    language: SupportedLanguage;
    locale: string;
}

const initialState: TranslationState = {
    language: getDefaultLanguage(),
    locale: navigator.language,
};

const translationSlice = createSlice({
    initialState,
    name: TRANSLATION_KEY,
    reducers: {
        updateLanguage(state, action: PayloadAction<string>) {
            const language = getSupportedLanguageFromLocale(action.payload);
            const locale = action.payload;
            return {
                ...state,
                language,
                locale,
            };
        },
    },
});

const { actions, reducer } = translationSlice;

export const { updateLanguage } = actions;

export const useTranslations = (): Translations => {
    const language = useAppSelector((state) => state.translation.language);

    return supportedLanguages[language];
};

export const translationReducer = reducer;