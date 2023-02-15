import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export default function BasicDateTimePicker({ handleDate }) {
  const [value, setValue] = React.useState(dayjs())
  // React.useEffect(()=>{
  //   if(value){
  //     handleDate(new Date(value.$d).toISOString())
  //   }
  // },[])
  const passDate = (newValue) => {
    console.log(newValue?.$d)
  const date = newValue?.$d
  if(newValue&&newValue?.$d!="Invalid Date")
   { console.log(new Date(newValue.$d).toISOString())
    setValue(new Date(newValue.$d).toISOString())
    handleDate(new Date(newValue.$d).toISOString())
  }
  else{
    setValue(null)
    handleDate(null)
  }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField
            size="small"
            margin="dense"
            id="fullWidth"
            fullWidth
            {...props}
          />
        )}
        inputFormat="DD-MM-YYYY hh:mm A"
        minDateTime={dayjs(new Date())}
        valueDefault={null}
        ampm={true}
        value={value}
        onChange={passDate}
      />
    </LocalizationProvider>
  )
}
