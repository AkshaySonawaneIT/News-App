import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    // let publishedDate = new Date(date);
    // publishedDate = publishedDate.getDate()+"/"+publishedDate.getMonth()+"/"+publishedDate.getFullYear();
    return (
        <>
            <div className="my-3">
                <div className="card">
                    <div>
                        <span className='badge rounded-pill bg-danger' style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>{source}</span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/tech/img/2023/04/23/1600x900/matt-houghton-q_X-lyHxcdk-unsplash_1648564105696_1682253532609.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsItem
