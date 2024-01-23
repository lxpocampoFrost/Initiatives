import styled from "@emotion/styled";
import { Box, Pagination } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface PostListData {
    totalPages: number,
    currentPage: number,
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl = ({ totalPages, currentPage, handlePageChange }:PostListData) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const prevArrow = '.MuiPagination-ul > li:first-of-type > .MuiPaginationItem-previousNext:before ';
    const prevArrowText = '.MuiPagination-ul > li:first-of-type > .MuiPaginationItem-previousNext:after';

    const nextArrow = '.MuiPagination-ul > li:last-of-type > .MuiPaginationItem-previousNext:after';
    const nextArrowText = '.MuiPagination-ul > li:last-of-type > .MuiPaginationItem-previousNext:before';
    
    const paginationArrows = `${prevArrow}, ${nextArrow}`;
    const paginationArrowsText = `${prevArrowText}, ${nextArrowText}`;

    const PaginationCustomWrap = styled.div`
        @media screen and (max-width:460px) {
            .MuiPagination-ul > li {
                width: auto;
            }
            
            .MuiPagination-ul > li:first-of-type {
                order: 2;
                flex-basis: 50%;
            }

            .MuiPagination-ul > li:last-of-type {
                order: 2;
                flex-basis: 50%;
                display: flex;
                justify-content: flex-end;
            }

            .MuiPagination-ul {
                justify-content: center;
            }
        }
    `

    return (    
        <PaginationCustomWrap>
            <Box 
                width="100%"
                margin="24px auto 0"
                color="#FFF"
                sx={{
                    '.MuiPagination-ul > li:first-of-type': {
                        marginRight: 'auto',
                    },
                    '.MuiPagination-ul > li:last-of-type': {
                        marginLeft: 'auto',
                    },
                    '.MuiPaginationItem-previousNext': {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '6px',
                    },
                    '.MuiPaginationItem-previousNext > svg': {
                        display: 'none',
                    },
                    ' .MuiPaginationItem-page, .MuiPaginationItem-ellipsis': {
                        opacity: '0.2',
                        color: '#FFF',
                    },
                    '.Mui-selected, .MuiPaginationItem-previousNext': {
                        color: '#FFF',
                        fontWeight: '600',
                    },
                    '.Mui-selected': {
                        opacity: 1,
                    },
                    [paginationArrows]: {
                        content: 'url("./assets/pagination-arrow.svg")',
                        display: 'block',
                        width: '20px',
                        height: '20px',
                    },
                    [prevArrow]: {
                        transform:' rotate(-180deg) translateY(-1px)',
                    },
                    [nextArrow]: {
                        transform: 'translateY(-1px)',
                    },
                    [paginationArrowsText]: {
                        display: 'block',
                        height: '20px',
                    },
                    [prevArrowText]: {
                        content: '"Previous"',
                    },
                    [nextArrowText]: {
                        content: '"Next"',
                    },
            }}>
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    siblingCount={isTablet ? 0 : 1}
                    boundaryCount={1}
                />
            </Box>
        </PaginationCustomWrap>
    )
}

export default PaginationControl;