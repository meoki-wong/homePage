import React from "react";
import DataStatistics from "../components/DataStatistics";
import Relationship from "../components/Relationship";
import OneDayWord from "../components/OneDayWord";
import BeautyPhoto from "../components/BeautyPhoto";
import PublicCard from "../components/PublicCard";
import '../assets/css/homeIndex.less'
export default function HomeIndex() {



    return (
        <div className="home-contain">
            <div className="inner-box">
                {/* 功能区 */}
                <div className="func-area">
                    {/* 照片区块 */}
                    <BeautyPhoto />
                    {/* 关系区块 */}
                    <Relationship />
                    {/* 数据区块 */}
                    <DataStatistics />
                    {/* 一言区块 */}
                    <OneDayWord />
                </div>
                {/* 发布区 */}
                <div className="public-area">
                    <PublicCard />
                </div>
            </div>
        </div>
    );
}
