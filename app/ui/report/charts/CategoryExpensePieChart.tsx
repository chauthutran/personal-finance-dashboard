import { JSONObject } from '@/lib/definations';
import React, { useCallback, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector,
} from 'recharts';
import * as ReportService from "@/lib/services/reportService";
import * as Utils from "@/lib/utils";

// // Sample aggregated data
// const data = [
//   {
//     "totalExpense": 12573,
//     "year": 2023,
//     "categories": [
//         {
//             "category": "Miscellaneous",
//             "totalAmount": 180,
//             "transactions": [
//                 {
//                     "date": "2023-06-24T02:56:47.719Z",
//                     "amount": 30,
//                     "description": "Dish washing, detergent, soaps, ...."
//                 },
//                ...
//                
//             ]
//         },
//         ...
//     ]
// },
//     ...
// ];

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
   
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.payload.year}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.name} ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  
    
export default function CategoryExpensePieChart({data}) {
    // pieActiveIndex : [
    //   {2023: 0},
    //   {2024: 1}
    // ]
    const initPieActiveIndex = (): JSONObject => {
      let indexJson = {};
      for( let i=0; i<data.length; i++ ) {
        const year = data[i].year;
        indexJson[year] = 0;
      }

      return indexJson;
    }
    const [pieActiveIndex, setPieActiveIndex] = useState<JSONObject>(initPieActiveIndex());
  

    const setToolTip = (year, index ) => {
      const pieActiveIndexTemp = Utils.cloneJSONObject( pieActiveIndex );
      pieActiveIndexTemp[year] = index;
      setPieActiveIndex( pieActiveIndexTemp );
    }
    const transformData = (reportData: JSONObject): JSONObject[] => {
      return reportData.categories.map((entry) => ({
        name: entry.category,
        value: entry.totalAmount,
        year: reportData.year,
      }));
    };

  return ( 
    <>
    {data.map((reportData, index) => (<>
    <ResponsiveContainer key={`peChart_${reportData.year}_${index}`} width="100%" height={400}>

         <PieChart width={400} height={400}>
          
            <Pie
              activeIndex={pieActiveIndex[reportData.year]}
              activeShape={renderActiveShape}
              data={transformData(data[0])}
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={100}
              fill={ReportService.expenseColors[index % ReportService.expenseColors.length]}
              dataKey="value"
              onMouseEnter={(_, index) => setToolTip(reportData.year, index)}
            />
         
      
    </PieChart>
     
    </ResponsiveContainer>
     <div className="text-center" style={{color: ReportService.expenseColors[index % ReportService.expenseColors.length]}}>
     <svg 
     className="recharts-surface" 
     width="14" height="14" 
     viewBox="0 0 32 32" 
     style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}>
       <title></title>
       <desc></desc>
       <path stroke="none" fill="#FFB6C1" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path>
       </svg>
         {reportData.year}
       </div>
       </>
  ))}


    {/* <PieChart>
      <Pie
        data={transformedData}
        dataKey="value"
        cx="50%"
        cy="50%"
        // labelLine={false}
        outerRadius={150}
        fill="#8884d8"
      >
        {transformedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart> */}
    </>
  );
}

