import React from 'react'

const Newsitem = (props) => {
    let { title, description, imgurl, newsurl, publishedAt, author, sources } = props;
    return (
        <div>
            <div className="card my-2" style={{ 'backgroundColor': '#cdd0df', 'height': '450px' }}>
                <span className="position-absolute  badge rounded-pill bg-danger" style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}>
                    {sources}
                </span>
                <img src={imgurl ? imgurl : "https://casbewiblog.files.wordpress.com/2014/06/breaking-news18.jpg"} className="card-img-top" alt="..." style={{ "height": '160px' }} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(publishedAt).toDateString()}</small></p>
                    <a href={newsurl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}
export default Newsitem