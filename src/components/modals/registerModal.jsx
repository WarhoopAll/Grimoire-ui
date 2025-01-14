import {useState} from "react";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox,
} from "@nextui-org/react";
import {Signup} from "@/utils/fetch/fetchActions";
import {TextInput} from "@/components/forms/input";
import useCustomToast from "@/components/forms/toast";

export default function RegisterModal({t}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const {showToast} = useCustomToast();

    const isMobile = window.innerWidth <= 768;

    async function Send(e) {
        e.preventDefault();
        setLoading(true);

        const body = {
            username: login, password: password, email: email,
        };

        if (password !== confirmPassword) {
            showToast(`${t("RegPage.PasswordRetypePassword")}`);
            setLoading(false);
            return;
        }

        const forbiddenChars = /[^a-zA-Z0-9]/;
        if (forbiddenChars.test(login) || forbiddenChars.test(password)) {
            showToast(`${t("RegPage.LoginError")}`);
            setLoading(false);
            return;
        }

        try {
            const res = await Signup(body);

            if (res.status === 201) {
                const {message} = await res.json();
                showToast(message);
                handleClose();
            } else {
                const {message} = await res.json();
                showToast(message);
            }
        } catch (error) {
            showToast(`${t("RegPage.GenericError")}`);
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        setLogin('');
        setPassword('');
        setEmail('');
        setConfirmPassword('');
        onClose();
    }

    return (<>
        <Button variant="light" onPress={onOpen}
                className={`hover:text-customTXT text-white bg-black ${isMobile ? 'buttonClose' : ''}`}>
            {t("Button.Register")}
        </Button>
        <Modal isDismissable={false}
               isOpen={isOpen} onClose={onClose} placement="center">
            <ModalContent>
                <form onSubmit={e => Send(e)}>
                    <ModalHeader className="flex flex-col gap-1">{t("RegPage.CreateAcc")}</ModalHeader>
                    <ModalBody>
                        <TextInput
                            id="username"
                            name="Username"
                            label={t("RegPage.AccountName")}
                            onValueChange={setLogin}
                        />
                        <TextInput
                            id="passwordreg"
                            label={t("RegPage.Password")}
                            value={password}
                            onValueChange={setPassword}
                            isPassword
                        />
                        <TextInput
                            id="retypePassword"
                            label={t("RegPage.RepeatPassword")}
                            value={confirmPassword}
                            onValueChange={setConfirmPassword}
                            isPassword
                        />
                        <TextInput
                            id="email"
                            label={t("RegPage.Email")}
                            type="email"
                            onValueChange={setEmail}
                        />
                        <div className="flex py-2 px-1 justify-between checkBox">
                            <Checkbox
                                isRequired
                                classNames={{
                                    label: "text-small",
                                }}
                            >
                                {t("RegPage.EmailMe")}
                            </Checkbox>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={handleClose} color="danger" variant="flat" className="buttonClose">
                            {t("RegPage.Close")}
                        </Button>
                        <Button color="primary" type="submit" disabled={loading} className="buttonLogin">
                            {loading ? `${t("RegPage.Loading")}` : `${t("RegPage.CreateAcc")}`}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    </>);
}
