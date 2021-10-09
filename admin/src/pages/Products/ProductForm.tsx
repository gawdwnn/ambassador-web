import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

interface Props {}

const ProductForm: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { handleSubmit, getValues, reset, control } = useForm({
    reValidateMode: "onChange",
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await axios.get(`products/${id}`);
        reset(data);
      })();
    }
  }, [id, reset]);

  const onSubmit = async () => {
    const values = getValues();
    if (id) {
      await axios.put(`products/${id}`, { ...values });
    } else {
      await axios.post("products", { ...values });
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/products"} />;
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Title"
                  // fullWidth
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            rules={{ required: "Title is required" }}
          />
        </div>
        <div className="mb-3">
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Description"
                  // fullWidth
                  multiline
                  minRows={2}
                  maxRows={Infinity}
                  // variant="outlined"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            rules={{ required: "Description is required" }}
          />
        </div>
        <div className="mb-3">
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Image"
                  // fullWidth
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            rules={{ required: "Image url is required" }}
          />
        </div>
        <div className="mb-3">
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Price"
                  // fullWidth
                  type="number"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            rules={{ required: "Price is required" }}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
