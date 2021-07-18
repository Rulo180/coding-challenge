import { getAge, keysToCamel, sortNumberValue, sortTextValue, sortDateValue } from './utils';


describe('Utils', () => {
	describe('keysToCamel', () => {
		it('should convert snake case keys to camelCase', () => {
			const snakeCaseObj = {
				name: 'Martin',
				birth_place: 'Argentina',
			}
			const expected = {
				name: 'Martin',
				birthPlace: 'Argentina'
			}
			const result = keysToCamel(snakeCaseObj)
			expect(result).toEqual(expected)
		});
		it('should convert kebab keys to camelCase', () => {
			const snakeCaseObj = {
				name: 'Martin',
				'birth-place': 'Argentina',
			}
			const expected = {
				name: 'Martin',
				birthPlace: 'Argentina'
			}
			const result = keysToCamel(snakeCaseObj)
			expect(result).toEqual(expected)
		});
		it('should not change camelCase keys', () => {
			const camelCaseObj = {
				name: 'Martin',
				birthPlace: 'Argentina'
			}
			const result = keysToCamel(camelCaseObj)
			expect(result).toEqual(camelCaseObj)
		});
	})

	describe('getAge', () => {
		it('should return age from date string', () => {
			const dateString = '02/15/1990';
			const result = getAge(dateString)
			expect(result).toBe(31);
		});
	});

	describe('sortNumberValue', () => {
		it('should return positive value when a.value > b.value', () => {
			const result = sortNumberValue({value: 5}, { value: 2});
			expect(result).toBeGreaterThan(0);
		});

		it('should return negative value when a.value < b.value', () => {
			const result = sortNumberValue({value: 2}, { value: 5});
			expect(result).toBeLessThan(0);
		});

		it('should return 0 when a.value = b.value', () => {
			const result = sortNumberValue({value: 2}, { value: 2});
			expect(result).toBe(0);
		});
	});

	describe('sortTextValue', () => {
		it('should return positive value when a.value > b.value', () => {
			const result = sortTextValue({value: 'b'}, { value: 'a'});
			expect(result).toBeGreaterThan(0);
		});
	
		it('should return negative value when a.value < b.value', () => {
			const result = sortTextValue({value: 'a'}, { value: 'b'});
			expect(result).toBeLessThan(0);
		});
	
		it('should return 0 when a.value = b.value', () => {
			const result = sortTextValue({value: 'a'}, { value: 'a'});
			expect(result).toBe(0);
		});

		it('should sort be case insensitive', () => {
			const result = sortTextValue({value: 'Abc'}, { value: 'acd'});
			expect(result).toBeLessThan(0);
		});
	});

	describe('sortDateValue', () => {
		it('should return negative value when a.value < b.value', () => {
			const result = sortDateValue({ value: '01/01/2020'}, { value: '01/01/2021'})		
			expect(result).toBeLessThan(0)
		});

		it('should return positive value when a.value > b.value', () => {
			const result = sortDateValue({ value: '01/01/2021'}, { value: '01/01/2020'})		
			expect(result).toBeGreaterThan(0)
		});

		it('should return 0 when a.value = b.value', () => {
			const result = sortDateValue({ value: '01/01/2021'}, { value: '01/01/2021'})		
			expect(result).toBe(0)
		});
	});
});