/* eslint-disable react/jsx-key */
import { FC } from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useTable, Column } from "react-table";
import { SortCriterion, SortOrder, Repo } from "@core/types";
import { useColumns, useColumnsCallback } from "./hooks";
import { humanizeIsoDate } from "@utils/date";
import styles from "./TableView.module.css";

export * from "./hooks";

export type TableViewProps = {
  columns: ReturnType<typeof useColumns>;
  data: Repo[];
  onSortOrderChange: (order: SortOrder) => void;
  onSortCriterionChange: (sortCriterion: SortCriterion) => void;
  totalRepoCount: number;
  onPageChange: (e: any, pageNumber: number) => void;
  page: number;
  rowPerPage: number;
};

export const TableView: FC<TableViewProps> = ({
  columns,
  data,
  onSortCriterionChange,
  onPageChange,
  page,
  totalRepoCount,
}) => {
  const callbacks = useColumnsCallback(
    onSortCriterionChange,
    { name: "forks_count", value: "forks" },
    { name: "stargazers_count", value: "stars" },
    { name: "updated_at", value: "updated" }
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns as unknown as ReadonlyArray<Column<Repo>>,
      data,
    });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              const callback = callbacks[column.id];
              return (
                <TableCell
                  {...column.getHeaderProps()}
                  className={!!callback ? styles.sortableField : ""}
                  onClick={() => callback?.()}
                >
                  {column.render("Header")}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const cellContent =
                  cell.column.id === "updated_at"
                    ? humanizeIsoDate(cell.value)
                    : cell.render("Cell");
                return (
                  <TableCell {...cell.getCellProps()}>{cellContent}</TableCell>
                );
              })}
            </TableRow>
          );
        })}
        <TableRow>
          <TablePagination
            count={totalRepoCount}
            rowsPerPage={10}
            page={page}
            onPageChange={onPageChange}
          />
        </TableRow>
      </TableBody>
    </MaUTable>
  );
};
