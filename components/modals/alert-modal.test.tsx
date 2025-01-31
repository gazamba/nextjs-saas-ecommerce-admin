import { render, screen, fireEvent } from "@testing-library/react";
import AlertModal from "./alert-modal";

describe("AlertModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    loading: false,
  };

  it("should render correctly when open", () => {
    render(<AlertModal {...defaultProps} />);
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("This action cannot be undone.")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("should not render when not mounted", () => {
    const { container } = render(
      <AlertModal {...defaultProps} isOpen={false} />
    );
    expect(screen.queryByText("Are you sure?")).toBeNull();
    expect(screen.queryByText("This action cannot be undone.")).toBeNull();
    expect(screen.queryByText("Cancel")).toBeNull();
    expect(screen.queryByText("Continue")).toBeNull();
  });

  it("should call onClose when Cancel button is clicked", () => {
    render(<AlertModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onConfirm when Continue button is clicked", () => {
    render(<AlertModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Continue"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it("should disable buttons when loading", () => {
    render(<AlertModal {...defaultProps} loading={true} />);
    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Continue")).toBeDisabled();
  });
});
