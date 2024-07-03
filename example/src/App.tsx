/* eslint-disable no-console */
import { useEffect } from 'react';
import useDocumentVisibility from '@lokixio/use-document-visibility';

function App() {
    const { count, visible, onVisibilityChange } = useDocumentVisibility();

    useEffect(() => {
      onVisibilityChange((isVisible) => {
        console.log('first handler', isVisible);
      });

      const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
        console.log('second handler', isVisible);
      });

      setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
    }, []);

    return (
      <div>
        <h1>
          Вы покинули страницу: {count} раз Вкладка активна? {visible ? 'да' : 'нет'}
        </h1>
      </div>
    );
  };

export default App;
