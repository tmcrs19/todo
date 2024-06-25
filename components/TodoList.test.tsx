import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@faceit/lib/redux/test-utils"; // Adjust the import according to your project structure
import { TodoList } from "./TodoList";

describe("TodoList Component", () => {
  it("should render the TODO list header, add a new TODO item, toggle its completion status, and delete it", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TodoList />);

    expect(
      screen.getByRole("heading", { name: /TODO List/i })
    ).toBeInTheDocument();

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    const input = screen.getByPlaceholderText(/Add a new TODO/i);
    const addButton = screen.getByRole("button", { name: /Add TODO/i });

    await user.type(input, "Test TODO");
    await user.click(addButton);

    expect(screen.getByText(/Test TODO/i)).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText(/Test TODO/i)).not.toBeInTheDocument();

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
