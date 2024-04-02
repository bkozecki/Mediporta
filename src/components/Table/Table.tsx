import { useState } from "react";
import { Table } from "antd";
import pagination from "antd/es/pagination";
import { ColumnsType } from "antd/es/table";

// type TableProps = {
//   tableData: TableData[];
//   pagination: {
//     total: number;
//     page: number;
//     pageSize: number;
//     setPage: Dispatch<SetStateAction<number>>;
//   };
// };

export const TagBrowserTable: React.FC = (pageSize: number) => {
  const [page, setPage] = useState(1);

  // if (status !== "success") return <StatusAsyncHelper status={status} error={error} />
  return (
    <Table
      columns={getColumns()}
      dataSource={}
      rowKey={(item) => item.deviationId}
      pagination={{
        pageSize: pageSize,
        total: 20,
        onChange: (page) => setPage(page),
      }}
    />
  );
};

const getColumns = (): ColumnsType<TableData> => {};
