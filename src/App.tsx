import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducoesYup';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';
import { AppRoutes } from './routes';




export const App = () => {

  return (
    <div className="App">
      <AppThemeProvider> {/* todos os temas abraça as paginas*/}
        <DrawerProvider>
          <BrowserRouter> {/* instenção do React DOM*/}
            <MenuLateral>
              <AppRoutes /> {/* route/index.tsx */}
            </MenuLateral>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </div>
  );
}