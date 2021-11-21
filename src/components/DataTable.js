import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import api from "../services/apiService";
import theme from "./themes/theme";

const useStyles = makeStyles({
    root: {
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        maxHeight: 440,
    },
});

const DataTable = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const uri = props.uri;
    const {dontRedirectToDetails} = props;

    useEffect(() => {
        fetchPage(page, uri, rowsPerPage);
    }, [page, uri, rowsPerPage]);

    const fetchPage = (newPage, uri, newRowsPerPage) => {
        setLoading(true);
        api.get(`${uri}?page=${newPage}&per_page=${newRowsPerPage}`)
            .then((response) => {
                setItems(response.data);
            })
            .finally(() => setLoading(false));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const calcPage = () => {
        if (items.length === rowsPerPage) {
            return ((page + 1) * rowsPerPage) + 1
        }
        return ((page + 1) * rowsPerPage);
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.header.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: theme.palette.primary.dark, color: theme.palette.secondary.dark, fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? 
                            <TableRow hover role="checkbox" tabIndex={-1} key={-1}>
                                <TableCell key={-1} align={"center"} colSpan={3}>
                                    Loading...
                                </TableCell>
                            </TableRow>
                            :
                            items && items.length > 0 ?
                                items.map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => {
                                            if (!dontRedirectToDetails) {
                                                navigate(`${uri}/${items[index].id}`)
                                            }
                                            
                                        }}>
                                            {props.header.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                     style={{backgroundColor: theme.palette.secondary.light, color: theme.palette.primary.dark}}
                                                    >
                                                        {
                                                            column.buildCustomComponent ?
                                                            column.buildCustomComponent(row)
                                                            :
                                                            (column.format ? column.format(value) : value)
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                                :
                                <TableRow hover role="checkbox" tabIndex={-1} key={-1}>
                                    <TableCell key={-1} align={"center"} colSpan={3}
                                        style={{backgroundColor: theme.palette.secondary.light, color: theme.palette.primary.dark}}
                                    >
                                        No record found
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                rowsPerPage={rowsPerPage}
                count={calcPage()}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{backgroundColor: theme.palette.primary.dark, color: theme.palette.secondary.dark}}
            />
        </Paper>
    );
}


export default DataTable;