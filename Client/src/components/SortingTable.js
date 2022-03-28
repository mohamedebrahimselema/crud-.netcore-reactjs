import React,{useMemo} from 'react'
import { useTable, useSortBy ,useRowSelect } from 'react-table'
import { COLUMNS } from './columns'
import  {Checkbox}  from './Checkbox'
import './table.css';
import CustomerForm from './CustomerForm';

 const SortingTable = () => {
    console.log("useFetch");
    const [response, setResponse] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [cellValue, setCellValue] =  React.useState('');
 
    const columns = useMemo(() => COLUMNS, []);
    var data = useMemo(() => response, [response]);
    const FetchData = async () => {
      try {
        const res = await fetch('https://localhost:5001/Customer/getcustomers');
        let data = await res.json();
        console.log(data);
  
        const jsonRes =await JSON.parse(JSON.stringify(data));
        console.log(jsonRes);
        setResponse(jsonRes);
      } catch (e) {
        console.log(e);
      }
    };
    React.useEffect(() => {
      
      FetchData();
        
      }, []);

      const getCellValue = (cell) =>{
         setCellValue(cell.row.values);
        console.log(cell);
      }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        selectedFlatRows
      } = useTable({
        columns,
        data
      },useSortBy,useRowSelect,
      hooks => {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
          },
          ...columns
        ])
      });

    return(
        <>
        <CustomerForm cellValue={cellValue}   />
        
        <table {...getTableProps()}    >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                       <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                               {column.render('Header')}
                              <span>
                              {column.isSorted
                                    ? column.isSortedDesc
                                    ? ' (Z-A) '
                                    : ' (A-Z) '
                                    : ''}
                              </span>
                     </th>
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
                    return <td 
                    onClick={()=> getCellValue(cell)} {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
        <pre>
        <button
        // onClick={()=>{updateForm(formValues)}}
        >
                       
          {/* {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map(row => row.original)
            },
            null,
            2
          )} */}
        </button>
      </pre>
      </>
    )

}
export default SortingTable ;