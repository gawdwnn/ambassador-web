import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Link } from "../models/link";

interface Props {}

const columns = [
  { id: "#", label: "#", width: "100px" },
  { id: "code", label: "code" },
  { id: "count", label: "count" },
  { id: "revenue", label: "Revenue" },
];

const Links: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [links, setLinks] = useState<Link[]>([]);
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
      const { data } = await axios.get(`users/${id}/links`);
      setLinks(data);
    })();
  }, []);

  return (
    <Layout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {links
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((link) => {
                return (
                  <TableRow key={link.id}>
                    <TableCell>{link.id}</TableCell>
                    <TableCell>{link.code}</TableCell>
                    <TableCell>{link.orders.length}</TableCell>
                    <TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <TablePagination
          count={links?.length}
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

export default Links;
