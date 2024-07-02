import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import CategoryExpenseBarChart from './charts/CategoryExpenseBarChart';
import CategoryExpensePieChart from './charts/CategoryExpensePieChart';
import { JSONObject } from '@/lib/definations';

const CategoryExpenseReport = ({ data }) => {
   
    const reportDataList = data.data; 
    

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cateogry Wise expense Report  </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {reportDataList.map((reportData, index) => {
           return(  <React.Fragment key={index}>
                <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Expense {reportData.year}</h2>
          <p className="text-3xl font-bold">${reportData.totalExpense}</p>
        </div>
             </React.Fragment> )
})}
    </div>

    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 className="text-xl font-semibold mb-4">Expense by Categories</h2>
    <CategoryExpenseBarChart data={reportDataList} />
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
    <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
    {/* <CategoryExpensePieChart data={reportDataList[0]} /> */}
    </div>
     
       <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Details</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>

        {reportDataList.map((reportData) =>
          {reportData.categories.map((category: JSONObject, index: number) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <th colSpan={3} className="bg-gray-200 px-4 py-2   text-left">{category.category}:  {category.totalAmount}$</th>
                </tr>
                {category.transactions.map((transaction: JSONObject, tIndex: number) => {
                  return (
                    <tr key={tIndex}>
                      <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">{transaction.amount}</td>
                      <td className="border px-4 py-2">{transaction.description}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        )}
          {/* {reportData.categories.map((category: JSONObject, index: number) => 
                // const transactions = category.transactions;
                // console.log(category.category); 
                // console.log(transactions);
               {category.transactions.map((transaction: JSONObject, tIndex: number) => {
                console.log("========== transaction");
                console.log(transaction);
                 return (<tr key={`${tIndex}`}>
                  <td className="border px-4 py-2">{transaction.date}</td>
                  <td className="border px-4 py-2">{transaction.amount}</td>
                  <td className="border px-4 py-2">${transaction.description}</td>
                </tr>)
                } )}
)} */}
          </tbody>
        </table>
      </div>

        {/* {reportData.categories.map((category, index) => (
            <div key={index}>
            <h4>{category.category} - Total: ${category.totalAmount}</h4>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {category.transactions.map((transaction, tIndex) => (
                    <tr key={tIndex}>
                    <td>{transaction.date}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.description}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
        ))} */}
    </div>
  );
};

export default CategoryExpenseReport;
