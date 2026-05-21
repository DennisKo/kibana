/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { FC } from 'react';
import React from 'react';
import { EuiCallOut } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { TOOLS_FLYOUT_BANNER_TEST_ID } from './test_ids';

export interface ToolsFlyoutBannerProps {
  /**
   * Tool name shown in the banner (e.g. "Notes", "Correlations").
   */
  title: string;
}

/**
 * Banner rendered at the top of a tools flyout to indicate that the user is
 * looking at a stacked child surface (drill-down) of the main document flyout.
 *
 * Replaces the yellow preview banner that the legacy expandable flyout rendered
 * on top of its preview panels.
 */
export const ToolsFlyoutBanner: FC<ToolsFlyoutBannerProps> = ({ title }) => (
  <EuiCallOut
    announceOnMount
    size="s"
    color="warning"
    title={i18n.translate('xpack.securitySolution.flyout.toolsFlyoutBanner.title', {
      defaultMessage: 'Drill-down — {title}',
      values: { title },
    })}
    data-test-subj={TOOLS_FLYOUT_BANNER_TEST_ID}
  />
);

ToolsFlyoutBanner.displayName = 'ToolsFlyoutBanner';
