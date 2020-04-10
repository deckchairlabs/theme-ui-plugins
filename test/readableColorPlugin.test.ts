import { readableColorPlugin } from '../src';
import { Theme } from 'theme-ui';

describe('readableColorPlugin', () => {
  it('adds readable colors to theme definition', () => {
    const theme: Theme = {
      useCustomProperties: true,
      colors: {
        primary: 'blue',
        text: '#000',
        background: '#fff',
      },
    };

    const plugin = readableColorPlugin();

    expect(plugin(theme)).toStrictEqual({
      useCustomProperties: true,
      colors: {
        background: '#fff',
        backgroundReadableColor: '#000',
        primary: 'blue',
        primaryReadableColor: '#fff',
        text: '#000',
        textReadableColor: '#fff',
      },
    });
  });

  it('accepts light and dark color options', () => {
    const theme: Theme = {
      colors: {
        background: '#fff',
        primary: 'blue',
        text: '#000',
      },
    };

    const plugin = readableColorPlugin({
      lightColor: '#333',
      darkColor: '#ccc',
    });

    expect(plugin(theme)).toStrictEqual({
      colors: {
        background: '#fff',
        backgroundReadableColor: '#333',
        primary: 'blue',
        primaryReadableColor: '#ccc',
        text: '#000',
        textReadableColor: '#ccc',
      },
    });
  });
});
