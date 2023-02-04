import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

export default function SubForm(props) {
  const setInput = props.setInput;
  return (
    <div className={"fixed bottom-0 object-bottom w-[100vw]"}>
      <input id="room" autoComplete="off" />
      <div className="footer-chat fixed">
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">
            Type Your Message Here
          </InputLabel>
          <FilledInput
            onChange={(e) => setInput(e.target.value)}
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
          <Button type={"submit"} variant="contained" color="success">
            Success
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
