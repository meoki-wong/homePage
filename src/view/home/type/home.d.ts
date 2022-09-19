

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