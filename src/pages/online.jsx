import {useEffect, useState} from 'react';
import OnlineTable from '../partials/online/OnlineTable';
import images from "../image.json";
import {useTranslation} from "react-i18next";
import {Pagination} from "@nextui-org/react";
import {GET} from "@/utils/fetch/fetchHelper";
import Layout from "@/layouts/layout";

export default function Online() {
    const [characters, setCharacters] = useState([]);
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPages] = useState(1);
    const limit = 10;
    const [isLoading, setIsLoading] = useState(true);

    const fetchCharData = async () => {
        setIsLoading(true);
        let offset = (currentPage * limit) - limit;
        const url = `online?offset=${offset}&limit=${limit}`;

        try {
            const response = await GET({url});
            if (!response.ok) {
                return;
            }

            const data = await response.json();

            if (!data || !data.data || data.data.length === 0) {
                setCharacters([]);
                setTotalPages(1);
                return;
            }

            setCharacters(data.data);
            setTotalPages(data?.totalpages || 1);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const watchPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchCharData().then(() => setIsLoading(false));
    }, [currentPage, limit]);

    return (
        <div>
            <Layout welcome={false}>
                <div className="mb-4">
                    <h1 className="text-2xl md:text-3xl text-white font-bold flex items-center">
                        {t("Menu.Online")}
                    </h1>
                </div>
                <OnlineTable characters={characters} images={images} t={t} isLoading={isLoading}/>
                {totalPage > 1 && (
                    <Pagination props={{watchPage, totalPage, currentPage}}/>
                )}

            </Layout>
        </div>
    );
}