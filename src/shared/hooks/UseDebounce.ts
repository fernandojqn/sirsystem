import { useCallback, useRef } from 'react';


export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  
  const isFirstTime = useRef(notDelayInFirstTime); // quando inicializa a tela não tem delay
  const debouncing = useRef<NodeJS.Timeout>();


  const debounce = useCallback((func: () => void) => { 
    if (isFirstTime.current) { //se for realizado pela primeira vez
      isFirstTime.current = false; // dai vai receber o false, para sempre cair no else
      func(); // realiza a função lá no parametro

    } else { // vai ser as proximas consultas
      if (debouncing.current) { 
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => func(), delay);
    }
  }, [delay]);

  return { debounce };
};
