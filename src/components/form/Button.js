import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
    children,
    type = 'button',
    className,
    variant,
    ...props
}) => {
    const variantButton = {
        danger:
            'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        primary:
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        success:
            'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        warning:
            'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded',
        disabled:
            'bg-gray-800 text-slate-400 font-bold py-2 px-4 rounded cursor-not-allowed',
    }

    return (
        <button
            className={`${
                props.disabled
                    ? `${variantButton.disabled}`
                    : `${
                          variantButton[variant]
                              ? variantButton[variant]
                              : variantButton.primary
                      }`
            } focus:outline-none focus:shadow-outline ${className}`}
            type={type}
            {...props}>
            {children}
        </button>
    )
}

Button.propTypes = {}

export default Button
