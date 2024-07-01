import React from 'react';
import CustomBarChart from '../charts/CustomBarChart';
import * as Constant from "@/lib/constants";
import CustomLineChart from '../charts/CustomLineChart';
import MonthlyStackedBarChart from '../charts/MonthlyStackedBarChart';
import AnnualStackedBarChart from '../charts/AnnualStackedBarChart';
import { useCategory } from '@/contexts/CategoryContext';
import CustomPieChart from '../charts/CustomPieChart';
import CategoryExpenseReport from '../CategoryWiseExpenseReport';


const ReportDisplay = ({ reportType, data }) => {
  const { categoryList } = useCategory();

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
      { reportType === Constant.REPORT_TYPE_MONTHLY_EXPENSE && <>
        <MonthlyStackedBarChart data={data} categoryList={categoryList!} />
      </>}
      { reportType === Constant.REPORT_TYPE_ANNUAL_FINANCIAL_SUMMARY && <>
        <AnnualStackedBarChart data={data} categoryList={categoryList!} />
      </>}
      { reportType === Constant.REPORT_TYPE_CATEGORY_WISE_EXPENSE && <>
        <CategoryExpenseReport data={data} />
      </>}
      
    </div>
  );
};

export default ReportDisplay;
