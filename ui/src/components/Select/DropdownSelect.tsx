import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { GET_TAGS, ADD_TAG } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useMode } from '@/context/ModeContext';

const DropdownSelect = () => {
	const [selectedOptions, setSelectedOptions] = useState<Array<{ label: string; value: string }>>([]);

	const [menuIsOpen, setMenuIsOpen] = useState(false);

	const { loading, error, data } = useQuery(GET_TAGS);
	const [createTag] = useMutation(ADD_TAG);

	const { setSelectedPostTag, selectedCardData, mode } = useMode();

	if (loading) return 'Loading...';

	const tags = data.tags;

	const options = tags.map((tag: { id: any; tag: any }) => ({
		value: tag.id,
		label: tag.tag,
	}));

	const handleChange = (newValue: any) => {
		setSelectedOptions(newValue);

		console.log('new', newValue);
		const selectedValues = newValue.map((option: { value: string }) => option.value);

		setSelectedPostTag(selectedValues);
	};

	const handleCreate = async (inputValue: any) => {
		try {
			const { data: mutationData } = await createTag({
				variables: { name: [inputValue] },
				refetchQueries: [{ query: GET_TAGS }],
			});

			if (mutationData.createdTag.success) {
				console.log('Tag created successfully:', mutationData.createdTag.data);

				const newValue = [...selectedOptions, { label: inputValue, value: inputValue }];
				handleChange(newValue);
			} else {
				console.error('Tag creation failed:', mutationData.createdTag.message);
			}
		} catch (error) {
			console.error('GraphQL mutation error:', error.message);
		}
	};

	const controlStyles = {
		backgroundColor: '#25282E',
		color: '#ffffff',
		border: '1px solid #40444C',
		borderRadius: menuIsOpen ? '4px 4px 0 0' : '4px',
		padding: '12px',
		boxShadow: 'none',
		display: 'flex',
		'&:hover': {
			borderColor: 'rgba(64, 68, 76, 1)',
		},

		'.tags-multiselect__value-container': {
			gap: '10px',
			padding: '0',
		},

		'.tags-multiselect__input-container': {
			color: '#ffffff',
		},
		'.tags-multiselect__clear-indicator': {
			cursor: 'pointer',
			marginRight: '10px',
			' > svg': {
				display: 'none',
			},

			'&::before': {
				content: '""',
				display: 'inline-block',
				width: '24px',
				height: '24px',
				backgroundImage:
					"url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.3'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.77342 5.90943C7.14247 5.34247 7.77312 5.00049 8.44961 5.00049H19.0022C20.1067 5.00049 21.0022 5.89592 21.0022 7.00049V17.0005C21.0022 18.1051 20.1067 19.0005 19.0022 19.0005H8.44966C7.77311 19.0005 7.14243 18.6585 6.77339 18.0914L3.51905 13.091C3.08737 12.4277 3.0874 11.5722 3.51913 10.909L6.77342 5.90943ZM19.0022 7.00049L8.44961 7.00049L5.19531 12L8.44966 17.0005H19.0022V7.00049ZM10.2908 9.28987C10.6813 8.89934 11.3145 8.89934 11.705 9.28987L12.9979 10.5828L14.2908 9.28987C14.6813 8.89934 15.3145 8.89934 15.705 9.28987C16.0955 9.68039 16.0955 10.3136 15.705 10.7041L14.4121 11.997L15.705 13.2899C16.0955 13.6804 16.0955 14.3136 15.705 14.7041C15.3145 15.0946 14.6813 15.0946 14.2908 14.7041L12.9979 13.4112L11.705 14.7041C11.3145 15.0946 10.6813 15.0946 10.2908 14.7041C9.90025 14.3136 9.90025 13.6804 10.2908 13.2899L11.5837 11.997L10.2908 10.7041C9.90025 10.3136 9.90025 9.68039 10.2908 9.28987Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A\")",
				backgroundSize: 'cover',
			},
		},

		'.tags-multiselect__indicator-separator': {
			backgroundColor: 'rgba(255, 255, 255, 0.3)',
		},

		'.tags-multiselect__dropdown-indicator': {
			cursor: 'pointer',
			marginLeft: '10px',
			' > svg': {
				display: 'none',
			},
			'&::before': {
				content: '""',
				display: 'inline-block',
				width: '24px',
				height: '24px',
				backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.3'%3E%3Cpath d='M7 9.00007L12 15L17 9.00007' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3C/svg%3E%0A")`,
				backgroundSize: 'cover',
			},
		},
	};

	const multiValueStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '6px',
		padding: '6px 8px 6px 12px',
		background: 'rgba(255, 255, 255, 0.12)',
		borderRadius: '50px',
		cursor: 'pointer',
		'.tags-multiselect__multi-value__label': {
			color: '#ffffff',
			fontSize: '12px',
			fontFamily: 'Figtree-SemiBold,sans-serif',
			lineHeight: '14.4px',
			padding: '0',
		},
		'div[role="button"]': {
			all: 'unset',
			height: '16px',
			width: '16px',
			svg: {
				display: 'none',
			},
			'&::before': {
				content: '""',
				display: 'inline-block',
				width: '16px',
				height: '16px',
				backgroundImage:
					"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cg opacity='0.2'%3E%3Cpath d='M8.97203 8.00016L12.6654 11.6935V12.6668H11.692L7.9987 8.9735L4.30536 12.6668H3.33203V11.6935L7.02536 8.00016L3.33203 4.30683V3.3335H4.30536L7.9987 7.02683L11.692 3.3335H12.6654V4.30683L8.97203 8.00016Z' fill='white'/%3E%3C/g%3E%3C/svg%3E\")",
				backgroundSize: 'cover',
			},
			'&:hover::before': {
				backgroundImage:
					"url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' rx='4' fill='white' fill-opacity='0.2'/%3E%3Cpath d='M8.97203 8.00016L12.6654 11.6935V12.6668H11.692L7.9987 8.9735L4.30536 12.6668H3.33203V11.6935L7.02536 8.00016L3.33203 4.30683V3.3335H4.30536L7.9987 7.02683L11.692 3.3335H12.6654V4.30683L8.97203 8.00016Z' fill='white'/%3E%3C/svg%3E%0A\")",
			},
		},
	};

	const menuStyles = {
		background: 'rgba(37, 40, 46, 1)',
		fontFamily: 'Figtree-Medium,sans-serif',
		fontSize: '12px',
		lineHeight: '16.8px',
		borderRadius: '0 0 4px 4px',
		color: '#ffffff',
		maxHeight: '297px',
		padding: '0',
		overflow: 'hidden',
		'.tags-multiselect__menu-list::-webkit-scrollbar': {
			display: 'none',
		},
		'.tags-multiselect__menu-list > div:not(:last-of-type)': {
			borderBottom: '1px solid rgba(64, 68, 76, 0.4)',
		},
	};

	const optionStyles = {
		color: '#ffffff',
		padding: '12px',
		textTransform: 'capitalize',

		'&:hover': {
			background: 'rgba(70, 76, 91, 1)',
		},
	};

	useEffect(() => {
		if (mode === 'edit' && selectedCardData) {
			const options = tags.map((tag: { id: any; tag: any }) => ({
				value: tag.id,
				label: tag.tag,
			}));

			const tagsWithIds = selectedCardData.tags.map((tagName) => {
				const matchingOption = options.find((option: { label: string }) => option.label === tagName);
				return matchingOption ? matchingOption : { value: tagName, label: tagName };
			});

			setSelectedOptions(tagsWithIds);
		} else {
			setSelectedOptions([]);
		}
	}, [mode, selectedCardData, tags]);

	return (
		<CreatableSelect
			isMulti={true}
			className='react-select-container'
			classNamePrefix='tags-multiselect'
			onChange={handleChange}
			menuIsOpen={menuIsOpen}
			menuPortalTarget={document.body}
			onMenuOpen={() => setMenuIsOpen(true)}
			onMenuClose={() => setMenuIsOpen(false)}
			onCreateOption={handleCreate}
			createOptionPosition='first'
			options={options}
			value={selectedOptions}
			placeholder='Tags'
			styles={{
				menuPortal: (base) => ({ ...base, zIndex: 9999 }),
				control: (baseStyles, state) => ({
					...controlStyles,
				}),
				//@ts-ignore
				multiValue: () => ({
					...multiValueStyles,
				}),
				menu: () => ({
					...menuStyles,
				}),
				//@ts-ignore
				option: (baseStyles, state) => ({
					...optionStyles,
				}),
			}}
		/>
	);
};

export default DropdownSelect;
