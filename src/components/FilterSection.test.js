import React from "react";
import { shallow } from "enzyme";

import FilterSection from "./FilterSection";

describe("FilterSection", () => {
  const defaultProps = {
    onSubmit: () => null,
    initialFilters: {},
  };

  const createFilterSection = (customProps) =>
    shallow(<FilterSection {...defaultProps} {...customProps} />);

  it("should display an input for each filter", () => {
    const wrapper = createFilterSection();
    expect(wrapper.find('[data-testid="filterInput"]')).toHaveLength(3);
  });

  it("should set initial value for name filter if provided", () => {
    const nameValue = "Martin Valles";
    const wrapper = createFilterSection({
      initialFilters: { name: nameValue },
    });
    const nameInput = wrapper.find("#inputName");
    const value = nameInput.props().value;
    expect(value).toBe(nameValue);
  });

  it("should set initial value for status filter if provided", () => {
    const statusValue = "Accepted";
    const wrapper = createFilterSection({
      initialFilters: { status: statusValue },
    });
    const statusInput = wrapper.find("#inputStatus");
    const value = statusInput.props().value;
    expect(value).toBe(statusValue);
  });

  it("should set initial value for position applied filter if provided", () => {
    const positionValue = "Developer";
    const wrapper = createFilterSection({
      initialFilters: { positionApplied: positionValue },
    });
    const positionInput = wrapper.find("#inputPosition");
    const value = positionInput.props().value;
    expect(value).toBe(positionValue);
  });
});
