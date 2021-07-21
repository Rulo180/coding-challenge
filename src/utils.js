import camelCase from "lodash/camelCase";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";

import {
  CANDIDATES_COLUMNS,
  NUMBER_TYPE,
  STRING_TYPE,
  DATE_TYPE,
  STATUS_COLUMN,
  NAME_COLUMN,
} from "./constants";

export const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[camelCase(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export const parseResponse = (response) => {
  return response.map((candidate) => keysToCamel(candidate));
};

export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const sortNumber = (a, b) => a - b;

export const sortNumberValue = (a, b) => sortNumber(a.value, b.value);

export const sortTextValue = (a, b) => {
  var textA = (a.value + "").toUpperCase();
  var textB = (b.value + "").toUpperCase();

  if (textA < textB) {
    return -1;
  }

  if (textA > textB) {
    return 1;
  }

  return 0;
};

export const sortDateValue = (a, b) => {
  var dateA = Date.parse(a.value),
    dateB = Date.parse(b.value);

  return sortNumber(dateA, dateB);
};

export const sortCandidatesBy = (candidates, sortColumn) => {
  const columnData = CANDIDATES_COLUMNS[sortColumn];
  if (columnData.isSortable) {
    const columnValues = candidates.map((candidate) => {
      return { id: candidate.id, value: candidate[sortColumn] };
    });
    let sortedColumns;

    if (columnData.type === NUMBER_TYPE) {
      sortedColumns = columnValues.sort(sortNumberValue);
    } else if (columnData.type === STRING_TYPE) {
      sortedColumns = columnValues.sort(sortTextValue);
    } else if (columnData.type === DATE_TYPE) {
      sortedColumns = columnValues.sort(sortDateValue);
    }

    const sortedCandidates = sortedColumns.map((column) =>
      candidates.find((candidate) => candidate.id === column.id)
    );
    return sortedCandidates;
  } else {
    return candidates;
  }
};

export const filterCandidates = (candidates, filters) => {
  let filteredCandidates = candidates;
  filters.forEach((filter) => {
    if (filter.value) {
      if (filter.field === STATUS_COLUMN) {
        filteredCandidates = filteredCandidates.filter(
          (candidate) => candidate.status === filter.value
        );
      } else if (filter.field === NAME_COLUMN) {
        filteredCandidates = filteredCandidates.filter((candidate) => {
          const matchingParts = candidate.name
            .split(" ")
            .filter((namePart) =>
              namePart.toLowerCase().startsWith(filter.value.toLowerCase())
            );
          return matchingParts.length > 0;
        });
      }
    }
  });
  return filteredCandidates;
};

export const setQueryString = (queryParams) => {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryParams}`;

  window.history.pushState({ path: newUrl }, "", newUrl);
};

export const parseQueryStringObject = (queryObj) =>
  Object.keys(queryObj).map((queryParam) => {
    return { field: queryParam, value: queryObj[queryParam] };
  });
