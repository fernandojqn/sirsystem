import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes';
import { AppThemeProvider } from "./shared/contexts";


export const App = () => {

  return (
    <div className="App">
      <AppThemeProvider> {/* todos os temas abraça as paginas*/}
        <BrowserRouter> {/* instenção do React DOM*/}
          <AppRoutes /> {/* route/index.tsx */}
        </BrowserRouter>
      </AppThemeProvider>
    </div>
  );
}