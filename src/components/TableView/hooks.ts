import { useState, useMemo } from "react";
import { Repo, SortCriterion } from "@core/types";
import { KeysPaths } from "@utils/types";

export type KeyPathRepo = KeysPaths<Repo>;

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

export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export const useColumns = () => {
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

export const useColumnsCallback = (
  callback: (sortCriterion: SortCriterion) => void,
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
