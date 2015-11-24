"use strict";

import assert from 'power-assert';
import {TextLintCore} from 'textlint';
import rule from '../src/ng-word.js';

describe('ng-word', function() {

  context('when use sample text', () => {
    const textlint = new TextLintCore();

    textlint.setupRules({
      'ng-word': rule
    },{
      'ng-word': {
        'words':['xxx']
      }
    });

    it('should report error', (done) => {
      textlint.lintMarkdown('この文章は不適切な文字xxxを含みます。').then(result => {

        assert(result.messages.length === 1);
        assert(result.messages[0].message === 'Document contains NG word "xxx".');

      }).then(done, done);
    });

    it('should not report error', (done) => {
      textlint.lintMarkdown('この文章は不適切な表現を含みません。').then(result => {

        assert(result.messages.length === 0);

      }).then(done, done);
    });
  });
});
