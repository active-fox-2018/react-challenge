import React from 'react'
import { Link } from 'react-router-dom'

export default function newscategory(props) {
    const { category, selectedCategory } = props
    const active = category === selectedCategory ? 'active' : ''

    return (
        <Link className={`col btn btn-light ${active}`} to={`/category/${category}`}>
            {category}
        </Link>
    )
}
