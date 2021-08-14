import {
  getAge,
  keysToCamel,
  sortNumberValue,
  sortTextValue,
  sortDateValue,
  filterCandidates,
  filterAndSortCandidates,
} from "./utils";

const createFilter = (field, value) => ({ field, value });

const getCandidates = () => {
  return [
    {
      id: 1,
      name: "Martin Valles",
      email: "martin@gmail.com",
      age: 31,
      positionApplied: "Developer",
      yearOfExperience: 4,
      status: "Accepted",
      applicationDate: "01/01/2021",
    },
    {
      id: 2,
      name: "Maria Fernandez",
      email: "maria@gmail.com",
      age: 28,
      positionApplied: "Administrator",
      yearOfExperience: 6,
      status: "Waiting",
      applicationDate: "01/02/2021",
    },
    {
      id: 3,
      name: "Sergio Ortiz",
      email: "sergio@gmail.com",
      age: 24,
      positionApplied: "Developer",
      yearOfExperience: 1,
      status: "Rejected",
      applicationDate: "01/06/2021",
    },
    {
      id: 4,
      name: "Leonardo Martinez",
      email: "leonardo@gmail.com",
      age: 29,
      positionApplied: "Manager",
      yearOfExperience: 5,
      status: "Accepted",
      applicationDate: "01/03/2021",
    },
  ];
};

