/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Desktop } from './components/Desktop';
import { PortfolioHome } from './components/PortfolioHome';
import { useState } from 'react';

export default function App() {
  const [desktopMode, setDesktopMode] = useState(false);

  if (desktopMode) {
    return <Desktop onExit={() => setDesktopMode(false)} />;
  }

  return <PortfolioHome onOpenDesktop={() => setDesktopMode(true)} />;
}
