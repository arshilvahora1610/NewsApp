import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  articles = [
  ];
  static defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general",
  };

  constructor() {
    super();
    this.state = {
      article: this.articles,
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0028382a14b848f09cac35c538f136ac&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handlePrevClick = async () => {
    console.log("prev clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=0028382a14b848f09cac35c538f136ac&page=${
      this.state.page - 1
    }&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      article: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("next clicked");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 2)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=0028382a14b848f09cac35c538f136ac&page=${
        this.state.page + 1
      }&pageSize=${this.props.pagesize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        article: parsedData.articles,
      });
    }
  };
  render() {
    return (
      <div>
        <div className="container my-3">
          <h1>NewsMonk-Top Headlines</h1>
          <Spinner />
          <div className="row">
            {this.state.article.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={ele.title ? ele.title : ""}
                    description={
                      ele.description ? ele.description.slice(0, 88) : ""
                    }
                    imageUrl={ele.urlToImage}
                    newsUrl={ele.url}
                    author={!ele.author?"Unknown":ele.author}
                    date={ele.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between mb-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
