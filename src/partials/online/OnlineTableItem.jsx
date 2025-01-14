import {Tooltip} from "@nextui-org/react";
import {classes, races} from "@/utils/wowData";
import i18n from "i18next";
import {Skeleton} from "@nextui-org/react";

export default function OnlineTableItem(props) {
    const currentLanguage = i18n.language;
    const raceName = races[props.race];
    const className = classes[props.class];

    if (props.isLoading) {
        return (<Skeleton className="w-full min-h-40 border border-customBrown rounded-lg bg-customBg"/>);
    }

    return (<div
            className="grid grid-cols-7 py-4 border border-customBrown rounded-lg my-1 bg-customBg font-semibold cursor-pointer">
            <div className="text-center hover:text-red-800">{props.name}</div>
            <div className="text-center">{props.level}</div>
            <Tooltip content={raceName} color="warning" showArrow={true}>
                <div className="flex justify-center items-center">
                    <img className="rounded-full" width={30} src={props.raceimage} alt={raceName}/>
                </div>
            </Tooltip>
            <Tooltip content={className} color="secondary" showArrow={true}>
                <div className="flex justify-center items-center">
                    <img className="rounded-full" width={30} src={props.classimage} alt={className}/>
                </div>
            </Tooltip>
            <div className="flex justify-center items-center">
                <Tooltip content={props.faction.includes("horde") ? "Horde" : "Alliance"} color="primary"
                         showArrow={true}>
                    <img width={30} src={props.faction} alt="Faction"/>
                </Tooltip>
            </div>
            <div className="text-center whitespace-nowrap">
        <span className="bg-[#40352e] px-3 py-1 rounded-full text-white text-sm">
          {currentLanguage === "ru" ? props.mapRu : props.mapEn}
        </span>
            </div>
            <div className="text-center whitespace-nowrap">
        <span className="bg-[#40352e] px-3 py-1 rounded-full text-white text-sm">
          {currentLanguage === "ru" ? props.zoneRu : props.zoneEn}
        </span>
            </div>
        </div>);
}