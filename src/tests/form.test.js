import React from 'react';
import FormExampleFieldErrorLabel from '../form.js';
import renderer from 'react-test-renderer';

test('Test Forum components', () => {
  const component = renderer.create(
    <FormExampleFieldErrorLabel/>
  );
  let forum = component.toJSON();
  expect(forum).toMatchSnapshot();
});