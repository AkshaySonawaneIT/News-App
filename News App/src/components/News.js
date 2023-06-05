import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        document.title = "NewsMonkey - " + capitalizeFirstLetter(props.category);
        updatePage();
        // eslint-disable-next-line
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updatePage = async () => {
        // console.log("Page Update");
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        setLoading(true);
        let parsedData = await data.json();
        // console.log(parsedData)

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    const handlePreviousClick = async () => {
        setPage(page - 1);
        updatePage();
    }

    const handleNextClick = async () => {
        setPage(page + 1);
        updatePage();
    }

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page + 1 );
            let data = await fetch(url);
            setLoading(true);
            let parsedData = await data.json();
            // console.log(parsedData)
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setLoading(false);
        });
    }


    return (
        <>

            <h1 className='text-center' style={{ margin: '40px 0px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {/* {this.state.loading && <Spinner/>} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<h3>News is loading...</h3>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )

}

News.defaultProps = {
    country: "in",
    pageSize: 3,
    category: 'general',
    page: 1
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    page: PropTypes.number,
}

export default News
