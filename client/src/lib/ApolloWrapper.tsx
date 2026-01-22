"use client";

import React from "react";
// Using the v3 React entry point as we configured earlier
import { ApolloProvider } from "@apollo/client/react/index.js";
import { client } from "./apollo-client";

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};