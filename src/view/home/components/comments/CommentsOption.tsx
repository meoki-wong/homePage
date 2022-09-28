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
export default function CommentsOption(props: CommentsOptionProps) {
	const { items, children } = props;
	const { TextArea } = Input;
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
		if (action === "liked") return;
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
		if (action === "disliked") return;
		let res = await request.post("/setLikes", {
			id: items.id,
			type: "dislike",
		});
		if (res.data.success) {
			setLikes(likes ? --likes : 0);
			setDislikes(++dislikes);
			setAction("disliked");
		}
	};
	const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
		<>
			<Form.Item>
				<TextArea
					autoSize={{ minRows: 1, maxRows: 6 }}
					onChange={onChange}
					value={value}
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
	const handleSubmit = async () => {
		try {
			let res = await request.post("/setCommotReply", {
				content: replyVal,
				commit_id: articleId,
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
		<Comment
			actions={window.localStorage.token ? [] : actions}
			author={<a>{items.author}</a>}
			avatar={<Avatar src={items.avatar} alt={items.author} />}
			content={items.content}
			datetime={moment(items.createdAt).fromNow()}
		>
			{showReply && (
				<Editor
					onchange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						setReplyVal(e.target.value);
					}}
					onSubmit={handleSubmit}
				/>
			)}
			{children}
		</Comment>
	);
}
