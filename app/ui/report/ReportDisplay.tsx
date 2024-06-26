import React from 'react';
import CustomBarChart from './charts/CustomBarChart';
import * as Constant from "@/lib/constants";


const ReportDisplay = ({ reportType, data }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Report</h2>
      { reportType === Constant.REPORT_TYPE_INCOME_VS_REPORT && <CustomBarChart data={data}/> }
    </div>
  );
};

export default ReportDisplay;
