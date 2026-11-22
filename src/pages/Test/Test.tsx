import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export const Test = () => {
  const [template, setTemplate] = useState('');
  const getHtmlAPI = async () => {
    const response = await fetch('http://localhost:5173/api/templates/test', { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`);
    }

    const data = await response.json();

    setTemplate(data.template);
  };

  useEffect(() => {
    getHtmlAPI();
  }, []);

  console.log('template = ', template);

  return (
    <div>
      <Button onClick={getHtmlAPI}>{'Пуш ми бейби'}</Button>

      {template && <div dangerouslySetInnerHTML={{ __html: template }} />}
    </div>
  );
};
