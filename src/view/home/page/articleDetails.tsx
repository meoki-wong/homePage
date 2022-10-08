import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { request } from "@/api/request";
import "../assets/css/articleDetails.less";
import { GetHtml, artcileInfo } from "../type/home";
import Comments from "../components/comments/Comments";
import CommonAnimate from "../components/CommonAnimate";
import LikedJson from "../assets/animateJson/liked.json";
import CollectJson from "../assets/animateJson/collect.json";
import { $ } from "../utils/commonUtils";
export default function ArticleDetails() {
	let likedConfig = {
		animationData: LikedJson,
		loop: false,
		autoplay: false,
	};
	let collectConfig = {
		animationData: CollectJson,
		loop: false,
		autoplay: false,
	};
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const [getHtml, setGetHtml] = useState<GetHtml>({
		__html: "",
	});
	const [articleData, setArticleData] = useState<artcileInfo>();
	const likedRef = useRef<any>();
	const collectRef = useRef<any>();
	useEffect(() => {
		getArticleDetails();
	}, []);
	const getArticleDetails = async () => {
		let res = await request.post("/getArticleDetails", { id });
		if (res.data.success) {
			let { data } = res.data;
			setArticleData(data);
			setGetHtml({
				__html: data.articleContent,
			});
		}
	};
	const liked = () => {
		likedRef.current.play();
	};
    const collected = () => {
		collectRef.current.play();
    }
	return (
		<div className="article-contain">
			<p className="title">{articleData?.title}</p>
			<p className="show-option">
				<span className="time">发布时间：{articleData?.createdAt}</span>
			</p>
			<hr />
			<div dangerouslySetInnerHTML={getHtml}></div>
			<div className="opt-area">
				<i className="iconfont icon-dashang"></i>
				<i className="iconfont icon-dianzan" onClick={liked}></i>
				<i className="iconfont icon-shoucang" onClick={collected}></i>
                <CommonAnimate configuration={likedConfig} ref={likedRef} />
                <CommonAnimate configuration={collectConfig} ref={collectRef} />
			</div>
			<Comments />
		</div>
	);
}
