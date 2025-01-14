import {useCallback, useContext, useState} from "react";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,
} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {Signin} from "@/utils/fetch/fetchActions";
import {UserContext} from "@/context/userContext";
import {TextInput} from "@/components/forms/input";
import useCustomToast from "@/components/forms/toast";

export default function LoginModal({t}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {updateSession} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const {showToast} = useCustomToast();

    const isMobile = window.innerWidth <= 768;

    const Send = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        const body = {
            username: login,
            password: password,
        };

        try {
            const res = await Signin(body);
            if (res.status === 200) {
                const data = await res.json();
                showToast(data?.message);
                updateSession(data?.data);
                onOpenChange(false);
                setLogin('');
                setPassword('');
            } else {
                const {message} = await res.json();
                showToast(message);
            }
        } catch (error) {
            showToast(t("LoginError"));
        } finally {
            setLoading(false);
        }
    }, [login, password, updateSession, showToast, t, onOpenChange]);

    return (
        <>
            <Button
                variant="light"
                onPress={onOpen}
                className={`hover:text-customTXT text-white bg-black ${isMobile ? 'buttonClose' : ''}`}
            >
                {t("Button.Login")}
            </Button>

            <Modal isDismissable={false}
                   isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={Send}>
                            <ModalHeader className="flex flex-col gap-1">{t("Menu.Authorization")}</ModalHeader>
                            <ModalBody>
                                <TextInput
                                    id="login"
                                    name="Login"
                                    label={t("RegPage.AccountName")}
                                    onValueChange={setLogin}
                                />
                                <TextInput
                                    id="password"
                                    label={t("RegPage.Password")}
                                    value={password}
                                    onValueChange={setPassword}
                                    isPassword
                                />
                                <div className="flex py-2 px-1 justify-between">
                                    <Link color="primary" to={`/retrieve`} size="sm">
                                        {t("RegPage.ForgotPassword")}
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" className="buttonClose" onPress={onClose}>
                                    {t("RegPage.Close")}
                                </Button>
                                <Button color="primary" type="submit" className="buttonLogin" disabled={loading}>
                                    {loading ? `${t("RegPage.Loading")}` : `${t("Button.Login")}`}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}