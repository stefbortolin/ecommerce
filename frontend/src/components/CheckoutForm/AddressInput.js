import { Grid, TextField } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form"

const AddressInput = ({name, label}) => {
    const {control} = useFormContext()
  return (
    <Grid item xs={12} sm={6}>
        <Controller 
        render={({ field }) => <TextField label={label} {...field} />}
        control = {control}
        fullWidth 
        defaultValue=""
        name={name}
        rules={{ required: true }}
        />
    </Grid>
  )
}

export default AddressInput
