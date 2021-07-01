'use strict';

export default function (context, options = {}) {
  const words = options.words || [];
  const { Syntax, getSource, report, RuleError } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      words.forEach(word => {
        const violationIndex = text.indexOf(word);
        if (violationIndex == -1) {
          return;
        }
        const ruleError = new RuleError(`Document contains NG word "${word}".`, {
          index: violationIndex
        });
        report(node, ruleError);
      });
    }
  }
};
