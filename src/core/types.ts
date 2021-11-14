import type { SearchResponse } from "@services/github";

export type Language = "javascript" | "python" | "scala";
export type SortCriterion = "stars" | "forks" | "updated";
export type SortOrder = "asc" | "desc";

type Repo = SearchResponse["items"][number];

export type { SearchResponse, Repo };
