import { parseDate, formatSignUp, getStatus } from './util.js';

export function renderItem(exam) {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    const date = getDateEle(exam);
    const title = getTitleEle(exam);
    const details = getDetailsEle(exam);

    item.appendChild(date);
    item.appendChild(title);
    item.appendChild(details);

    // 点击展开折叠
    item.addEventListener('click', () => {
        item.classList.toggle('expanded');
    });
    return item;
}

function getDateEle(exam) {
    const currDate = new Date();
    const contestDate = parseDate(exam.date);
    const date = document.createElement('div');
    date.className = 'timeline-date';
    if (!contestDate) {
        date.textContent = '日期未公布';
        return date;
    }
    if (contestDate.getFullYear() === currDate.getFullYear()) {
        date.textContent = `${contestDate.getMonth() + 1}.${contestDate.getDate()}`;
    } else {
        date.textContent = `${contestDate.getFullYear()}.${contestDate.getMonth() + 1}.${contestDate.getDate()}`;
    }
    return date;
}

function getDetailsEle(exam) {
    const signUpText = formatSignUp(exam.signUpStart, exam.signUpEnd);
    const status = getStatus(exam);
    const details = document.createElement('div');
    details.className = 'timeline-details';
    details.innerHTML = `
      <p><strong>报名时间：</strong>${signUpText}</p>
      <p><strong>考试地点：</strong>${exam.location}</p>
      <p><strong>TCC 要求：</strong>${exam.requirement}</p>
      <p><strong>报名状态：</strong><span class="status ${status.class}">${status.text}</span></p>
      <p><strong>备注：</strong>${exam.note}</p>
      <p><a href="${exam.link}" target="_blank" rel="noopener noreferrer">查看官网</a></p>
    `;
    return details;
}

function getTitleEle(exam) {
    const status = getStatus(exam);
    const title = document.createElement('div');
    title.className = 'timeline-title';
    title.textContent = exam.name;

    if (status.class === 'status-signup-ongoing' || status.class === 'status-test-waiting') {
        title.textContent = exam.name + '（'+ status.text +'）';
    }
    console.log(status.class);
    return title;
}

/**
 * 将数据行按 date 字段排序
 * @param {*} data 待排序的数据
 * @returns 排序后的数据行
 */
export function sortDataByDate(data) {
    return [...data].sort((a, b) => {
        const date1 = parseDate(a.date);
        const date2 = parseDate(b.date);
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return date1 - date2;
    });
}