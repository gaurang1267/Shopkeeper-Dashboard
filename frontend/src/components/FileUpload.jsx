import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useOrdersContext } from "../context/orderContext";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const { isLoading, uploadFile } = useOrdersContext();

  const handleChange = (newValue) => {
    setFile(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    uploadFile(formData);
    setFile(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
        width: "90%",
        margin: "auto",
        marginTop: "100px !important",
        padding: "30px 30px",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", color: "#102a43" }}>
        Home
      </Typography>
      <Typography variant="h6" color={"#102a43"} mt={5}>
        Upload your CSV file here:
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box
          sx={{
            display: "flex",
            width: 1 / 2,
            marginTop: "50px",
          }}
        >
          <Stack spacing={2} display={"flex"} alignItems={"center"}>
            <MuiFileInput
              name="file"
              label="Upload CSV File"
              value={file}
              onChange={handleChange}
              sx={{ width: "80%" }}
            />
            <LoadingButton
              variant="contained"
              sx={{ width: "40%", marginBottom: "50px !important" }}
              type="submit"
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default FileUpload;
