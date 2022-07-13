import { useContextSelector } from 'use-context-selector';

import { ThemeContext } from '@contexts/ReactThemeContext';
import { IColors } from '@interfaces/generic/IColors';

function useColors(): { colors: IColors } {
  const colors = useContextSelector(ThemeContext, state => state.colors);

  return { colors };
}

function useToggleTheme(): { toggleTheme: () => void } {
  const toggleTheme = useContextSelector(
    ThemeContext,
    state => state.toggleTheme,
  );

  return { toggleTheme };
}

export const UseTheme = {
  useColors,
  useToggleTheme,
};
