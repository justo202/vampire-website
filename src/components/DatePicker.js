import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {TextField} from "@mui/material";

const CustomDatePicker = ({value, handleFieldChange, index, ...props}) => {
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

// Wrapper component that can deal with the LocalizationProvider and DatePicker from
// Material UI
export const CustomDatePickerWrapper = (props) => {
  // function to determine the fieldId/label of the date component
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

  // returns component with calculated props
  return <CustomDatePicker index={getIndex(props.label)} {...props} />;
};

export default CustomDatePickerWrapper;
