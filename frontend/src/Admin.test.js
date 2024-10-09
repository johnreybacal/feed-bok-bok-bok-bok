import { render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import Admin from './Admin';

jest.mock('axios');

describe('Admin Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ // Mock successful API response
            data: { rows: [], count: 0 },
        });
    });

    it('renders correctly with initial state', () => {
        render(<Admin />);

        expect(screen.getByPlaceholderText("Select Category")).toBeInTheDocument();
        expect(screen.getAllByText("From").length).toBeGreaterThan(0)
        expect(screen.getAllByText("To").length).toBeGreaterThan(0)
    });
});