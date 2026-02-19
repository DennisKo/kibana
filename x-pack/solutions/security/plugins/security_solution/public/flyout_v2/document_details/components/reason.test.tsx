/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { DataTableRecord } from '@kbn/discover-utils';
import { __IntlProvider as IntlProvider } from '@kbn/i18n-react';
import { render } from '@testing-library/react';
import React from 'react';
import { Reason } from './reason';
import {
  REASON_DETAILS_PREVIEW_BUTTON_TEST_ID,
  REASON_DETAILS_TEST_ID,
  REASON_TITLE_TEST_ID,
} from './test_ids';

const createMockHit = (flattened: DataTableRecord['flattened']): DataTableRecord =>
  ({
    id: '1',
    raw: {},
    flattened,
    isAnchor: false,
  } as DataTableRecord);

const alertHitWithReason = createMockHit({
  'kibana.alert.rule.uuid': '123',
  'kibana.alert.reason': 'Alert reason text',
});

const alertHitWithoutReason = createMockHit({
  'kibana.alert.rule.uuid': '123',
});

const documentHit = createMockHit({
  'some.other.field': 'value',
});

const renderReason = (props: Parameters<typeof Reason>[0]) =>
  render(
    <IntlProvider locale="en">
      <Reason {...props} />
    </IntlProvider>
  );

const NO_DATA_MESSAGE = "There's no source event information for this alert.";

describe('<Reason />', () => {
  it('should render alert reason title and details for alert documents', () => {
    const { getByTestId } = renderReason({ hit: alertHitWithReason });

    expect(getByTestId(REASON_TITLE_TEST_ID)).toHaveTextContent('Alert reason');
    expect(getByTestId(REASON_DETAILS_TEST_ID)).toHaveTextContent('Alert reason text');
  });

  it('should render no data message when reason is missing for alert documents', () => {
    const { getByText } = renderReason({ hit: alertHitWithoutReason });

    expect(getByText(NO_DATA_MESSAGE)).toBeInTheDocument();
  });

  it('should render document reason and "-" for non-alert documents', () => {
    const { getByTestId } = renderReason({ hit: documentHit });

    expect(getByTestId(REASON_TITLE_TEST_ID)).toHaveTextContent('Document reason');
    expect(getByTestId(REASON_DETAILS_TEST_ID)).toHaveTextContent('-');
  });

  it('should not render the show full reason button in discover', () => {
    const { queryByText } = renderReason({ hit: alertHitWithReason });

    expect(queryByText('Show full reason')).not.toBeInTheDocument();
  });

  it('should render show full reason button when callback is provided', () => {
    const { getByTestId } = renderReason({
      hit: alertHitWithReason,
      onShowFullReason: jest.fn(),
    });

    expect(getByTestId(REASON_DETAILS_PREVIEW_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(REASON_DETAILS_PREVIEW_BUTTON_TEST_ID)).toHaveTextContent(
      'Show full reason'
    );
  });

  it('should call onShowFullReason when clicking the button', () => {
    const onShowFullReason = jest.fn();
    const { getByTestId } = renderReason({
      hit: alertHitWithReason,
      onShowFullReason,
    });

    getByTestId(REASON_DETAILS_PREVIEW_BUTTON_TEST_ID).click();

    expect(onShowFullReason).toHaveBeenCalledTimes(1);
  });

  it('should render show full reason button as disabled when fullReasonDisabled is true', () => {
    const { getByTestId } = renderReason({
      hit: alertHitWithReason,
      onShowFullReason: jest.fn(),
      fullReasonDisabled: true,
    });

    expect(getByTestId(REASON_DETAILS_PREVIEW_BUTTON_TEST_ID)).toHaveAttribute('disabled');
  });
});
