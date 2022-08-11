import React from "react";
// import Game from '../pages/Game';
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

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
    renderWithRouterAndRedux(<App /> );

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);

    await waitFor(() => {
      const playerName = screen.getByTestId('header-player-name');
      expect(playerName).toBeInTheDocument();
    });
  });

  test('se é renderizado a imagem do jogador', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const playerImg = screen.getByTestId('header-player-name');
    expect(playerImg).toBeInTheDocument();
    })
  });

  // resolver
  test('se é renderizada uma questão ao entrar no jogo', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const questionText = screen.getByTestId('question-text');
    // console.log(questionText)
    expect(questionText).toBeInTheDocument();
    })
  });

  // resolver
  test('se é renderizada a categoria da questão ao entrar no jogo', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const questionCategory = screen.getByTestId('question-category');
    console.log(question-category)
    expect(questionCategory).toBeInTheDocument();
    });
  });

  test('se é renderizada pelo menos duas respostas no jogo', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const answerOptions = screen.getAllByTestId('answer-options');
    expect(answerOptions).not.toBe(undefined);
    expect(answerOptions).not.toHaveLength(0);
});
  });

  test('se é renderizada ao menos uma resposta errada', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const wrongAnswer = screen.getAllByTestId('wrong-answer-0');
    expect(wrongAnswer[0]).toBeInTheDocument();
});
  });

  test('se é renderizada ao menos uma resposta correta', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
});
  });

  // resolver
  test('se ao clicar numa resposta é renderizado botão /Next/ funcional', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);

    await waitFor(() => {
    const answerOption = screen.getAllByTestId('answer-options');
    userEvent.click(answerOption[0])
    
    const buttonNext = screen.getByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext)
    expect(buttonNext).not.toBeInTheDocument();
});
  });

  test('se ao clicar na resposta correta o placar aumenta', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const score = screen.getByTestId('header-score')

    expect(score.innerText).toBe(0);

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer)

    expect(score.innerText).not.toBe(0);
});
  });

  // resolver
  test('se ao clicar na resposta errada o placar não aumenta', async () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");
    const button = screen.getByTestId("btn-play");
    userEvent.type(name, 'Grupo12');
    userEvent.type(email, 'teste@teste.com');
    userEvent.click(button);
    
    await waitFor(() => {
    const score = screen.getByTestId('header-score')

    expect(score.innerText).toBe(0);

    const wrongAnswer = screen.getByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer)

    expect(score.innerText).toBe(0);
    });
  });
  
});
