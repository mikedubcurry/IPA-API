import { gql } from 'apollo-server-core';
import { createTestClient } from 'apollo-server-testing';
import { v4 } from 'uuid';

import { constructTestServer } from '../utils';
import { mockStore } from '../../datasources/__tests__/user.test';

describe('tests work', () => {
	it('should add 1 and 2', () => {
		expect(1 + 2).toEqual(3);
	});
});

// describe('Mutations', () => {
// 	it('should return a user token on signup', async () => {
		
// 	});
// });
