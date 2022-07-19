import { React, useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '../form/FormControl'
import Input from '../form/Input'
import Button from '../form/Button'

const Form = ({ formik }) => {
    return (
        <div className="w-full mb-4">
            <form /*onSubmit={handleSubmit}*/ onSubmit={formik.handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="Input Book Name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        // onChange={handleChangeInput}
                        // value={name}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['name']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Description" id="description">
                    <Input
                        placeholder="Input Book Description"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        // onChange={handleChangeInput}
                        // value={description}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['description']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Price" id="price">
                    <Input
                        placeholder="Input Book Price"
                        id="price"
                        type="number"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                        // onChange={handleChangeInput}
                        // value={price}
                    />
                </FormControl>

                <FormControl label="Image" id="image">
                    <Input
                        placeholder="Input Book Image"
                        id="image"
                        name="image"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                    />
                </FormControl>

                <Button type="submit" disabled={!formik.isValid}>
                    {formik.values.id ? 'Update' : 'Submit'}
                </Button>
            </form>
        </div>
    )
}

Form.propTypes = {}

export default Form
