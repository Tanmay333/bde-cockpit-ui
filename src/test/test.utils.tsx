import { ReactElement, FC } from 'react';
import { Provider } from 'react-redux';
import {
  render as rtlRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { createAppStore, RootState } from '../store/configureStore';
import { SupportedLanguage } from '../assets/translations/common';

interface RenderOptionsWithState extends RenderOptions {
  initialState?: Partial<RootState>;
}

const render = (
  ui: ReactElement,
  { initialState, ...renderOptions }: RenderOptionsWithState = {},
) => {
  const store = createAppStore({
    ...testTranslationState,
    ...initialState,
  });
  const Wrapper: FC<{ children: ReactElement }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const testTranslationState: Partial<RootState> = {
  translation: {
    language: SupportedLanguage.ENGLISH,
    locale: SupportedLanguage.ENGLISH,
  },
};

const delay = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

const waitForLoading = async (testId: string): Promise<void> => {
  await screen.findByTestId(testId);
  await waitForElementToBeRemoved(() => screen.queryByTestId(testId));
};

export * from '@testing-library/react';
export { render, delay, waitForLoading };
