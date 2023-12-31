import { Typography } from "@mui/material"

interface Props {
  title: string
}

function PageTitle({ title }: Props) {
  return (
    <Typography variant="h4" fontWeight={550} gutterBottom>
      {title}
    </Typography> 
  )
}

export default PageTitle