import React from "react";
import StarWarsCharacters from "./StarWarsCharacters"
import {getData as mockGetData} from '../api'
import { render, fireEvent } from "@testing-library/react";

jest.mock('../api');

test('renders the character component', () => {

    const { findByText } = render(<StarWarsCharacters />);

    findByText(/Darth Vader/i);
    findByText(/Leia Organa/i);
    const next = findByText(/Next/i);
    const previous = findByText(/Previous/i);

    fireEvent.click(next);
    expect(mockGetData).toHaveBeenCalledTimes(1)

    fireEvent.click(previous);
    expect(mockGetData).toHaveBeenCalledTimes(1)



})