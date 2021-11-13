import { Octokit } from "octokit";
import debounce from "debounce";

type UnWrapPromise<P> = P extends Promise<infer R> ? UnWrapPromise<R> : P;

const octokit = new Octokit();

export type SearchResponse = Pick<
  UnWrapPromise<ReturnType<typeof octokit.rest.search.repos>>["data"],
  "items" | "total_count"
>;

type Qualifier = "language" | "stars";
type QualifiersSet = Partial<Record<Qualifier, string>>;

const buildQueryString = (query: string, qualifiersSet: QualifiersSet) => {
  return Object.keys(qualifiersSet).reduce((acc: string, qualifier) => {
    const qualifierValue = qualifiersSet[qualifier as Qualifier];
    const queryPart = `${qualifier}:${qualifierValue}`;
    return `${acc}+${queryPart}`;
  }, query);
};

export const searchMostPopularReposBy = debounce(
  async (
    query: string,
    qualifiers: QualifiersSet,
    callback: (response: SearchResponse) => void
  ) => {
    const {
      data: { items, total_count },
    } = await octokit.rest.search.repos({
      q: buildQueryString(query, qualifiers),
      sort: "stars",
      order: "desc",
      per_page: 10,
      page: 0,
    });
    callback({ items, total_count } as SearchResponse);
  },
  1000
);
