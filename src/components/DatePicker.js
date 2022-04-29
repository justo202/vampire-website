import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {TextField} from "@mui/material";

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
  return <CustomDatePicker fieldId={getIndex(props.label)} {...props} />;
};

const CustomDatePicker = ({date, handleFieldChange, fieldId, ...props}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        onChange={(newValue) => {
          console.log(newValue);
          handleFieldChange(newValue, {fieldId});
        }}
        inputFormat='dd/MM/yyyy'
        value={props.value || new Date().valueOf()}
        renderInput={(params) => <TextField fullWidth {...params} />}
      ></DatePicker>
    </LocalizationProvider>
  );
};

export default CustomDatePickerWrapper;
