import React from "react";
import Feedback from '../pages/Feedback';
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

describe('Testa página de feedback - Req 17', () => { 
  test('se aparece a página de Feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    
    const feedbackPage = screen.getByTestId('feedback-text');
    expect(feedbackPage).toBeInTheDocument();
  });

  test('se o componente Header é renderizado', () => {
    renderWithRouterAndRedux(<Feedback />);

    const header = screen.getByTestId('header-player-name');
    expect(header).toBeInTheDocument();
  });

  test('se a mensagem para o usuário é renderizada', () => {
    renderWithRouterAndRedux(<Feedback />);

    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
  });

  test('se o botão /Play Again/ está renderizado e funcional', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/feedback');

    const playAgain = screen.getByTestId("btn-play-again");
    userEvent.click(playAgain);

    expect(history.location.pathname).toBe('/');
  });

  test('se o botão /Ranking/ está renderizado e funcional', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/feedback');

    const ranking = screen.getByTestId('btn-ranking');
    userEvent.click(ranking);

    expect(history.location.pathname).toBe('/ranking');
  });
  
});
