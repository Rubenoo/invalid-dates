import "./App.css";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pl";
import "dayjs/locale/lt";
import "dayjs/locale/en";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";

dayjs.extend(utc);

function App() {
  return (
    <>
      <h1>This is correct:</h1>
      <DateFieldComponent locale={"en"} />
      <h1>These give an invalid date:</h1>
      <DateFieldComponent locale={"lt"} />
      <DateFieldComponent locale={"pl"} />
    </>
  );
}

type DateFieldComponentProps = {
  locale: string;
};
const DateFieldComponent: React.FunctionComponent<DateFieldComponentProps> = ({
  locale,
}) => {
  const [time, setTime] = useState<Date>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <p>Locale: {locale}</p>
      <p>Time: {time?.toString()}</p>
      <DateField
        format={"LL"}
        timezone="UTC"
        variant="filled"
        onChange={(value) => setTime(getUtcWaarde(value))}
      />
    </LocalizationProvider>
  );
};
export const getUtcWaarde = (value: unknown) =>
  (typeof value === "string" ? dayjs.utc(value) : value) as Date;
export default App;
