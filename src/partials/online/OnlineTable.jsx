import OnlineTableItem from "@/partials/online/OnlineTableItem";

export default function OnlineTable({characters, images, t, isLoading}) {
    return (<div className="text-customTXT ">
            <div className="overflow-hidden shadow-lg w-full">
                <div
                    className="bg-customBg grid grid-cols-7 mb-4 py-3 rounded-lg border border-customBrown uppercase font-semibold">
                    <div className="text-center ">{t("Other.Name")}</div>
                    <div className="text-center">{t("Other.Level")}</div>
                    <div className="text-center">{t("Other.Race")}</div>
                    <div className="text-center">{t("Other.Class")}</div>
                    <div className="text-center">{t("Other.Faction")}</div>
                    <div className="text-center">{t("Other.Map")}</div>
                    <div className="text-center">{t("Other.Zone")}</div>
                </div>
                <div className="rounded-lg">
                    {isLoading ? (<>
                            {[...Array(1)].map((_, i) => (<OnlineTableItem key={i} isLoading={true}/>))}
                        </>) : characters.length === 0 ? (<div className="text-center text-white text-xl font-bold">
                            {t("Online.NoPlayers")}
                        </div>) : (characters.map((character, index) => (<OnlineTableItem
                                key={index}
                                {...character}
                                name={character?.name}
                                mapRu={character?.map?.map_lang_ru}
                                mapEn={character?.map?.map_lang_en}
                                zoneEn={character?.zone?.zone_lang_en}
                                zoneRu={character?.zone?.zone_lang_ru}
                                level={character?.level}
                                classimage={images?.classImages[character.class]}
                                raceimage={images?.raceGenderImages[`${character?.race}_${character?.gender}`]}
                                faction={[2, 5, 6, 8, 10].includes(character?.race) ? images.factions.HordeImage : images.factions.AllianceImage}
                                images={images}
                                race={character.race}
                                class={character.class}
                                isLoading={false}
                            />)))}
                </div>
            </div>
        </div>);
}

