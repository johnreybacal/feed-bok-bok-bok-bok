
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from "axios";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useSnackbar } from 'notistack';
import React from "react";
import { API } from "./config";


export default function Admin() {
  dayjs.extend(utc);

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'feedback', headerName: 'Feedback', width: 400 },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
      valueGetter: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : "Uncategorized"
    },
    {
      field: 'createdAt',
      headerName: 'Date Submitted',
      width: 200,
      type: 'dateTime',
      valueGetter: (value) => value && new Date(value),
    },
  ]
  const [rows, setRows] = React.useState([])
  const [rowCount, setRowCount] = React.useState(0)
  const [filter, setFilter] = React.useState({
    category: null,
    from: null,
    to: null
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      axios.get(`${API}/admin/feedbacks`, {
        params: {
          ...filter,
          ...paginationModel
        }
      }).then(function (response) {
        console.log(response)
        if (response.status === 200) {
          const { data } = response
          setRows(data.rows)
          setRowCount(data.count)
        }
      }).catch(function (error) {
        enqueueSnackbar('Oops. Something went wrong.', { variant: "error" });
      }).finally(() => {
        setIsLoading(false);
      });
    }
    fetchData();
  }, [paginationModel, filter, enqueueSnackbar]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{
        padding: 5
      }}>
        <Grid container spacing={2} paddingBottom={5}>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={filter.category}
                label="Select Category"
                placeholder="Select Category"
                onChange={e => {
                  setFilter({
                    ...filter,
                    category: e.target.value
                  });
                }}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value={"positive"}>Positive</MenuItem>
                <MenuItem value={"neutral"}>Neutral</MenuItem>
                <MenuItem value={"negative"}>Negative</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <DateTimePicker
                label="From"
                value={filter.from}
                onChange={e => {
                  setFilter({
                    ...filter,
                    from: e
                  });
                }}
                maxDate={dayjs(filter.to)}
                timezone="UTC"
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <DateTimePicker
                label="To"
                value={filter.to}
                onChange={e => {
                  setFilter({
                    ...filter,
                    to: e
                  });
                }}
                maxDate={dayjs(new Date())}
                timezone="UTC"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid size={12}>
          <DataGrid
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            loading={isLoading}
            pageSizeOptions={[5, 10, 50, 100]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            sortingMode="server"
            disableColumnSorting
            disableColumnFilter
            disableColumnMenu
            disableRowSelectionOnClick
          />
        </Grid>
      </Card>
    </LocalizationProvider>
  )
}