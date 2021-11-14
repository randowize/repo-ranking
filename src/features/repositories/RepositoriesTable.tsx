/* eslint-disable react/jsx-key */
import { useMemo, FC } from "react";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTable, Column } from "react-table";
import { SortCriterion, SortOrder, Repo } from "@core/types";
import { KeyPathRepo } from "./types";
import styles from "./RepositoriesTable.module.css";

type ExpandedKeyColumn<T> = {
  Header: React.ReactNode;
} & (
  | {
      accessor: NonNullable<KeyPathRepo>;
      columns?: never;
    }
  | { accessor?: never; columns: ExpandedKeyColumn<T>[] }
);

type RepoColumn = ExpandedKeyColumn<Repo>;

const humanize = (isoDateString: string) =>
  formatDistance(new Date(isoDateString), new Date(), { addSuffix: true });

const useColumnsCallback = (
  callback: TableViewProps["onSortCriterionChange"],
  ...options: { value: SortCriterion; name: string }[]
) => {
  return useMemo(() => {
    return options.reduce((acc, option) => {
      acc[option.name] = () => callback(option.value);
      return acc;
    }, {} as Record<string, () => void | null>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
type TableViewProps = {
  columns: ReturnType<typeof useColumns>;
  data: Repo[];
  onSortOrderChange: (order: SortOrder) => void;
  onSortCriterionChange: (sortCriterion: SortCriterion) => void;
};
const TableView: FC<TableViewProps> = ({
  columns,
  data,
  onSortCriterionChange,
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
                    ? humanize(cell.value)
                    : cell.render("Cell");
                return (
                  <TableCell {...cell.getCellProps()}>{cellContent}</TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

const useColumns = () => {
  return useMemo<RepoColumn[]>(
    () => [
      {
        Header: "General Information",
        columns: [
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "Repository",
            accessor: "name",
          },
        ],
      },
      {
        Header: "Stats",
        columns: [
          {
            Header: "Stars",
            accessor: "stargazers_count",
          },
          {
            Header: "Forks",
            accessor: "forks_count",
          },
          {
            Header: "Last Updated",
            accessor: "updated_at",
          },
        ],
      },
    ],
    []
  );
};

type Props = Pick<
  TableViewProps,
  "onSortCriterionChange" | "onSortOrderChange"
> & {
  repos: TableViewProps["data"];
};

export const RepositoriesTable: FC<Props> = ({ repos, ...rest }) => {
  const columns = useColumns();
  return (
    <>
      <CssBaseline />
      <TableView columns={columns} data={repos} {...rest} />
    </>
  );
};
