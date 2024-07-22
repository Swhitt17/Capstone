import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('/ route', () => {
   const {getByText} = render((
    <MemoryRouter>
      <App />
    </MemoryRouter>
   ));
  expect(getByText("Title")).toBeInTheDocument();
});

test('/navbar link - recipes', () => {
  const {getByText} = render((
   <MemoryRouter initalEntries={['/']}>
     <App />
   </MemoryRouter>
  ));
 expect(getByText("Title")).toBeInTheDocument();
 const link = getByText('Recipes');
 fireEvent.click(link);
 expect(getByText("Recipes"))
});


test('/navbar link - mealplans', () => {
  const {getByText} = render((
   <MemoryRouter initalEntries={['/']}>
     <App />
   </MemoryRouter>
  ));
 expect(getByText("Title")).toBeInTheDocument();
 const link = getByText('Meal Plans');
 fireEvent.click(link);
 expect(getByText("Meal Plans"))
});

test('/navbar link - shoppinglist', () => {
  const {getByText} = render((
   <MemoryRouter initalEntries={['/']}>
     <App />
   </MemoryRouter>
  ));
 expect(getByText("Title")).toBeInTheDocument();
 const link = getByText('Shopping List');
 fireEvent.click(link);
 expect(getByText("Shopping List"))
});