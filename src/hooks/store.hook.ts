import { appDispatch, RootType } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useAPPSelector = useSelector.withTypes<RootType>()
export const useAPPDispatch = useDispatch.withTypes<appDispatch>()