import { Octokit } from "octokit";
import { SortCriterion, SortOrder } from "@core/types";

type UnWrapPromise<P> = P extends Promise<infer R> ? UnWrapPromise<R> : P;

const octokit = new Octokit();

export type SearchResponse = Pick<
  UnWrapPromise<ReturnType<typeof octokit.rest.search.repos>>["data"],
  "items" | "total_count"
>;

type QualifiersSet = Record<string, string | undefined>;

type SearchParams = {
  language: string;
  sort: SortCriterion;
  order: SortOrder;
  sortValue?: string;
};

const buildQueryString = (query: string, qualifiersSet: QualifiersSet) => {
  return Object.keys(qualifiersSet).reduce((acc: string, qualifier) => {
    const qualifierValue = qualifiersSet[qualifier];
    const queryPart = qualifierValue ? `${qualifier}:${qualifierValue}` : "";
    return queryPart ? `${acc}+${queryPart}` : acc;
  }, query);
};

export type SearchParameters = {
  query: string;
  params: SearchParams;
};
export const searchMostPopularRepos = async ({
  query,
  params,
}: SearchParameters) => {
  const { sort, order, sortValue, ...rest } = params;
  const config =
    sort === "updated"
      ? { sort: `updated-${order}` }
      : { sort, [sort]: sortValue };
  const {
    data: { items, total_count },
  } = await octokit.rest.search.repos({
    q: buildQueryString(query, { ...config, ...rest }),
    order,
    per_page: 10,
    page: 0,
  });
  return { items, total_count } as SearchResponse;
};
