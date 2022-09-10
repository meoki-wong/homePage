import React from "react";
import '../assets/css/homeIndex.less'
export default function HomeIndex() {



    return (
        <div className="home-contain">
            <div className="inner-box">
                {/* 功能区 */}
                <div className="func-area">
                    <div className="beauty-photo">
                        <img src="https://hippo-meoki.oss-cn-beijing.aliyuncs.com/display-photo/photo_1.jpeg" alt="" />
                        <div className="intro-box">这是什么情况啊</div>
                    </div>
                    <div className="cnzz-box">

                    </div>
                    <div className="one-day-word">
                        <h2>一言难尽</h2>
                        <p>你看我性感的小屁股~</p>
                    </div>
                </div>
                {/* 发布区 */}
                <div className="public-area">

                </div>
            </div>
        </div>
    );
}
