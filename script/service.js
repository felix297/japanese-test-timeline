export function parseDate(str, refYear) {
  if (!str) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
  if (/^\d{2}-\d{2}$/.test(str)) {
    let [m, d] = str.split('-').map(Number);
    let y = refYear || new Date().getFullYear();
    const date = new Date(y, m - 1, d);
    if (m < 3 && (new Date().getMonth() > 9)) date.setFullYear(y + 1);
    return date;
  }
  return null;
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