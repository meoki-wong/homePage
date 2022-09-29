import React, { useEffect, useState } from "react";
import { request } from "@/api/request";
import {
	Avatar,
	Button,
	Comment,
	Form,
	Input,
	message,
} from "antd";
import CommentsOption from "./CommentsOption";
import NoLoginComments from "./noLoginComments";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import "../../assets/css/comments.less";
const { TextArea } = Input;
let commentsList: Array<object> = []
const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
	<>
		<Form.Item>
			<TextArea 
      placeholder="分享你的态度~" 
      autoSize={{ minRows: 3, maxRows: 6 }}
      onChange={onChange} 
      value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				评论
			</Button>
		</Form.Item>
	</>
);
let params = {
  pageSize: 10,
  pageNum: 1
}
const Comments = (props: any) => {
	const [searchParams] = useSearchParams();
	const articleId = searchParams.get("id");
	const [comments, setComments] = useState<any>([]);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState("");
  const [commentsTotal, setCommentsTotal] = useState<number>(0)
	useEffect(() => {
		getComment();
	}, []);

	const getComment = async () => {
		let res = await request.post("/getCommitList", { 
      articleId,
      ...params
    });
		const { data, success, total } = res.data;
		if (success) {
			setSubmitting(false);
			setValue("");
			setComments(data);
      setCommentsTotal(total)
		}
	};
	const handleSubmit = async () => {
		if (!value) return;
		setSubmitting(true);
		try {
			let res = await request.post("/setCommit", {
				articleId,
				content: value,
			});
			if (res.data.success) {
				setSubmitting(false);
				setValue("");
				getComment();
				message.success("评论成功");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};
  const showMoreComments = () => {
    params.pageSize += 10
    getComment()
  }
	return (
		<>
			{!localStorage.getItem("token") ? (
				<NoLoginComments />
			) : (
				<Comment
					avatar={<Avatar src={props.userInfo.value.headerImg} />}
					content={
						<Editor
							onChange={handleChange}
							onSubmit={handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			)}
			<div className="comments-area">
        {!commentsTotal && <p className="no-comments">暂无评论</p>}
				{comments.map((item: any) => {
					return (
						<div key={item.id}>
							<CommentsOption
								items={item}
								children={item.articleCommitReplys?.map(
									(ite: any, index: number) => (
										<CommentsOption
											key={index}
											items={ite}
										/>
									)
								)}
							/>
						</div>
					);
				})}
			</div>
      {
        (commentsTotal > 10) && (commentsTotal > comments.length) && <div className="show-more" onClick={showMoreComments}>查看更多</div>
      }
		</>
	);
};

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		userInfo: state.userInfoReducer,
	};
};

export default connect(mapStateToProps)(Comments);
