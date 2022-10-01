import { Avatar, Comment, Form, Tooltip, Input, Button, message } from "antd";
import React, { createElement, useState } from "react";
import moment from "moment";
import {
	DislikeFilled,
	DislikeOutlined,
	LikeFilled,
	LikeOutlined,
	MessageOutlined,
} from "@ant-design/icons";
import { request } from "@/api/request";
import { useSearchParams } from "react-router-dom";
import "../../assets/css/CommentsOption.less";
import { CommentAction, CommentsOptionProps } from "../../type/home";

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
	<>
		<Form.Item>
			<TextArea
				autoSize={{ minRows: 1, maxRows: 6 }}
				onChange={onChange}
				placeholder="回复评论"
			/>
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				回复评论
			</Button>
		</Form.Item>
	</>
);
export default function CommentsOption(props: CommentsOptionProps) {
	const { items, children } = props;
	const actionObj: CommentAction = {
		0: null,
		1: "liked",
		2: "disliked",
	};
	const actionType: string | null = actionObj[items?.is_like];
	const [searchParams] = useSearchParams();
	const articleId = searchParams.get("id");
	let [likes, setLikes] = useState<number>(items?.like_count || 0);
	let [dislikes, setDislikes] = useState(items?.dislike_count || 0);
	const [action, setAction] = useState<string | null>(actionType);
	const [showReply, setShowReply] = useState<boolean>(false);
	const [replyVal, setReplyVal] = useState<string>("");
	const like = async () => {
		if (action === "liked") {
			cancelOptions(action);
			return;
		}
		let res = await request.post("/setLikes", {
			id: items.id,
			type: "like",
			commit_id: items.commit_id || null,
		});
		if (res.data.success) {
			setLikes(++likes);
			setDislikes(dislikes ? --dislikes : 0);
			setAction("liked");
		}
	};
	const dislike = async () => {
		if (action === "disliked") {
			cancelOptions(action);
			return;
		}
		console.log('---items', items)
		let res = await request.post("/setLikes", {
			id: items.id,
			type: "dislike",
			commit_id: items.commit_id || null,
		});
		if (res.data.success) {
			setLikes(likes ? --likes : 0);
			setDislikes(++dislikes);
			setAction("disliked");
		}
	};
	// 取消点赞操作
	const cancelOptions = async (type: string) => {
		try {
			let res = await request.post("/setLikes", {
				id: items.id,
				type,
				isCancal: 1,
				commit_id: items.commit_id || null,
			});
			if (res.data.success) {
				setAction(null); // 取消选择状态
				if (type === "liked") {
					setLikes(likes ? --likes : 0);
				} else {
					setDislikes(dislikes ? --dislikes : 0);
				}
			}
		} catch (err) {
			console.log("--err");
		}
	};
	const actions = [
		<Tooltip key="comment-basic-like" title="喜欢">
			<span onClick={like}>
				{createElement(action === "liked" ? LikeFilled : LikeOutlined)}
				<span className="comment-action">{likes}</span>
			</span>
		</Tooltip>,
		<Tooltip key="comment-basic-dislike" title="不喜欢">
			<span onClick={dislike}>
				{React.createElement(
					action === "disliked" ? DislikeFilled : DislikeOutlined
				)}
				<span className="comment-action">{dislikes}</span>
			</span>
		</Tooltip>,
		<Tooltip key="comment-basic-reply-to" title="评论">
			<span onClick={() => setShowReply(!showReply)}>
				<MessageOutlined />
			</span>
			,
		</Tooltip>,
	];
	const handleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReplyVal(e.target.value);
	};
	const handleSubmit = async () => {
		try {
			let res = await request.post("/setCommotReply", {
				content: replyVal,
				commit_id: items.id,
			});
			if (res.data.success) {
				message.success("回复成功");
				setShowReply(false);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Comment
				actions={!window.localStorage.token ? [] : actions}
				author={<a>{items.author}</a>}
				avatar={<Avatar src={items.avatar} alt={items.author} />}
				content={<p>{items.content}</p>}
				datetime={moment(items.createdAt).fromNow()}
			>
				{showReply && (
					<Editor onChange={handleChanges} onSubmit={handleSubmit} />
				)}
				{children}
			</Comment>
		</>
	);
}
