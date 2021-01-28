import Mock from 'mockjs';

Mock.mock('/api/table/list', 'post', function (req) {
  let limit = req.body.limit || 10;
  let dataList = [];
  let totalCount = Math.floor(Math.random(0, 1) * 100);
  for (let i = 0;i < limit;i++) {
    dataList.push({
      id: Mock.mock('@guid'),
      username: Mock.mock('@cfirst') + Mock.mock('@cname'),
      sex: Mock.mock('@integer(1, 2)'),
      age: Mock.mock('@integer(0, 50)'),
      city: Mock.mock('@county(true)'),
    });
  }
  return {
    code: 0,
    message: 'success',
    result: {
      list: dataList,
      totalCount: totalCount
    }
  };
});

export default Mock;