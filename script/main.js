import { parseDate, formatSignUp, getStatus } from './service.js';

// load data
async function loadExamData() {
    const res = await fetch('./examData.json'); // JSON 文件必须和 HTML 同目录
    if (!res.ok) {
        console.error('Cannot load examData.json', res.status);
        return [];
    }
    return await res.json();
}

function renderTimeline(data) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = "";

    data.forEach(exam => {
        const startDate = parseDate(exam.signUpStart);
        const endDate = parseDate(exam.signUpEnd);
        const signUpText = formatSignUp(startDate, endDate);
        const status = getStatus(startDate, endDate);

        const item = document.createElement('div');
        item.className = 'timeline-item';

        const date = document.createElement('div');
        date.className = 'timeline-date';
        date.textContent = exam.date;

        const title = document.createElement('div');
        title.className = 'timeline-title';

        title.textContent = exam.name;
        if (status.class === 'status-ongoing') {
            title.textContent = exam.name + '（报名中）';
        }
        if (status.class === 'status-ended') {
            title.textContent = exam.name + '（已结束）';
        }

        const details = document.createElement('div');
        details.className = 'timeline-details';
        details.innerHTML = `
      <p><strong>报名时间：</strong>${signUpText}</p>
      <p><strong>考试地点：</strong>${exam.location}</p>
      <p><strong>TCC 要求：</strong>${exam.requirement}</p>
      <p><strong>报名状态：</strong><span class="status ${status.class}">${status.text}</span></p>
      <p><a href="${exam.link}" target="_blank" rel="noopener noreferrer">查看官网</a></p>
    `;

        item.appendChild(date);
        item.appendChild(title);
        item.appendChild(details);

        // 点击展开折叠
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });

        timeline.appendChild(item);
    });
}

// 关键：在加载数据后再排序和渲染
loadExamData().then(examData => {
    // 按考试时间排序
    const sortedData = [...examData].sort((a, b) => {
        const normalizeDate = str => str.replace('月', '-').replace('日', '');
        const dateA = parseDate(normalizeDate(a.date)); // 从 a.date 可看出，使用的 data 字段进行排序
        const dateB = parseDate(normalizeDate(b.date));
        return dateA - dateB;
    });
    
    renderTimeline(sortedData);
});