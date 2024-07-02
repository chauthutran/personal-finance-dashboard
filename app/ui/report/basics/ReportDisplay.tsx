import React from 'react';
import CustomBarChart from '../charts/CustomBarChart';
import * as Constant from "@/lib/constants";
import CustomLineChart from '../charts/CustomLineChart';
import MonthlyStackedBarChart from '../charts/MonthlyStackedBarChart';
import AnnualStackedBarChart from '../charts/AnnualStackedBarChart';
import { useCategory } from '@/contexts/CategoryContext';
import CategoryExpenseReportPage from '../caterogyWiseExpenseReport/CategoryWiseExpenseReportPage';
import IncomeVsExpenseReportPage from '../incomeVsExpenseReport/IncomeVsExpenseReportPage';


const ReportDisplay = ({ reportType, data, periodType, startDate, endDate }) => {
  const { categoryList } = useCategory();

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Report</h2>
      { reportType === Constant.REPORT_TYPE_INCOME_VS_EXPENSE && <>
        {/* <CustomBarChart data={data}/>
        <CustomLineChart data={data}/>  */}
        <IncomeVsExpenseReportPage data={data} startDate={startDate} endDate={endDate} periodType={periodType} />
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
        <CategoryExpenseReportPage data={data} />
      </>}
      
    </div>
  );
};

export default ReportDisplay;
