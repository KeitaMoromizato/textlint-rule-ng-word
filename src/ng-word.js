'use strict';

export default function (context, options = {}) {
  const words = options.words || [];
  const { Syntax, getSource, report, RuleError } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      words.forEach(word => {
        let fromIndex = -1;
        let violationIndex = 0;
        do {
          violationIndex = text.indexOf(word, fromIndex + 1);
          if (violationIndex == -1) {
            return;
          }
          fromIndex = violationIndex;
          const ruleError = new RuleError(`contains NG word "${word}".`, {
            index: violationIndex
          });
          report(node, ruleError);
        } while (violationIndex !== -1);
      });
    }
  }
};
