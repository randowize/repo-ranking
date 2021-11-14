/* eslint-disable react/jsx-key */
import { useCallback, FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  TableViewProps,
  TableView,
  usePagination,
  useColumns,
} from "@components/TableView";

import { setPage } from "@features/repositories";

type Props = Pick<
  TableViewProps,
  | "onSortCriterionChange"
  | "onSortOrderChange"
  | "totalRepoCount"
  | "page"
  | "rowPerPage"
> & {
  repos: TableViewProps["data"];
};

export const RepositoriesTable: FC<Props> = ({
  repos,
  totalRepoCount,
  rowPerPage,
  ...rest
}) => {
  const columns = useColumns();

  const count = Math.ceil(totalRepoCount / rowPerPage);
  const { jump } = usePagination(repos, rowPerPage);

  const handleChange = useCallback((e: unknown, _page: number) => {
    setPage(_page);
    jump(_page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CssBaseline />
      <TableView
        columns={columns}
        data={repos}
        totalRepoCount={totalRepoCount}
        onPageChange={handleChange}
        rowPerPage={rowPerPage}
        {...rest}
      />
    </>
  );
};
