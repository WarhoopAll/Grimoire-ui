import { useState, useEffect } from 'react';
import i18n from "@/utils/i18n/i18n";

export default function I18nLoader({ children }) {
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleLoaded = () => {
            setIsReady(true);
        };

        i18n.on('loaded', handleLoaded);

        i18n.loadLanguages(i18n.language, (err) => {
            if (err) {
                console.error("Error loading language:", err);
                setError("Failed to load language resources.");
            } else {
                setIsReady(true);
            }
        });

        return () => {
            i18n.off('loaded', handleLoaded);
        };
    }, []);

    if (error) {
        return <div className="flex justify-center items-center my-10 text-red-500">
            {error}
        </div>;
    }

    if (!isReady) {
        return <div className="flex justify-center items-center my-10">
            <div className="custom-spinner"></div>
        </div>;
    }

    return children;
}