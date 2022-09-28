

// Relationship
export type DateTime = {
    [key in string]: number
}

/**
 * 页面访问量数据
 * @param date 日期
 * @param lastYear 去年同期访问量 （7天）
 * @param thisYears 今年访问量    （7天）
 */
export interface ChartData {
    date: string,
    lastYear: string,
    thisYears: string
}

// 文章
export interface PublicData {
    total: number,
    list: [{
        [key in string]: string
    }]
}

// page
export interface PageParams {
    pageSize: number,
    pageNum: number
}

export interface GetHtml {
    __html: string
}

export type CommentAction = {
    [key in number]: string | null
}

export interface CommentsOptionProps {
    items: {
        is_like: number,
        like_count: number,
        dislike_count: number,
        id: number,
        author: string,
        content: string,
        avatar: string,
        commit_id?: number,
        createdAt: string
    }
    children?: React.ReactNode
}