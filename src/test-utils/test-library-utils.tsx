import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { OrderDetailsProvider } from '../contexts/OrderDetail';

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
  return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
