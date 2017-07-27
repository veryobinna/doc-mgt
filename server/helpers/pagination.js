
export default (queryResult, offset, limit) => ({
  page: Math.floor(offset / limit) + 1,
  pageSize: queryResult.rows.length,
  totalCount: queryResult.count,
  pageCount: Math.ceil(queryResult.count / limit)
});
