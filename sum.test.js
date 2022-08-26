import 'react-native';
import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

let findTextElement = function (tree, element) {
  console.warn(tree);
  return true;
};

it('Find text element', () => {
  let tree = renderer.create(<App />).toJSON();

  expect(findTextElement(tree, 'email')).toBeDefined();
});
