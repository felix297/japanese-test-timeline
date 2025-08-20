# japanese-test-timeline

## 数据格式

|字段|含义|备注|
|---|---|----|
|name|考试名称||
|link|考试官网||
|date|考试日期|yyyyMMdd 格式|
|signUpStart|开始报名时间|yyyyMMddhhmmsss 格式|
|signUpEnd|结束报名时间|yyyyMMddhhmmsss 格式|
|location|考试地点||
|requirement|TCC 入学要求||
|note|备注||

## TODO
- [x] 统一数据文件中的时间格式，调整对应的时间处理逻辑
- [x] 时间字段修改

    ```json
    [
        {
            "name": "test-name",
            "link": "official website of the test",
            "date": "yyyyMMddhhmmsss",
            "signUpStart": "yyyyMMddhhmmsss",
            "signUpEnd": "yyyyMMddhhmmsss",
            "location": "location to get into the contest",
            "requirement": "TCC japanese school requirement",
            "note": "notes"
        },
        ...
    ]
    ```
- [x] 考试状态细分：等待报名、报名中、等待考试、考试结束
    |状态|判定条件|
    |---|--------|
    |等待报名|`currDate < signUpStart`|
    |报名中|`signUpStart < currDate < signUpEnd`|
    |等待考试|`signUpEnd < currDate < date`|
    |考试结束|`date < currDate`|

- [x] 显示备注信息