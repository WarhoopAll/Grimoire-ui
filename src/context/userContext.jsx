import {createContext, useState, useEffect, useMemo, useCallback} from 'react';
import {useTranslation} from "react-i18next";
import {CheckSession, Logout} from "@/utils/fetch/fetchActions";
import useCustomToast from "@/components/forms/toast";

const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const {t} = useTranslation();
    const {showToast} = useCustomToast();

    const [session, setSession] = useState(() => {
        const storedSession = localStorage.getItem('auth.message');
        try {
            return storedSession ? JSON.parse(storedSession) : null;
        } catch (error) {
            localStorage.removeItem('auth.message');
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    const player = t("Access.Player");
    const moderator = t("Access.Moderator");
    const jrgm = t("Access.JrGm");
    const gm = t("Access.Gm");
    const administrator = t("Access.Administrator");

    const gmLevels = useMemo(() => ({
        0: player, 1: moderator, 2: jrgm, 3: gm, 4: administrator,
    }), [player, moderator, jrgm, gm, administrator]);

    const updateSession = useCallback((newData) => {
        const permissions = gmLevels[newData?.access?.security_level] || gmLevels[0];
        const sessionData = {...newData, account_permissions: permissions};

        if (JSON.stringify(session) !== JSON.stringify(sessionData)) {
            setSession(sessionData);
            localStorage.setItem('auth.message', JSON.stringify(sessionData));
        }
    }, [gmLevels, setSession]);

    const logout = useCallback(async () => {
        try {
            const response = await Logout();
            if (response.ok) {
                setSession(null);
                localStorage.removeItem('auth.message');
            } else {
                showToast(t("Error"));
            }
        } catch (error) {
            showToast(t("Error"));
        }
    }, [showToast, t, setSession]);

    useEffect(() => {
        let isMounted = true;

        const checkSession = async () => {
            if (!session) {
                if (isMounted) {
                    setLoading(false);
                }
                return;
            }

            try {
                const res = await CheckSession();
                if (res.status === 200) {
                    const data = await res.json();
                    if (isMounted) {
                        updateSession(data.data);
                    }
                } else {
                    if (isMounted) {
                        logout();
                    }
                }
            } catch (error) {
                if (isMounted) {
                    logout();
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkSession();
            }
        };

        checkSession();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isMounted = false;
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const contextValue = useMemo(() => ({
        session,
        updateSession,
        logout,
        loading,
    }), [session, updateSession, logout, loading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};