import React from 'react'
// import sg from '../utils/sg.jpg'
// import ReactTimeAgo from 'react-time-ago'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

// const Post = () => 

export default function Post({ _id, title, content, summary, cover, createdAt, author}) {
    
    // const date = new Date(createdAt);
    // const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // console.log(date);

    
    let modifiedcontent = content.slice(0, 77);
    if (content.length > 77) {
        modifiedcontent += "...";
    }


    return (

        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:4000/' + cover} alt="" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <Link className="author">
                        {author.username}
                    </Link>
                    <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm') }</time>
                </p>

                <p className='summary'>{summary}
                </p>
                <div dangerouslySetInnerHTML={{ __html: modifiedcontent }} />
            </div>
        </div>

    )
}