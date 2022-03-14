import React, { useEffect, useState } from 'react';
import _ from "lodash";

const pageSize = 10;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    console.log('post', posts);
    console.log('paginatedPosts', paginatedPosts);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        setPaginatedPosts(_(posts).slice(0).take(pageSize).value())
    }, [])

    const pageCount = posts ? Math.ceil(posts.length/pageSize) : 0;
    if(pageCount === 1) return null;

    const pages = _.range(1, pageCount+1);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber-1)*pageSize;
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setPaginatedPosts(paginatedPost);
    }

    return (
        <div>
            <h3 className='text-center mt-5 mb-3 text-success'>Posts List</h3>

            <table className='table container'>
                <thead>
                    <tr className='text-primary'>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Post</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedPosts.map((post, index) => (
                            <tr key={index}>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td>
                                    <p className={post.completed ? "btn btn-success" : "btn btn-danger"}>
                                        {
                                            post.completed ? "Completed" : "Pending"
                                        }
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className='container d-flex justify-content-center align-items-center'>
                <nav className='d-flex justify-content-center'>
                    <ul className='pagination'>
                        {
                            pages.map((page) => (
                                <li key={1} className={
                                    page === currentPage ? "page-item active" : "page-item"
                                }>
                                    <p className='m-2 page-link' onClick={() => handlePagination(page)}>{page}</p>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <p className='text-center'>{(currentPage*10)-9} - {currentPage*pageSize} of {posts.length} Posts</p>
            </div>
        </div>
    );
};

export default Posts;