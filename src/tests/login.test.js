import React from "react";
import Login from '../pages/Login'
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

describe('Testa a página de login', () => { 
  it('Testa se aparece a página de login', () => {
    renderWithRouterAndRedux(<Login />);
    const loginPage = screen.getByTestId('login-div');
    expect(loginPage).toBeInTheDocument();
  })

  it('Testa o botão Play', () => {
    renderWithRouterAndRedux(<Login />);

     const name = screen.getByTestId("input-player-name");
     const email = screen.getByTestId("input-gravatar-email");
     const button = screen.getByTestId("btn-play");
     expect(button).not.toBeEnabled();
     userEvent.type(name, 'Grupo12');
     userEvent.type(email, 'teste@teste.com');
     expect(button).toBeEnabled();
  })

  it('Testa o botão settings', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByTestId("btn-settings");
    userEvent.click(button);
    await waitFor(() => {
        expect(history.location.pathname).toBe('/settings');
    })
  })
})