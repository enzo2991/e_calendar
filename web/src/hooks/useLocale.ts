import { useEffect, useState } from 'react';
import { fetchLocaleData } from '../utils/locale';

export const useLocale = () => {
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadLocaleData = async () => {
      const localeData = await fetchLocaleData();
      setTranslations(localeData);
    };

    loadLocaleData();
  }, []);

  return translations;
};