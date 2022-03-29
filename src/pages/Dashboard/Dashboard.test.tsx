import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import api from '../../services/api';
import { LAUNCHES_MOCK } from '../../test/mocks/launches';

jest.spyOn(api, 'get').mockResolvedValue({ status: 200, data: LAUNCHES_MOCK });

xdescribe('page: Dashboard', () => {
  it('should call api.get when page renders', async () => {
    render(<Dashboard />);

    await screen.findByText('SpaceX | Falcons');

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith('/launches');
    });
  });
});
