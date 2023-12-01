exports.init = function initCheckExtensions()
{
  // check for strings ending with some expression
  expect.extend({
    toEndWith: (actualString, expectedEnding) => ({
      message: () => `expected that ${actualString} ends with ${expectedEnding}`,
      pass: actualString.endsWith(expectedEnding)
    })
  });

  // compare strings ignoring white space
  expect.extend({
    toMatchStringIgnoringWhitespace: (actualString, expectedEnding) => ({
      message: () => `expected that ${actualString} matches with ${expectedEnding} ignoring whitespace`,
      pass: actualString.replace(/\s+/g, '') == expectedEnding.replace(/\s+/g, '')
    })
  });

  // compare JSON strings ignoring white space, print JSON with line feeds in case of mismatches
  expect.extend({
    toMatchJson: (actualString, expectedEnding) => ({
      message: () => `expected that ${actualString.replace(/,/g, ',\n')} matches with ${expectedEnding.replace(/,/g, ',\n')} ignoring whitespace`,
      pass: actualString.replace(/\s+/g, '') == expectedEnding.replace(/\s+/g, '')
    })
  });

  // compare configuration data without IP addresses, port numbers and the WORKAROUND-FIX
  expect.extend({
    toMatchConfig: (actualString, expectedEnding) => ({
      message: () => `expected that ${actualString.replace(/,/g, ',\n')} matches with ${expectedEnding.replace(/,/g, ',\n')} ignoring whitespace`,
      pass: actualString.replace(/\s+/g, '').replace(/ipv-4-address.*\}/g, 'ipv-4-address:X.X.X.X}').replace(/port.:.*\}/g, 'port:XXXX}').replace(/\"static-value\":\"WORKAROUND-FIX\",/g, '') ==
        expectedEnding.replace(/\s+/g, '').replace(/ipv-4-address.*\}/g, 'ipv-4-address:X.X.X.X}').replace(/port.:.*\}/g, 'port:XXXX}').replace(/\"static-value\":\"WORKAROUND-FIX\",/g, '')
    })
  });
}
