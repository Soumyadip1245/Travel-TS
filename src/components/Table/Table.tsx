import React, { useMemo, useState } from 'react';

interface TableProps {
  headers: string[];
  data: Array<{ [key: string]: any }>;
  actions?: (row: any) => JSX.Element;
}

const Table: React.FC<TableProps> = ({ headers, data, actions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const filteredData = useMemo(() => {
    return data.filter(row => {
      return headers.some(header => {
        return row[header]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, headers, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="p-4 flex justify-end">
        <label className="sr-only" htmlFor="table-search">Search</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 11-1.414 1.414l-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block p-2 pl-10 w-full md:w-80 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort(header)}
              >
                <div className="flex items-center">
                  {header}
                  {sortConfig?.key === header ? (
                    <i className={`ml-2 fa-solid ${sortConfig.direction === 'ascending' ? 'fa-arrow-up-wide-short' : 'fa-arrow-down-wide-short'} text-gray-500 dark:text-gray-400`} />
                  ) : (
                    <button className="ml-2">
                      <i className="fa-solid fa-arrow-up-wide-short text-gray-500 hover:text-black-700" />
                    </button>
                  )}
                </div>
              </th>
            ))}
            {actions && <th scope="col" className="px-6 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {headers.map((header, colIndex) => (
                <td className="px-6 py-4" key={colIndex}>{row[header]}</td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
