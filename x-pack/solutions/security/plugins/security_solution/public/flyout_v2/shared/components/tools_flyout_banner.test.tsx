/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { TOOLS_FLYOUT_BANNER_TEST_ID } from './test_ids';
import { ToolsFlyoutBanner } from './tools_flyout_banner';

describe('<ToolsFlyoutBanner />', () => {
  it('renders a banner including the tool title', () => {
    const { getByTestId } = render(<ToolsFlyoutBanner title="Correlations" />);
    const banner = getByTestId(TOOLS_FLYOUT_BANNER_TEST_ID);
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveTextContent('Correlations');
  });
});
