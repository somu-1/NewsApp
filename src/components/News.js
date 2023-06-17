import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
// import { ReactDOM } from 'react-dom'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    const capitaliz = (str) => {
        return (
            str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        );
    };

    const updatedata = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=9c68de7a44304331b5ea132710397a43&page=1&pagesize=${props.pagesize}`;
        setloading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseddata = await data.json();
        props.setProgress(70);
        console.log(parseddata);
        setarticles(parseddata.articles);
        settotalResults(parseddata.totalResults)
        setloading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsFlood - ${capitaliz(props.category)} `
        updatedata();
        //eslint-disable-next-line
    }, [])



    // const prevbtnhandle = async () => {
    //     setpage(page - 1)
    //     updatedata();
    // }
    // const nextbtnhandle = async () => {
    //     setpage(page + 1)
    //     updatedata();
    // }
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page + 1}&category=${props.category}&apikey=9c68de7a44304331b5ea132710397a43&page=1&pagesize=${props.pagesize}`;
        setpage(page + 1)
        setloading(true)
        let data = await fetch(url);
        let parseddata = await data.json();
        // console.log(parseddata);
        setarticles(articles.concat(parseddata.articles))
        settotalResults(parseddata.totalResults)
        setloading(false)
    }

    return (
        <div className='container  my-3'>
            <div className="heading text-center my-4" style={{ height: '80px', position: 'relative', top: '50px' }}>
                <h1>NewsFlood- Top Headlines from <span style={{ color: 'red' }}>
                    {capitaliz(props.category)}
                </span></h1>
                {loading && <Spinner />}
            </div>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <div className="newsContainer d-flex justify-content-around">
                    <div className="row my-4" style={{ 'width': '70vw' }}>
                        {articles.map(element => {
                            return <div className="col-md-4 " key={element.url} >
                                <Newsitem title={element.title ? element.title.slice(0, 88) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} sources={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>

            {/* <div className="prevNxtBtn d-flex justify-content-around my-4">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.prevbtnhandle} className="btn btn-dark">&#8592; Previous</button>
                    <button disabled={this.state.page=this.state.lastpage} type="button" onClick={this.nextbtnhandle} className="btn btn-dark">Next &#8594;</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / props.pagesize)} type="button" onClick={this.nextbtnhandle} className="btn btn-dark">Next &#8594;</button>
                </div> */}
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general',
    totalResults: 0
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}

export default News