import {memo, useCallback, useContext, useMemo} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
    Tooltip,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "@/context/userContext";
import LoginModal from "@/components/modals/loginModal";
import RegisterModal from "@/components/modals/registerModal";
import {Activity, ChevronDown, TagUser} from "@/components/icons/icons";

const Navigation = memo(() => {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const {session, logout} = useContext(UserContext);

    const pathname = useMemo(() => location.pathname, [location]);

    const handleLogout = useCallback(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    const icons = useMemo(() => ({
        chevron: <ChevronDown fill="currentColor" size={16}/>,
        activity: <Activity className="text-secondary" fill="currentColor" size={30}/>,
        user: <TagUser className="text-danger" fill="currentColor" size={30}/>,
    }), []);

    const menuItems = useMemo(() => [t("Menu.Home"), t("Menu.Armory"), t("Menu.Online"), t("Menu.Ladder"),], [t]);

    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    const isMenuActive = useCallback((path) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    }, [pathname]);

    return (<Navbar isBordered className="wow-navbar wow-bg-background">
            <NavbarContent className="sm:hidden text-white">
                <NavbarMenuToggle aria-label="Menu"/>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarBrand className="hidden lg:flex floating">
                    <img width="100" src={`/assets/bg/Medivh.png`} alt="Medivh"/>
                </NavbarBrand>

                <NavbarItem isActive={isMenuActive("/")}>
                    <Link color="foreground" className="cursor-pointer" onPress={() => handleNavigate("/")}>
                        {t("Menu.Home")}
                    </Link>
                </NavbarItem>

                <NavbarItem isActive={isMenuActive("/armory")}>
                    <Tooltip content={t("Menu.DescArmory")}>
                        <Link color="foreground" className="cursor-pointer" onPress={() => handleNavigate("/armory")}>
                            {t("Menu.Armory")}
                        </Link>
                    </Tooltip>
                </NavbarItem>

                <Dropdown>
                    <DropdownTrigger>
                        <Button endContent={icons.chevron} variant="light">
                            {t("Menu.Statistic")}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="ladder"
                                      description={t("Menu.DescLadder")}
                                      startContent={icons.user}
                                      onPress={() => handleNavigate("/ladder")}>
                            {t("Menu.Ladder")}
                        </DropdownItem>
                        <DropdownItem key="online_players"
                                      description={t("Menu.DescOnline")}
                                      startContent={icons.activity}
                                      onPress={() => handleNavigate("/online")}>
                            {t("Menu.Online")}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            {session ? (<NavbarContent justify="end">
                    <Dropdown>
                        <DropdownTrigger>
                            <User
                                className="text-white"
                                name={session?.profile?.name}
                                description={t(session?.account_permissions)}
                                avatarProps={{
                                    src: session?.profile?.avatar || '/assets/avatar/default.png',
                                }}
                            />
                        </DropdownTrigger>
                        <DropdownMenu>
                            {session?.coins > 0 && (
                                <DropdownItem isDisabled key="profile" className="h-11 mb-2" textValue="Profile">
                                    {t("Coins")}: <span className="font-semibold">{session?.coins}</span>
                                </DropdownItem>)}
                            <DropdownItem key="settings"
                                          className="h-11 mb-2"
                                          onPress={() => handleNavigate("/panel")}>
                                {t("Menu.UserPanel")}
                            </DropdownItem>
                            {session?.access?.security_level >= 2 && (<DropdownItem key="admins"
                                                                                    className="h-11 mb-2"
                                                                                    onPress={() => handleNavigate("/ad")}>
                                    {t("Menu.AdminPanel")}
                                </DropdownItem>)}
                            <DropdownItem
                                key="logout"
                                onPress={handleLogout}>
                                {t("Menu.SignOut")}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>) : (<NavbarContent justify="end">
                    <LoginModal t={t}/>
                    <RegisterModal t={t}/>
                </NavbarContent>)}
            <NavbarMenu className="mt-7 bg-blur border border-customBrown max-h-[30vh]">
                {menuItems.map((item, index) => (<NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full text-center block mt-4"
                            color="text-black"
                            onPress={() => handleNavigate(index === 0 ? "/" : index === 1 ? "/armory" : index === 2 ? "/online" : "/ladder")}
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>))}
            </NavbarMenu>
        </Navbar>);
});

export default Navigation;