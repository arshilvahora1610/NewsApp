import React, { Component } from "react";
import PropTypes from "prop-types";

export class NewsItem extends Component {
 
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props
    return (
      <div>
        <div className="card" style={{width: '18rem'}}>
          <img src={!imageUrl?"https://as1.ftcdn.net/v2/jpg/03/27/55/60/1000_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
             {description}
            </p>
            <p className="card-text"><small className="text-muted">by {author} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
           </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
