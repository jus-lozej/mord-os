import axios from "axios";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Window from "../Window";
import "./style.scss";

const NewsFeed = ({ id }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setNews(response.data);
    };

    fetchNews();
  }, []);

  const newsArticles = news.map((article) => {
    return (
      <div key={article.id} className="article">
        <h2>{article.name}</h2>
        <span className="author">Author: {article.email}</span>
        <p>{article.body}</p>
      </div>
    );
  });

  return (
    <Window name="Select a file name" id={id}>
      <div className="news-feed">{newsArticles}</div>
    </Window>
  );
};

NewsFeed.propTypes = {
  id: PropTypes.string,
};

export default NewsFeed;
