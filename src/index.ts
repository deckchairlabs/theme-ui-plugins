import { Theme } from 'theme-ui';
import merge from 'deepmerge';
import * as CSS from 'csstype';
import { readableColor } from 'polished';

type Options = {
  lightColor?: CSS.ColorProperty;
  darkColor?: CSS.ColorProperty;
};

export const readableColorPlugin = (options?: Options) => (
  theme: Theme
): Theme => {
  if (theme.colors) {
    const readableColors: Record<string, CSS.ColorProperty> = {};

    Object.entries(theme.colors).map(([key, value]) => {
      if (typeof value === 'string' && theme.colors !== undefined) {
        readableColors[`${key}ReadableColor`] = readableColor(
          value,
          options?.lightColor,
          options?.darkColor,
          options?.lightColor !== undefined
        );
      }
    });

    return merge(theme, { colors: readableColors }, { clone: true });
  }

  return theme;
};
