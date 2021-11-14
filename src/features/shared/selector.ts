import { RootState } from "@store/main";
import { useSelector } from "react-redux";

export const useAsyncOpState = () =>
  useSelector((state: RootState) => state.asyncOp);
