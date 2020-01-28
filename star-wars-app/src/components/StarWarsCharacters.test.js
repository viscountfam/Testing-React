import React from "react";
import StarWarsCharacters from "./StarWarsCharacters"
import {getData as mockGetData} from '../api'
import { render, fireEvent, wait } from "@testing-library/react";





jest.mock('../api')

const fakeData = {
    previous: null ,
    next: "https://www.somestring.com/page2" ,
    results: [{name: "Mace Windu", url: "https://www.Treason.com"}, {name: "Ma Wind", url: "wownowno"}, {name: "Mac Winu", url: "Howdy"}, {name: "Macee Windy", url: "own"}, {name: "Malcom Winds", url: "wownow"}]
}

// test('renders the character component', async() => {    
//     mockGetData.mockResolvedValue(fakeData)
//     const { findByText, findByAltText } = render(<StarWarsCharacters />);
//     findByAltText(/logo/i);
// });

test('api works', async() => {
    mockGetData.mockResolvedValue(fakeData)
    const { findByText } = render(<StarWarsCharacters />);
    await wait(() => findByText(/Mace Windu/i));
    findByText(/Malcom/i)
    expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');
    expect(mockGetData).toHaveBeenCalledTimes(1);
    
})

test('Does the next button work', async() => {
    mockGetData.mockResolvedValue(fakeData)
    const { findByText } = render(<StarWarsCharacters />);
    const next =  await findByText(/next/i);
    console.log("this is the next node", next)
    await wait(() => { fireEvent.click(next);
        expect(mockGetData).toHaveBeenCalledTimes(3);
        expect(mockGetData).toHaveBeenCalledWith("https://www.somestring.com/page2")
    })
});

test('Does the previous button work', async() => {
    mockGetData.mockResolvedValue(fakeData)
    const { findByText } = render(<StarWarsCharacters />);
    const previous =  await findByText(/previous/i);
    console.log("this is the previous node", previous)
    await wait(() => { fireEvent.click(previous);
        expect(mockGetData).toHaveBeenCalledTimes(4);
    })
});




