export default function MonthExpenseTable({data}) {

    return (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((expense) => (
              <tr key={expense.id}>
                <td className="py-2 px-4 border-b">{expense.date}</td>
                <td className="py-2 px-4 border-b">{expense.category}</td>
                <td className="py-2 px-4 border-b">${expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}