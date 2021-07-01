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
        assert(result.messages[0].line === 1);
        assert(result.messages[0].column === 12);

      }).then(done, done);
    });

    it('should report correct line number', (done) => {
      const sample = `この文章は2行目に
不適切な文字xxxを含みます。`;
      textlint.lintMarkdown(sample).then(result => {

        assert(result.messages.length === 1);
        assert(result.messages[0].message === 'Document contains NG word "xxx".');
        assert(result.messages[0].line === 2);
        assert(result.messages[0].column === 7);

      }).then(done, done);
    });

    it('should not report error', (done) => {
      textlint.lintMarkdown('この文章は不適切な表現を含みません。').then(result => {

        assert(result.messages.length === 0);

      }).then(done, done);
    });

    context('when multiple violaitons on 1 line', () => {
      it('returns multiple errors', (done) => {
        textlint.lintMarkdown('この文章は不適切な文字xxxとxxxを含みます。').then(result => {
          assert(result.messages.length === 2);
          assert(result.messages[0].message === 'Document contains NG word "xxx".');
          assert(result.messages[0].line === 1);
          assert(result.messages[0].column === 12);
          assert(result.messages[1].line === 1);
          assert(result.messages[1].column === 16);
        }).then(done, done);
      });
    })
  });
});
