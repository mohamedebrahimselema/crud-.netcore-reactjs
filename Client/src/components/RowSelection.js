import React,{useMemo} from 'react'
import { useTable } from 'react-table';
import { COLUMNS } from './columns'
import './table.css';

 const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = [{
        "id": 1,
        "customer_name": "Gabriel",
        "class_name": "Pink",
        "email": "gjacobson0@google.com.hk",
        "phone": "3296866964",
        "comment": null
    }, {
        "id": 2,
        "customer_name": "Rani",
        "class_name": "Orange",
        "email": "rcassar1@cbc.ca",
        "phone": "4971208127",
        "comment": null
    }, {
        "id": 3,
        "customer_name": "Ryun",
        "class_name": "Fuscia",
        "email": "rmantha2@senate.gov",
        "phone": "5278752610",
        "comment": null
    }];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
      } = useTable({
        columns,
        data
      })

    return(
        <>
        <table {...getTableProps()}    >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            {footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column => (
                  <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </>
    )

}
export default RowSelection;