import React from "react";
// import Game from '../pages/Game';
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import { questionsResponse } from '../../cypress/mocks/questions';
import { tokenResponse, invalidTokenQuestionsResponse } from '../../cypress/mocks/token';
import Game from '../pages/Game';

// const START = () => {
//     const name = screen.getByTestId("input-player-name");
//     const email = screen.getByTestId("input-gravatar-email");
//     const button = screen.getByTestId("btn-play");
//     userEvent.type(name, 'Grupo12');
//     userEvent.type(email, 'teste@teste.com');
//     userEvent.click(button);
// }

describe('Testa página de Game - Req 17', () => {
  test('se é renderizado o nome do jogador', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const playerName = await screen.findByTestId('header-player-name');

    expect(playerName).toBeInTheDocument();
  });

  test('se é renderizado a imagem do jogador', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const playerPic = await screen.findByTestId('header-profile-picture');

    expect(playerPic).toBeInTheDocument();
  });

  test('se é renderizada uma questão ao entrar no jogo', async () => {
    fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }))

    renderWithRouterAndRedux(<Game />, {}, '/game');

    const questions = await screen.findByTestId('question-text');

    expect(questions).toBeInTheDocument();
  });

  test('se é renderizada a categoria da questão ao entrar no jogo', async () => {
    fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }))

    renderWithRouterAndRedux(<Game />, {}, '/game');

    const categories = await screen.findByTestId('question-category');

    expect(categories).toBeInTheDocument();
  });

  test('se é renderizada pelo menos duas respostas no jogo', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const answers = await screen.findAllByTestId('answer-options');

    expect(answers[0]).toBeInTheDocument();
    expect(answers[1]).toBeInTheDocument();
});

  test('se é renderizada ao menos uma resposta errada', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const wrongAnswers = await screen.findAllByTestId('wrong-answer-0');

    expect(wrongAnswers[0]).toBeInTheDocument();
});

  test('se é renderizada ao menos uma resposta correta', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const correctAnswer = await screen.findByTestId('correct-answer');

    expect(correctAnswer).toBeInTheDocument();
});

  test('se ao clicar numa resposta é renderizado botão /Next/ funcional', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    
    const buttonNext = await screen.findByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext)
    expect(buttonNext).not.toBeInTheDocument();
});

  test('se ao clicar na resposta correta o placar aumenta', async () => {
    fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }))

    renderWithRouterAndRedux(<Game />, {}, '/game');

    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    
    const score = await screen.findByTestId('header-score')

    expect(score.innerText).not.toBe(0);
});

  test('se ao clicar na resposta errada o placar não aumenta', async () => {
    fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }))

    renderWithRouterAndRedux(<Game />, {}, '/game');

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer)
    
    const score = await screen.findByTestId('header-score')

    expect(score.innerText).not.toBe(30);
    });
  
  test('Ao clicar em next é renderizada a próxima questão', async () => {
    fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }))
    
    renderWithRouterAndRedux(<Game />, {}, '/game');

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer)
    
    const buttonNext = await screen.findByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();


    const answers = await screen.findAllByTestId('answer-options');

    expect(answers[0]).toBeInTheDocument();
  });
});
