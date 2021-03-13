import React from "react";
import TextField from '@material-ui/core/TextField';
import {useField} from "formik";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function UiField(props) {
    const [field, meta] = useField(props);
    return (
        <TextField
            {...field}
            {...meta}
            {...props}
        />
    );


}

function UiTextarea(props) {
    const [field, meta] = useField(props);

    return (
        <TextField
            {...field}
            {...meta}
            {...props}
        />
    );
}

function UiSelect({selectValues, label, id, labelId, ...props}) {
    const [field, meta] = useField(props);

    return (
        <FormControl variant="outlined">
            <InputLabel id={labelId}>Available</InputLabel>
            <Select
                {...field}
                {...meta}
                labelId={labelId}
                id={id}
                label={label}
            >

            {selectValues.map(el => {
                return <MenuItem key={el.val} value={el.val}>{el.text}</MenuItem>
            })}

            </Select>
        </FormControl>
    );
}

export {
    UiField,
    UiTextarea,
    UiSelect
}