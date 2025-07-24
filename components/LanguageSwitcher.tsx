import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-4 right-4">
      <button onClick={() => changeLanguage('en')} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l">
        EN
      </button>
      <button onClick={() => changeLanguage('es')} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r">
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
