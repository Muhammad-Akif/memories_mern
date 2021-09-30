import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'

function Paginate({ page }) {
    const { numberOfPages } = useSelector((state) => state.posts);
    console.log('pts ==> ', numberOfPages);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page))
    }, [page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages} //no. pages
            page={Number(page) || 1} //current page
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )
            }
        />
    )
}

export default Paginate;
