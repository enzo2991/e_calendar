import { fetchNui } from './fetchNui';

interface LocaleResponse {
  locales: Record<string, any>;
}

export const fetchLocaleData = async (): Promise<Record<string, any>> => {
  try {
    const data  = await fetchNui<LocaleResponse>(`getLocaleData`);
    return data.locales || {};
  } catch (error) {
    console.error('Erreur lors de la récupération des locales', error);
    return {};
  }
};