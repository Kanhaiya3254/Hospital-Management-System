import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login when no token", () => {
  localStorage.removeItem("token");
  render(<App />);
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});
