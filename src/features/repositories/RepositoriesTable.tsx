/* eslint-disable react/jsx-key */
import { useState, useCallback, FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  TableViewProps,
  TableView,
  usePagination,
  useColumns,
} from "@components/TableView";

type Props = Pick<
  TableViewProps,
  "onSortCriterionChange" | "onSortOrderChange" | "totalRepoCount"
> & {
  repos: TableViewProps["data"];
};

export const RepositoriesTable: FC<Props> = ({
  repos,
  totalRepoCount,
  ...rest
}) => {
  const columns = useColumns();
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(totalRepoCount / PER_PAGE);
  const { jump } = usePagination(repos, PER_PAGE);

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
        page={page}
        count={count}
        {...rest}
      />
    </>
  );
};
