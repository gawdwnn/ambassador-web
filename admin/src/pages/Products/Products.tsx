import React, { useEffect, useState } from "react";
import { Product } from "../../models/product";
import axios from "axios";
import Layout from "../../components/Layout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { Link } from "react-router-dom";

interface Props {}

const columns = [
  { id: "#", label: "#", width: "100px" },
  { id: "image", label: "Image" },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "price", label: "Price" },
  { id: "actions", label: "Actions" },
];

const Products: React.FC<Props> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("products");
      setProducts(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/products/create`}
        >
          Add
        </Button>
      </div>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell key={column.id} style={{ width: column.width }}>
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <img src={product.image} width={50} alt={product.title} />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <ToggleButtonGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={`/products/${product.id}/edit`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => del(product.id)}
                        >
                          Delete
                        </Button>
                      </ToggleButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          count={products?.length}
          component="div"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 25, 100]}
        />
      </TableContainer>
    </Layout>
  );
};

export default Products;
