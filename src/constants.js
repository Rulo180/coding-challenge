export const STRING_TYPE= 'string';
export const NUMBER_TYPE = 'number';
export const DATE_TYPE = 'date'

export const NAME_COLUMN = 'name';
export const EMAIL_COLUMN = 'email';
export const AGE_COLUMN = 'age';
export const YEAR_OF_EXPERIENCE_COLUMN = 'yearOfExperience';
export const POSITION_APPLIED_COLUMN = 'positionApplied';
export const APPLICATION_DATE_COLUMN = 'applicationDate';
export const STATUS_COLUMN = 'status';

export const CANDIDATES_COLUMNS = {
	[NAME_COLUMN]: {
		type: STRING_TYPE,
		display: 'Name',
		isSortable: false,
	},
	[EMAIL_COLUMN]: {
		type: STRING_TYPE,
		display: 'Email',
		isSortable: false,
	},
	[AGE_COLUMN]: {
		type: DATE_TYPE,
		display: 'Age',
		isSortable: false,
	},
	[YEAR_OF_EXPERIENCE_COLUMN]: {
		type: NUMBER_TYPE,
		display: 'Year of experience',
		isSortable: true,
	},
	[POSITION_APPLIED_COLUMN]: {
		type: STRING_TYPE,
		display: 'Position applied',
		isSortable: true,
	},
	[APPLICATION_DATE_COLUMN]: {
		type: DATE_TYPE,
		display: 'Applied',
		isSortable: true,
	},
	[STATUS_COLUMN]: {
		type: STRING_TYPE,
		display: 'Status',
		isSortable: false,
	},
}

export const STATUS_OPTIONS = [
	{
		label: 'Choose...',
		value: '',
	},
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
    {
      label: "Waiting",
      value: "waiting",
    },
  ];

