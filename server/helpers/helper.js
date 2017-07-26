
export default (objectName, offset, limit) => ({
  page: Math.floor(offset / limit) + 1,
  pageSize: objectName.rows.length,
  totalCount: objectName.count,
  pageCount: Math.ceil(objectName.count / limit)
});