describe("Utils", () => {
  describe("keysToCamel", () => {
    it("should convert snake case keys to camelCase", () => {
      const snakeCaseObj = {
        name: "Martin",
        birth_place: "Argentina",
      };
      const expected = {
        name: "Martin",
        birthPlace: "Argentina",
      };
      const result = keysToCamel(snakeCaseObj);
      expect(result).toEqual(expected);
    });
    it("should convert kebab keys to camelCase", () => {
      const snakeCaseObj = {
        name: "Martin",
        "birth-place": "Argentina",
      };
      const expected = {
        name: "Martin",
        birthPlace: "Argentina",
      };
      const result = keysToCamel(snakeCaseObj);
      expect(result).toEqual(expected);
    });
    it("should not change camelCase keys", () => {
      const camelCaseObj = {
        name: "Martin",
        birthPlace: "Argentina",
      };
      const result = keysToCamel(camelCaseObj);
      expect(result).toEqual(camelCaseObj);
    });
  });

  describe("getAge", () => {
    it("should return age from date string", () => {
      const dateString = "02/15/1990";
      const result = getAge(dateString);
      expect(result).toBe(31);
    });
  });

  describe("sortNumberValue", () => {
    it("should return positive value when a.value > b.value", () => {
      const result = sortNumberValue({ value: 5 }, { value: 2 });
      expect(result).toBeGreaterThan(0);
    });

    it("should return negative value when a.value < b.value", () => {
      const result = sortNumberValue({ value: 2 }, { value: 5 });
      expect(result).toBeLessThan(0);
    });

    it("should return 0 when a.value = b.value", () => {
      const result = sortNumberValue({ value: 2 }, { value: 2 });
      expect(result).toBe(0);
    });
  });

  describe("sortTextValue", () => {
    it("should return positive value when a.value > b.value", () => {
      const result = sortTextValue({ value: "b" }, { value: "a" });
      expect(result).toBeGreaterThan(0);
    });

    it("should return negative value when a.value < b.value", () => {
      const result = sortTextValue({ value: "a" }, { value: "b" });
      expect(result).toBeLessThan(0);
    });

    it("should return 0 when a.value = b.value", () => {
      const result = sortTextValue({ value: "a" }, { value: "a" });
      expect(result).toBe(0);
    });

    it("should sort be case insensitive", () => {
      const result = sortTextValue({ value: "Abc" }, { value: "acd" });
      expect(result).toBeLessThan(0);
    });
  });

  describe("sortDateValue", () => {
    it("should return negative value when a.value < b.value", () => {
      const result = sortDateValue(
        { value: "01/01/2020" },
        { value: "01/01/2021" }
      );
      expect(result).toBeLessThan(0);
    });

    it("should return positive value when a.value > b.value", () => {
      const result = sortDateValue(
        { value: "01/01/2021" },
        { value: "01/01/2020" }
      );
      expect(result).toBeGreaterThan(0);
    });

    it("should return 0 when a.value = b.value", () => {
      const result = sortDateValue(
        { value: "01/01/2021" },
        { value: "01/01/2021" }
      );
      expect(result).toBe(0);
    });
  });

  describe("filterCandidates", () => {
    it("should filter candidates by status", () => {
      const filters = [
        { field: "name", value: "" },
        { field: "status", value: "Accepted" },
      ];
      const expected = [
        {
          id: 1,
          name: "Martin Valles",
          email: "martin@gmail.com",
          age: 31,
          positionApplied: "Developer",
          yearOfExperience: 4,
          status: "Accepted",
          applicationDate: "01/01/2021",
        },
        {
          id: 4,
          name: "Leonardo Martinez",
          email: "leonardo@gmail.com",
          age: 29,
          positionApplied: "Manager",
          yearOfExperience: 5,
          status: "Accepted",
          applicationDate: "01/03/2021",
        },
      ];
      const candidates = getCandidates();
      const result = filterCandidates(candidates, filters);
      expect(result).toEqual(expected);
    });

    it("should filter candidates by name", () => {
      const filters = [
        { field: "name", value: "mar" },
        { field: "status", value: "" },
      ];
      const expected = [
        {
          id: 1,
          name: "Martin Valles",
          email: "martin@gmail.com",
          age: 31,
          positionApplied: "Developer",
          yearOfExperience: 4,
          status: "Accepted",
          applicationDate: "01/01/2021",
        },
        {
          id: 2,
          name: "Maria Fernandez",
          email: "maria@gmail.com",
          age: 28,
          positionApplied: "Administrator",
          yearOfExperience: 6,
          status: "Waiting",
          applicationDate: "01/02/2021",
        },
        {
          id: 4,
          name: "Leonardo Martinez",
          email: "leonardo@gmail.com",
          age: 29,
          positionApplied: "Manager",
          yearOfExperience: 5,
          status: "Accepted",
          applicationDate: "01/03/2021",
        },
      ];
      const candidates = getCandidates();
      const result = filterCandidates(candidates, filters);
      expect(result).toEqual(expected);
    });

    it("should filter candidates by name and status", () => {
      const filters = [
        { field: "name", value: "mar" },
        { field: "status", value: "Accepted" },
      ];
      const expected = [
        {
          id: 1,
          name: "Martin Valles",
          email: "martin@gmail.com",
          age: 31,
          positionApplied: "Developer",
          yearOfExperience: 4,
          status: "Accepted",
          applicationDate: "01/01/2021",
        },
        {
          id: 4,
          name: "Leonardo Martinez",
          email: "leonardo@gmail.com",
          age: 29,
          positionApplied: "Manager",
          yearOfExperience: 5,
          status: "Accepted",
          applicationDate: "01/03/2021",
        },
      ];
      const candidates = getCandidates();
      const result = filterCandidates(candidates, filters);
      expect(result).toEqual(expected);
    });
  });

  describe("filterAndSortCandidates", () => {
    it("should return same candidates if no filters are passed", () => {
      const candidates = getCandidates();
      const result = filterAndSortCandidates({
        candidates,
        filters: [],
        sortColumn: "name",
        isSortAscending: true,
      });
      expect(result).toEqual(candidates);
    });

    it("should return an empty array if no candidates are provided", () => {
      const nameFilter = createFilter("name", "Martin");
      const filters = [nameFilter];
      const result = filterAndSortCandidates({
        candidates: [],
        filters,
        sortColumn: "name",
        isSortAscending: true,
      });
      expect(result).toEqual([]);
    });

    it("should not apply sorting if no sortingColumn is provided", () => {
      const candidates = getCandidates();
      const expected = candidates;
      const result = filterAndSortCandidates({
        candidates,
        filters: [],
        sortColumn: undefined,
        isSortAscending: false,
      });
      expect(result).toEqual(expected);
    });

    it("should not apply sorting for non-sortable columns", () => {
      const candidates = getCandidates();
      const nonSortableColumn = "name";
      const expected = candidates;
      const result = filterAndSortCandidates({
        candidates,
        filters: [],
        sortColumn: nonSortableColumn,
        isSortAscending: false,
      });
      expect(result).toEqual(expected);
    });

    it("should apply filters to candidates", () => {
      const nameFilter = createFilter("name", "Martin");
      const filters = [nameFilter];
      const candidates = getCandidates();
      const expected = [
        {
          id: 1,
          name: "Martin Valles",
          email: "martin@gmail.com",
          age: 31,
          positionApplied: "Developer",
          yearOfExperience: 4,
          status: "Accepted",
          applicationDate: "01/01/2021",
        },
        {
          id: 4,
          name: "Leonardo Martinez",
          email: "leonardo@gmail.com",
          age: 29,
          positionApplied: "Manager",
          yearOfExperience: 5,
          status: "Accepted",
          applicationDate: "01/03/2021",
        },
      ];
      const result = filterAndSortCandidates({
        candidates,
        filters,
        sortColumn: undefined,
        isSortAscending: true,
      });
      expect(result).toEqual(expected);
    });
    it("should apply descending sorting to candidates when sortColumn is provided", () => {
      const candidates = getCandidates();
      const expected = [
        {
          id: 3,
          name: "Sergio Ortiz",
          email: "sergio@gmail.com",
          age: 24,
          positionApplied: "Developer",
          yearOfExperience: 1,
          status: "Rejected",
          applicationDate: "01/06/2021",
        },
        {
          id: 1,
          name: "Martin Valles",
          email: "martin@gmail.com",
          age: 31,
          positionApplied: "Developer",
          yearOfExperience: 4,
          status: "Accepted",
          applicationDate: "01/01/2021",
        },
        {
          id: 4,
          name: "Leonardo Martinez",
          email: "leonardo@gmail.com",
          age: 29,
          positionApplied: "Manager",
          yearOfExperience: 5,
          status: "Accepted",
          applicationDate: "01/03/2021",
        },
        {
          id: 2,
          name: "Maria Fernandez",
          email: "maria@gmail.com",
          age: 28,
          positionApplied: "Administrator",
          yearOfExperience: 6,
          status: "Waiting",
          applicationDate: "01/02/2021",
        },
      ];
      const isSortAscending = false;
      const result = filterAndSortCandidates({
        candidates,
        filters: [],
        sortColumn: "yearOfExperience",
        isSortAscending,
      });
      expect(result).toEqual(expected);
    });

    it("should apply ascending sorting to candidates when sortColumn and isSortAscending are provided", () => {
      const candidates = getCandidates();
      const expected = [
        {
          id: 2,
          name: "Maria Fernandez",
          email: "maria@gmail.com",
          age: 28,
          positionApplied: "Administrator",
          yearOfExperience: 6,
          status: "Waiting",
          applicationDate: "01/02/2021",
        },
        {
          id: 4,
          name: "Leonardo Martinez",
          email: "leonardo@gmail.com",
          age: 29,
          positionApplied: "Manager",
          yearOfExperience: 5,
          status: "Accepted",
          applicationDate: "01/03/2021",
        },
        {
          id: 1,
          name: "Martin Valles",
          email: "martin@gmail.com",
          age: 31,
          positionApplied: "Developer",
          yearOfExperience: 4,
          status: "Accepted",
          applicationDate: "01/01/2021",
        },
        {
          id: 3,
          name: "Sergio Ortiz",
          email: "sergio@gmail.com",
          age: 24,
          positionApplied: "Developer",
          yearOfExperience: 1,
          status: "Rejected",
          applicationDate: "01/06/2021",
        },
      ];
      const isSortAscending = true;
      const result = filterAndSortCandidates({
        candidates,
        filters: [],
        sortColumn: "yearOfExperience",
        isSortAscending,
      });
      expect(result).toEqual(expected);
    });
  });
});
