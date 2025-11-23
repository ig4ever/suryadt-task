import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OwnerCard from "../OwnerCard";
import { useFavorites } from "../../../store/favorites";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
}));

describe("OwnerCard", () => {
  it("toggles favorite star", () => {
    const owner = {
      _id: "1",
      id: "1",
      firstName: "John",
      lastName: "Lennon",
      description: "",
      favorites: false,
      isMaster: false,
    };
    const { getByText } = render(<OwnerCard data={owner} />);
    const store = useFavorites.getState();
    expect(store.favorites["1"]).toBeUndefined();
    fireEvent.press(getByText("☆"));
    expect(useFavorites.getState().favorites["1"]).toBe(true);
    fireEvent.press(getByText("★"));
    expect(useFavorites.getState().favorites["1"]).toBe(false);
  });
});
