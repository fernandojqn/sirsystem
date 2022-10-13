import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import { DarkTheme, LightTheme } from './../themes';

// Quais propriedades estou compartilhando no contexto
interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void; //auternar o temas
}

//Esse contexto vai ser o que estou compartilhando no contexto
const ThemeContext = createContext({} as IThemeContextData);

// Essa função é para eu usar em qualquer lugar o botão do toggleTheme
export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

//Para usar o children agora depois da atualização
interface IAppThemeProviderProps {
  children: React.ReactNode
}


export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light'); 

  //muda na memoria
  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  //oque está na memoria o light ou back
  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;
    return DarkTheme;
  }, [themeName]); //toda vez que theName for alterado essa função vai ser realizada


  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}> {/* toggleTheme ativa a função do usecallback*/}
      <ThemeProvider theme={theme}> {/* vai ler o que está na memoria*/}
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>{/*a box vai fazer eu usar o 100% da tela*/}
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
