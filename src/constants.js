export const STRING_TYPE= 'string';
export const NUMBER_TYPE = 'number';
export const DATE_TYPE = 'date'

export const CANDIDATES_COLUMNS = {
	name: {
		type: STRING_TYPE,
		display: 'Name',
		isSortable: false,
	},
	email: {
		type: STRING_TYPE,
		display: 'Email',
		isSortable: false,
	},
	age: {
		type: DATE_TYPE,
		display: 'Age',
		isSortable: false,
	},
	yearOfExperience: {
		type: NUMBER_TYPE,
		display: 'Year of experience',
		isSortable: true,
	},
	positionApplied: {
		type: STRING_TYPE,
		display: 'Position applied',
		isSortable: true,
	},
	applicationDate: {
		type: DATE_TYPE,
		display: 'Applied',
		isSortable: true,
	},
	status: {
		type: STRING_TYPE,
		display: 'Status',
		isSortable: false,
	},
}

