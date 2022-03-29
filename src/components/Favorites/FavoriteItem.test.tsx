import { render, screen, waitFor } from '@testing-library/react';
import FavoriteItem from './FavoriteItem';
import { Rocket } from './Favorites';

describe('component: Favorite Item', () => {
  it('should render correctly', async () => {
    render(
      <FavoriteItem
        mission_name="FalconSat"
        links={{
          mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
        }}
        rocket={{ rocket_name: 'Rocket' } as Rocket}
      />,
    );

    expect(screen.getByTestId('mission-img')).toBeInTheDocument();
    expect(screen.getByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('Rocket')).toBeInTheDocument();
  });
});
