import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StoreModal } from "./store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import axios from "axios";
import toast from "react-hot-toast";

jest.mock("@/hooks/use-store-modal");
jest.mock("axios");
jest.mock("react-hot-toast");

describe("StoreModal", () => {
  const mockUseStoreModal = useStoreModal as unknown as jest.Mock;
  const mockAxiosPost = axios.post as jest.Mock;
  const mockToastError = toast.error as jest.Mock;

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { assign: jest.fn() },
    });
    mockUseStoreModal.mockReturnValue({
      isOpen: true,
      onClose: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal", () => {
    render(<StoreModal />);
    expect(screen.getByText("Create store")).toBeInTheDocument();
    expect(
      screen.getByText("Add a new store to manage products and categories")
    ).toBeInTheDocument();
  });

  it("displays validation error when form is submitted empty", async () => {
    render(<StoreModal />);
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    mockAxiosPost.mockResolvedValueOnce({ data: { id: "123" } });
    render(<StoreModal />);
    fireEvent.change(screen.getByPlaceholderText("E-Commerce"), {
      target: { value: "Test Store" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith("/api/stores", {
        name: "Test Store",
      });
      expect(window.location.assign).toHaveBeenCalledWith("/123");
    });
  });

  it("displays error toast on form submission failure", async () => {
    mockAxiosPost.mockRejectedValueOnce(new Error("Failed to create store"));
    render(<StoreModal />);
    fireEvent.change(screen.getByPlaceholderText("E-Commerce"), {
      target: { value: "Test Store" },
    });
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("Failed to create store");
    });
  });

  it("calls onClose when cancel button is clicked", () => {
    const mockOnClose = jest.fn();
    mockUseStoreModal.mockReturnValueOnce({
      isOpen: true,
      onClose: mockOnClose,
    });
    render(<StoreModal />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
