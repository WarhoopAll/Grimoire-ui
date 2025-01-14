import {useTranslation} from "react-i18next";
import Layout from "@/layouts/layout";

export default function Maintenance() {
    const {t} = useTranslation();
    return (
        <Layout nav={false} welcome={false} status={false}>
            <div
                className="flex flex-col justify-center items-center text-center bg-customBg shadow-2xl rounded-xl border-4 border-customBrown p-10">
                <h1 className="text-6xl font-extrabold text-white">{t("Maintenance.Main")}</h1>
                <p className="text-3xl text-gray-300 mt-6">{t("Maintenance.Text")}</p>
                <p className="text-3xl text-gray-300 mt-3">{t("Maintenance.Text2")}</p>
            </div>
        </Layout>
    );
}
