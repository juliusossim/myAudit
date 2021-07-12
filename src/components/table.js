import React from 'react';
import MaterialTable from 'material-table';

const OrdinaryTable = ({
  columnsDef,
  data,
  title,
  tableActions,
  tableOptions,
  handleRowClick
}) => {
  /** ########### Variables ########################## */
  const selectionHandler = (rows) => console.log(rows);
  return (
    <>
      <MaterialTable
        columns={columnsDef}
        data={data}
        title={title}
        actions={tableActions}
        options={tableOptions}
        onSelectionChange={(rows) => {
          selectionHandler(rows);
        }}
        onRowClick={(event, rowData) => handleRowClick(event, rowData)}
      />
    </>
  );
};
export default OrdinaryTable;
