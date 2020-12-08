/*
 *  ************************************************************************
 *  *  © [2015 - 2020] Quintype Technologies India Private Limited
 *  *  All Rights Reserved.
 *  *************************************************************************
 */
import React, { useState, useEffect } from "react";
import { AuthorsList, AuthorPageIntroductionCard } from "@quintype/arrow";

const fetch = require("node-fetch");

export const AuthorsPage = () => {
  const [authorsData, handleAuthorsData] = useState([]);
  const [hideLoadMore, handleLoadMore] = useState(false);
  const [limit, handleLimit] = useState(9);
  const [offset, handleOffset] = useState(9);

  const awaitHelper = promise =>
    promise
      .then(data => ({
        data,
        error: null
      }))
      .catch(error => ({
        error,
        data: null
      }));

  const loadInitialData = async () => {
    const authorsApi = `api/v1/authors?limit=${9}`;
    const { data } = await awaitHelper((await fetch(authorsApi)).json());
    return data.authors;
  };

  useEffect(() => {
    authorsData.length < 1 && loadInitialData().then(authors => handleAuthorsData(authors));
  }, []);

  const fetchData = async offset => {
    const authorsApi = `/api/v1/authors?offset=${offset}&limit=${9}`;
    const { data } = await awaitHelper((await fetch(authorsApi)).json());
    const { authors } = data || {};
    handleAuthorsData([...authorsData, ...authors]);
    (authors === [] || authors.length < 9) && handleLoadMore(!hideLoadMore);
    handleLimit(limit + 9);
  };

  const getLoadMore = () => {
    fetchData(offset);
    handleOffset(offset + 9);
  };

  const authorConfig = {
    buttonText: "Load More"
  };

  const AuthorsListComponent = () => {
    return (
      <div>
        <AuthorsList
          data={authorsData}
          config={authorConfig}
          getMoreData={getLoadMore}
          hideLoadmore={hideLoadMore}
          limit={limit}
        />
      </div>
    );
  };

  return (
    <>
      <AuthorPageIntroductionCard />
      <AuthorsListComponent />
    </>
  );
};
