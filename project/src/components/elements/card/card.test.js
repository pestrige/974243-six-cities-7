import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Card } from './card';

const history = createMemoryHistory();
const mockStore = configureStore();
const storeFakeData = {
  AUTH: {status: 'NO_AUTH'},
  FORM: {isSending: false},
};
const defaultOffer = {
  id: 1,
  previewImage: 'img/test.png',
  isPremium: false,
  isFavorite: false,
  price: 100,
  rating: 4.8,
  title: 'test title',
  type: 'apartment',
};

describe('Component Card', () => {
  it('should render correctly with default values', () => {
    const {id, previewImage, price, title } = defaultOffer;
    const defaultSize = {width: '260', height: '200'};
    const cardType = 'cities';

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Card
            offer={defaultOffer}
            cardType={cardType}
            isActive={false}
            handleMouseEnter={null}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('article')).toHaveClass(`${cardType}__card place-card`, {exact: true});
    expect(screen.getByTestId(`image-wrapper-${id}`)).toHaveClass(`${cardType}__image-wrapper place-card__image-wrapper`, {exact: true});
    expect(screen.getByRole('img')).toHaveAttribute('src', previewImage);
    expect(screen.getByRole('img')).toHaveAttribute('width', defaultSize.width);
    expect(screen.getByRole('img')).toHaveAttribute('height', defaultSize.height);
    expect(screen.getByTestId(`card-info-${id}`)).toHaveClass(`${cardType}__card-info place-card__info`, {exact: true});
    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByTestId(`rating-${id}`)).toHaveStyle('width: 96%');
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(`${title}`)).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });

  it('should render correctly with isPremium and isActive flag', () => {
    const premiumOffer = {
      ...defaultOffer,
      isPremium: true,
    };
    const cardType = 'cities';

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Card
            offer={premiumOffer}
            cardType={cardType}
            isActive
            handleMouseEnter={null}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('article')).toHaveClass(`${cardType}__card place-card place-card--active`, {exact: true});
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render correctly if the component has favorite type', () => {
    const favoriteSize = {width: '150', height: '110'};
    const cardType = 'favorites';
    const { id } = defaultOffer;
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router history={history}>
          <Card
            offer={defaultOffer}
            cardType={cardType}
            isActive={false}
            handleMouseEnter={null}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('article')).toHaveClass(`${cardType}__card place-card`, {exact: true});
    expect(screen.getByTestId(`image-wrapper-${id}`)).toHaveClass(`${cardType}__image-wrapper place-card__image-wrapper`, {exact: true});
    expect(screen.getByRole('img')).toHaveAttribute('width', favoriteSize.width);
    expect(screen.getByRole('img')).toHaveAttribute('height', favoriteSize.height);
  });

  it('should redirect to offer screen when clicked to links', () => {
    const cardType = 'cities';
    const { id } = defaultOffer;
    history.push('/');

    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router  history={history}>
          <Switch>
            <Route path={`/offer/${id}`}>
              <h1>This is mock Offer page</h1>
            </Route>
            <Route>
              <Card
                offer={defaultOffer}
                cardType={cardType}
                isActive={false}
                handleMouseEnter={() => {}}
              />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is mock Offer page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('link')[0]);
    expect(screen.getByText(/This is mock Offer page/i)).toBeInTheDocument();

    history.goBack();
    expect(screen.queryByText(/This is mock Offer page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('link')[1]);
    expect(screen.getByText(/This is mock Offer page/i)).toBeInTheDocument();
  });

  it('should set active offer when hover to card', () => {
    const cardType = 'cities';
    const handleMouseEnter = jest.fn();
    render(
      <Provider store={mockStore(storeFakeData)}>
        <Router  history={history}>
          <Card
            offer={defaultOffer}
            cardType={cardType}
            isActive={false}
            handleMouseEnter={handleMouseEnter}
          />
        </Router>
      </Provider>,
    );

    userEvent.hover(screen.getByRole('article'));
    expect(handleMouseEnter).toBeCalled();
    expect(handleMouseEnter).toHaveBeenCalledWith(defaultOffer);
    userEvent.unhover(screen.getByRole('article'));
    expect(handleMouseEnter).toBeCalled();
    expect(handleMouseEnter).toHaveBeenCalledWith({});
  });
});
