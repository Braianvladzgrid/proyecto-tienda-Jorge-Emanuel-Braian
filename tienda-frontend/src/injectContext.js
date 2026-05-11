import React, { useState, useEffect } from "react";
import { Context } from "./layout";
import getState from "./flux";
const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(getState({ getStore: () => state.store, getActions: () => state.actions, setStore: (updatedStore) => setState((prev) => ({ ...prev, store: { ...prev.store, ...updatedStore } })) }));
    useEffect(() => { state.actions.getProducts(); if (state.store.token) { state.actions.getCart(); state.actions.getFavorites(); state.actions.getProfile(); } }, []);
    return <Context.Provider value={state}><PassedComponent {...props} /></Context.Provider>;
  };
  return StoreWrapper;
};
export default injectContext;
