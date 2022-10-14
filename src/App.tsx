import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes';
import { MenuLateral } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts";


export const App = () => {

  return (
    <div className="App">
      <AppThemeProvider> {/* todos os temas abraça as paginas*/}
        <BrowserRouter> {/* instenção do React DOM*/}
          <MenuLateral>
            <AppRoutes /> {/* route/index.tsx */}
          </MenuLateral>
        </BrowserRouter>
      </AppThemeProvider>
    </div>
  );
}