import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../models/user";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
} from "@material-ui/core";

interface Props {}

const columns = [
  { id: "#", label: "#", width: "100px" },
  { id: "Name", label: "Email" },
  { id: "actions", label: "Actions" },
  { id: "", label: "" },
];

const Users: React.FC<Props> = () => {
  const [users, setUsers] = useState<User[]>([]);
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
      const { data } = await axios.get("ambassadors");
      setUsers(data);
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
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover tabIndex={-1} key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">
                      {user.first_name} {user.last_name}
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        href={`users/${user.id}/links`}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <TableFooter>
          <TablePagination
            count={users?.length}
            component="div"
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 100]}
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
};

export default Users;
