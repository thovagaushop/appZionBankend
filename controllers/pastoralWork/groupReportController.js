const groupReportModel = require('../../models/pastoralWork/groupReportModel');

const listReportByUserId = async (req, res, next) => {
  let listReport = await groupReportModel.listByUserId(req.params['userId']);
  if (!listReport) res.status(401).json({status: 'warning', msg: "Error with list data"});
  else res.json({status: 'success', data: listReport});
};

const insertReport = async (req, res, next) => {
  const report = req.body;
  const createReport = await groupReportModel.insert(report);

  if (!createReport) res.status(401).json({status: 'warning', msg: "Send report fail!!!"});
  else res.json({
    status: 'success',
    msg : "Send report successfully",
    createReport: createReport
  });
}

module.exports = {
  listReportByUserId,
  insertReport
};
