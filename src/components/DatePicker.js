import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {TextField} from "@mui/material";

// import useStyles from "../styles/Collaborators";

const CustomDatePicker = ({value, handleFieldChange, index, ...props}) => {
  // const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        onChange={(e) => {
          handleFieldChange("date", new Date(e), index);
        }}
        value={value || new Date().valueOf()}
        renderInput={(params) => <TextField fullWidth {...params} />}
      ></DatePicker>
    </LocalizationProvider>
  );
};

export const CustomDatePickerWrapper = (props) => {
  const getIndex = (label) => {
    switch (label) {
      case "End Date":
        return "endDate";
      case "Start Date":
        return "startDate";
      default:
        return "date";
    }
  };

  return <CustomDatePicker index={getIndex(props.label)} {...props} />;
};

export default CustomDatePickerWrapper;
