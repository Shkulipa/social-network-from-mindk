import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

function UiField(props) {
    const [field, { error, touched }] = useField(props);
    return (
        <TextField
            error={!!error}
            touched={touched.toString()}
            {...field}
            {...props}
        />
    );
}

function UiTextarea(props) {
    const [field, { error, touched }] = useField(props);

    return (
        <TextField
            {...field}
            error={!!error}
            touched={touched.toString()}
            {...props}
        />
    );
}

function UiSelect({ selectValues, label, id, labelId, ...props }) {
    const [field, { error, touched }] = useField(props);

    return (
        <FormControl variant="outlined">
            <InputLabel id={labelId}>Available</InputLabel>
            <Select
                {...field}
                error={!!error}
                touched={touched.toString()}
                labelId={labelId}
                id={id}
                label={label}
            >
                {selectValues.map((el) => {
                    return (
                        <MenuItem key={el.val} value={el.val}>
                            {el.text}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

UiSelect.propTypes = {
    selectValues: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    labelId: PropTypes.string,
};

export { UiField, UiTextarea, UiSelect };
