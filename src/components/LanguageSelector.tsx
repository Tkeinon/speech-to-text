import {useState} from 'react';
import {getLocaleFromHtmlLang, languages} from '../utils/languages';

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        const browserLanguage = getLocaleFromHtmlLang(document.documentElement.lang);
        const language = languages.find((lang: {code: string}) => lang.code === browserLanguage);
        
        return language || languages[0];
    });

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const language = languages.find((lang: {code: string}) => lang.code === event.target.value);
        setSelectedLanguage(language || languages[0]);
    };

    return <select value={selectedLanguage.code} onChange={handleLanguageChange}>
        {languages.map((lang: {code: string, name: string}) => (
            <option key={lang.code} value={lang.code}>
                {lang.name}
            </option>
        ))}
    </select>;
};

export default LanguageSelector;