import { renderItem, sortDataByDate } from './service.js'

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

    data.forEach(row => {
        timeline.appendChild(renderItem(row));
    });
}

loadExamData().then(data => {
    renderTimeline(sortDataByDate(data));
});