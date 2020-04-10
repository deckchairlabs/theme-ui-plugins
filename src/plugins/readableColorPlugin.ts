import { Theme, ColorMode } from 'theme-ui';
import merge from 'deepmerge';
import * as CSS from 'csstype';
import { readableColor } from 'polished';

type Options = {
  lightColor: CSS.ColorProperty;
  darkColor: CSS.ColorProperty;
};

const mapColorModes = (
  modes: { [k: string]: ColorMode },
  options?: Options
) => {
  const colorModes = {} as { [k: string]: ColorMode };

  Object.entries(modes).forEach(function([key, value]) {
    colorModes[key] = mapReadableColors(value, options);
  });

  return colorModes;
};

const mapReadableColors = (colors: ColorMode, options?: Options) => {
  const readableColors = {} as ColorMode;

  Object.entries(colors).forEach(function([key, value]) {
    if (typeof value === 'string') {
      readableColors[`${key}ReadableColor`] = readableColor(
        value,
        options?.lightColor,
        options?.darkColor,
        options?.lightColor !== undefined
      );
    }
  });

  return readableColors;
};

export const readableColorPlugin = (options?: Options) => (
  theme: Theme
): Theme => {
  if (theme.colors) {
    const colors = mapReadableColors(theme.colors, options);

    if (theme.colors.modes) {
      colors.modes = mapColorModes(theme.colors.modes, options);
    }

    return merge(theme, { colors }, { clone: true });
  }

  return theme;
};
