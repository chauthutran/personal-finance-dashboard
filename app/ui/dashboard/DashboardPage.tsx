"use client";

import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExpenseChart from './ExpenseChart';
import { useAuth } from '@/contexts/AuthContext';
import * as Utils from "@/lib/utils";
import { FaCalendar } from "react-icons/fa";


export default function DashboardPage() {

    const { user } = useAuth();
    const [dateRange, setDateRange] = useState<any>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [showDateRangeSelector, setShowDateRangeSelector] = useState(false);

    //   // Example data for charts
    //   const chartData1 = [
    //     { date: '2023-01-01', value: 400 },
    //     { date: '2023-01-02', value: 300 },
    //     { date: '2023-01-03', value: 200 },
    //     { date: '2023-01-04', value: 500 },
    //     { date: '2023-01-05', value: 600 },
    //   ];
    
    return (
        <div className="container p-4">
            <div className="mb-4 bg-slate-200 shadow-lg p-1">
                {showDateRangeSelector && <div className="">
                    <DateRangePicker
                        onChange={(item) => setDateRange([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />
                    <button className="font-bold mx-10 text-red-600" onClick={() => setShowDateRangeSelector(false)} >Close</button>
                </div> }

                {!showDateRangeSelector && <div className="flex px-3 py-5">
                    <div>
                        <i>From</i> <b>{Utils.formatDate(dateRange[0].startDate.toISOString())}</b> 
                        <i> to </i> <b>{Utils.formatDate(dateRange[0].endDate.toISOString())}</b>
                    </div>
                    <button className="mx-10 text-green-600 shadow-lg" title="Choose another date range" onClick={() => setShowDateRangeSelector(true)} ><FaCalendar size={24} /></button>
                </div> }
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <ExpenseChart 
                        userId={user!._id} 
                        startDate={Utils.formatDate(dateRange[0].startDate.toISOString())} 
                        endDate={Utils.formatDate(dateRange[0].endDate.toISOString())} />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Chart 2</h2>
                    {/* <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
                </ResponsiveContainer> */}
                </div>


                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Chart 2</h2>
                    {/* <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
                </ResponsiveContainer> */}
                </div>

            </div>
        </div>
    );
};