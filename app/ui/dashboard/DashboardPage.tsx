"use client";

import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CategoryWiseExppenseChart from './expense/CategoryWiseExppenseChart';
import { useAuth } from '@/contexts/AuthContext';
import * as Utils from "@/lib/utils";
import DatePicker from 'react-datepicker';
import MonthlyExpenseChart from './expense/MonthlyExpenseChart';


export default function DashboardPage() {

    const { user } = useAuth();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [requestToUpdate, setRequestToUpdate] = useState<number>(0);

    const handleUpdateChart = () => {
        let count = requestToUpdate + 1;
        setRequestToUpdate( count );
    }
    
    return (
        <div className="container p-4">
            <div className="mb-4 bg-slate-200 shadow-lg p-1">
             
                <div className="flex px-3 py-5 items-center">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="startDate">
                        From <span className="text-red-600 ml-1">*</span>
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null ) => setStartDate(date) }
                        dateFormat="yyyy-MM-dd"
                        // isClearable
                    />
                </div>
                <div className="mb-4 mx-4">
                    <label className="block text-gray-700 mb-2" htmlFor="endDate">
                        To <span className="text-red-600 ml-1">*</span>
                    </label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null ) => setEndDate(date) }
                        dateFormat="yyyy-MM-dd"
                        // isClearable
                    />
                </div>

                    <button className="ml-5 px-4 py-2  bg-green-700 rounded text-white" onClick={() => handleUpdateChart()} >Reload charts</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <CategoryWiseExppenseChart 
                        userId={user!._id} 
                        startDate={Utils.formatDate(startDate!.toISOString())} 
                        endDate={Utils.formatDate(endDate!.toISOString())} 
                        requestToUpdate={requestToUpdate} />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <MonthlyExpenseChart  userId={user!._id} 
                        startDate={Utils.formatDate(startDate!.toISOString())} 
                        endDate={Utils.formatDate(endDate!.toISOString())} 
                        requestToUpdate={requestToUpdate} />
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