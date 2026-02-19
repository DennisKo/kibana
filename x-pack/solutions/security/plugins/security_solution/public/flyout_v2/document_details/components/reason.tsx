/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButtonEmpty, EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui';
import { type DataTableRecord, getFieldValue } from '@kbn/discover-utils';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import { ALERT_REASON } from '@kbn/rule-data-utils';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import {
  REASON_DETAILS_PREVIEW_BUTTON_TEST_ID,
  REASON_DETAILS_TEST_ID,
  REASON_TITLE_TEST_ID,
} from './test_ids';

export const ALERT_REASON_BANNER = {
  title: i18n.translate(
    'xpack.securitySolution.flyout.right.about.reason.alertReasonPreviewTitle',
    {
      defaultMessage: 'Preview alert reason',
    }
  ),
  backgroundColor: 'warning',
  textColor: 'warning',
};

/**
 * Displays the alert reason for alert documents.
 * In Discover we intentionally do not show the preview flyout button.
 */
export interface ReasonProps {
  /**
   * Alert/event document
   */
  hit: DataTableRecord;
  /**
   * Callback to show the full reason flyout when the "Show full reason" button is clicked.
   * If not provided, the button won't be rendered.
   */
  onShowFullReason?: () => void;
  /**
   * Boolean to disable the "Show full reason" button.
   */
  fullReasonDisabled?: boolean;
}

export const Reason: FC<ReasonProps> = ({ hit, onShowFullReason, fullReasonDisabled }) => {
  const isAlert = useMemo(() => getFieldValue(hit, 'kibana.alert.rule.uuid') as string, [hit]);
  const alertReason = useMemo(() => getFieldValue(hit, ALERT_REASON) as string, [hit]);

  const viewPreview = useMemo(
    () => (
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          size="s"
          iconType="expand"
          onClick={onShowFullReason}
          iconSide="right"
          data-test-subj={REASON_DETAILS_PREVIEW_BUTTON_TEST_ID}
          aria-label={i18n.translate(
            'xpack.securitySolution.flyout.right.about.reason.alertReasonButtonAriaLabel',
            {
              defaultMessage: 'Show full reason',
            }
          )}
          disabled={fullReasonDisabled}
        >
          <FormattedMessage
            id="xpack.securitySolution.flyout.right.about.reason.alertReasonButtonLabel"
            defaultMessage="Show full reason"
          />
        </EuiButtonEmpty>
      </EuiFlexItem>
    ),
    [fullReasonDisabled, onShowFullReason]
  );

  const alertReasonText = useMemo(
    () =>
      alertReason ? (
        alertReason
      ) : (
        <FormattedMessage
          id="xpack.securitySolution.flyout.right.about.reason.noReasonDescription"
          defaultMessage="There's no source event information for this alert."
        />
      ),
    [alertReason]
  );

  return (
    <EuiFlexGroup direction="column" gutterSize="s">
      <EuiFlexItem data-test-subj={REASON_TITLE_TEST_ID}>
        <EuiTitle size="xxs">
          {isAlert ? (
            <EuiFlexGroup
              justifyContent="spaceBetween"
              alignItems="center"
              gutterSize="none"
              responsive={false}
            >
              <EuiFlexItem grow={false}>
                <h5>
                  <FormattedMessage
                    id="xpack.securitySolution.flyout.right.about.reason.alertReasonTitle"
                    defaultMessage="Alert reason"
                  />
                </h5>
              </EuiFlexItem>
              {onShowFullReason && viewPreview}
            </EuiFlexGroup>
          ) : (
            <h5>
              <FormattedMessage
                id="xpack.securitySolution.flyout.right.about.reason.documentReasonTitle"
                defaultMessage="Document reason"
              />
            </h5>
          )}
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem data-test-subj={REASON_DETAILS_TEST_ID}>
        {isAlert ? alertReasonText : '-'}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

Reason.displayName = 'Reason';
