'use client';
import { store } from "@/store/store";

import {  ReactNode } from "react";
import { Provider } from "react-redux";


export default function ReduxProvider({children}: {childern: ReactNode}) {
  return <>
  <Provider store={store}> 
    {children}
  </Provider>
  </>
}
