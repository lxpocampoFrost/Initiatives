import styled from '@emotion/styled';
import { Box, Pagination } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface PostListData {
	totalPages: number;
	currentPage: number;
	handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl = ({ totalPages, currentPage, handlePageChange }: PostListData) => {
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.down('md'));

	const prevArrow = '.MuiPagination-ul > li:first-of-type > .MuiPaginationItem-previousNext:before ';
	const prevArrowText = '.MuiPagination-ul > li:first-of-type > .MuiPaginationItem-previousNext:after';

	const nextArrow = '.MuiPagination-ul > li:last-of-type > .MuiPaginationItem-previousNext:after';
	const nextArrowText = '.MuiPagination-ul > li:last-of-type > .MuiPaginationItem-previousNext:before';

	const paginationArrows = `${prevArrow}, ${nextArrow}`;
	const paginationArrowsText = `${prevArrowText}, ${nextArrowText}`;

	const PaginationCustomWrap = styled.div`
		@media screen and (max-width: 470px) {
			.MuiPagination-ul > li {
				width: auto;
			}

			.MuiPagination-ul > li:first-of-type {
				order: 2;
				flex-basis: 70%;
			}

			.MuiPagination-ul > li:last-of-type {
				order: 2;
				flex-basis: 30%;
				display: flex;
				justify-content: flex-end;
			}

			.MuiPagination-ul {
				justify-content: center;
			}
		}

		@media screen and (max-width: 460px) {
			.MuiPagination-ul > li:first-of-type {
				order: 2;
				flex-basis: 60%;
			}

			.MuiPagination-ul > li:last-of-type {
				order: 2;
				flex-basis: 40%;
			}

			.MuiPagination-ul {
				justify-content: center;
			}
		}
	`;

	return (
		<PaginationCustomWrap>
			<Box
				width='100%'
				margin='24px auto 0'
				color='#FFF'
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
						fontSize: '16px',
						fontFamily: 'Figtree-SemiBold, sans-serif',
						lineHeight: '1.5',
						padding: '0px 12px',
						margin: '0',
					},
					'.Mui-selected, .MuiPaginationItem-previousNext': {
						color: '#FFF',
						fontWeight: '600',
					},
					'.Mui-selected': {
						opacity: 1,
					},
					'.Mui-disabled': {
						opacity: 0.4,
					},
					'.MuiButtonBase-root.MuiPaginationItem-root': {
						fontFamily: 'Figtree-SemiBold, sans-serif',
					},
					[paginationArrows]: {
						content: 'url("./assets/pagination-arrow.svg")',
						display: 'block',
						width: '24px',
						height: '24px',
					},
					[prevArrow]: {
						transform: ' rotate(-180deg)',
					},
					[paginationArrowsText]: {
						display: 'block',
						height: '20px',
					},
					[prevArrowText]: {
						content: '"Previous"',
						fontFamily: 'Figtree-SemiBold, sans-serif',
						fontSize: '16px',
						lineHeight: '1.5',
					},
					[nextArrowText]: {
						content: '"Next"',
						fontFamily: 'Figtree-SemiBold, sans-serif',
						fontSize: '16px',
						lineHeight: '1.5',
					},
				}}
			>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					siblingCount={isTablet ? 0 : 1}
					boundaryCount={1}
				/>
			</Box>
		</PaginationCustomWrap>
	);
};

export default PaginationControl;
