import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import CategoryExpenseBarChart from './charts/CategoryExpenseBarChart';
import CategoryExpensePieChart from './charts/CategoryExpensePieChart';
import { JSONObject } from '@/lib/definations';

const CategoryExpenseReport = ({ data }) => {
   
    const reportData = data.data[0]; 
    

  return (
    <>
      <h1>Annual Expense Report - {reportData.year}</h1>
      <h2>Total Expense: ${reportData.totalExpense}</h2>

      <Row>
        <Col md={6}>
          <h3>Expense by Category</h3>
          <CategoryExpenseBarChart data={reportData} />
        </Col>
        <Col md={6}>
          <h3>Expense Distribution</h3>
          <CategoryExpensePieChart data={reportData} />
        </Col>
      </Row>

      <h3>Detailed Transactions</h3>
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
    </>
  );
};

export default CategoryExpenseReport;
