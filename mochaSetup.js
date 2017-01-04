/** ***************************************************************************\
 *
 * mochaSetup.js
 *
 * This file contains javascript that is run before mocha runs tests.
 * This is very useful for inserting hooks into the mocha lifecycle. Any
 * special javascript that needs to be run at mocha run time should be put here.
 *
\******************************************************************************/
const CSSModulesRequireHook = require('css-modules-require-hook');
// import { mochaTestSetupStrings } from 'lib/l10nLib';
// import enUsStrings from './l10n/en_US.json';

/**
 *  CSSModulesRequireHook transforms any included .css files in tests to
 *  CSSModules. This allows us to import and use styles in tests the same way
 *  we do in components.
 */
CSSModulesRequireHook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

// Simulates having already initialized the l10n library so that unit tests
// don't have to wait around for something to set it up.
// mochaTestSetupStrings('en_US', enUsStrings);
