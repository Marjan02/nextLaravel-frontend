import React from 'react'
import PropTypes from 'prop-types'

const Input = (
    props /*{ placeholder, id, type = 'text', name, onChange, value }*/,
) => {
    return (
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // id={id}
            // type={type}
            // placeholder={placeholder ? placeholder : 'Example'}
            // name={name}
            // onChange={onChange}
            // value={value}
            type="text"
            {...props} // ohh bisa gini <- shorthand
        />
    )
}

Input.propTypes = {}

export default Input
