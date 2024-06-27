import React from 'react';
import CustomBarChart from '../charts/CustomBarChart';
import * as Constant from "@/lib/constants";
import CustomLineChart from '../charts/CustomLineChart';


const ReportDisplay = ({ reportType, data }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Report</h2>
      { reportType === Constant.REPORT_TYPE_INCOME_VS_EXPENSE && <>
        <CustomBarChart data={data}/>
        <CustomLineChart data={data}/> 
      </> }
      { reportType === Constant.REPORT_TYPE_BUDGET_VS_ACTUAL && <>
        <CustomBarChart data={data}/>
        <CustomLineChart data={data}/> 
      </>}
    </div>
  );
};

export default ReportDisplay;
