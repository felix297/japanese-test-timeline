/**
 * 将 yyyyMMddhhmmsss 格式时间字符串转变为 Date 对象
 * @param {*} str 符合 yyyyMMddhhmmsss 格式的时间字符串
 * @returns 转换后的 Date 对象
 */
export function parseDate(str) {
    if (!str) return null; // 排除空字符串
    if (!/^\d{14}$/.test(str)) return null; // 必须是14位数字

    const year = parseInt(str.substr(0, 4), 10);
    const month = parseInt(str.substr(4, 2), 10) - 1; // 月份从0开始
    const day = parseInt(str.substr(6, 2), 10);
    const hour = parseInt(str.substr(8, 2), 10);
    const minute = parseInt(str.substr(10, 2), 10);
    const second = parseInt(str.substr(12, 2), 10);

    return new Date(year, month, day, hour, minute, second);
}

function toEndOfDay(date) {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function formatSignUp(start, end) {
    if (start && end) return `${start.getMonth() + 1}.${start.getDate()} ~ ${end.getMonth() + 1}.${end.getDate()}`;
    if (end) return `截至 ${end.getMonth() + 1}.${end.getDate()}`;
    if (start) return `从 ${start.getMonth() + 1}.${start.getDate()} 开始`;
    return '未公布';
}

export function getStatus(start, end) {
    const now = new Date();
    if (!start && !end) return { text: '未公布', class: 'status-unpublished' };
    if (end && toEndOfDay(end) < now) return { text: '已结束', class: 'status-ended' };
    if (start && start > now) return { text: '未开始', class: 'status-unpublished' };
    return { text: '报名中', class: 'status-ongoing' };
}