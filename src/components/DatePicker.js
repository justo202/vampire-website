import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {TextField} from "@mui/material";

// import useStyles from "../styles/Collaborators";

const CustomDatePicker = ({value, handleFieldChange, ...props}) => {
  // const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        onChange={(e) => {
          handleFieldChange(
            "date",
            new Date(e),
            props.label.split(" ")[0].toLowerCase() + "Date"
          );
        }}
        value={value || new Date().valueOf()}
        renderInput={(params) => <TextField fullWidth {...params} />}
      ></DatePicker>
    </LocalizationProvider>
  );
};

export const CustomDatePickerWrapper = (props) => {
  return <CustomDatePicker {...props} />;
};

export default CustomDatePickerWrapper;
