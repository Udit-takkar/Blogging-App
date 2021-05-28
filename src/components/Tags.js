import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";
import styled from "styled-components";
import { fetchArticlesByTag } from "../features/articles/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../api/Tags";
require("dotenv").config();

function Tags() {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTage = async () => {
      const res = await getTags();
      // console.log(res);
      if (res.tags) {
        setTags(res.tags);
      }
      setLoading(false);
    };
    setLoading(true, fetchTage());
  }, []);
  return (
    <TagContainer>
      <p>Popular Tags</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        tags.map((tag) => {
          return (
            <TagsList
              onClick={() => {
                dispatch(fetchArticlesByTag({ page: 1, tag }));
              }}
              key={uuid()}
            >
              {tag}
            </TagsList>
          );
        })
      )}
    </TagContainer>
  );
}
const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: inline-block;
  background-color: #818a91;
  color: #fff !important;
  font-size: 0.8rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  white-space: nowrap;
  margin-right: 3px;
  margin-bottom: 0.2rem;
  border-radius: 10rem;
  padding-right: 0.6em;
  padding-left: 0.6em;
  cursor: pointer;
`;
const TagContainer = styled.div`
  max-width: 200px;
  padding: 0.5rem;
  background: #f3f3f3;
  margin-top: 1.5rem;
  max-height: fit-content !important;
`;

export default Tags;
