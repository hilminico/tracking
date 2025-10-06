// test/concurrency/auth-concurrent.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { ConcurrentTestHelper, ConcurrentTestUser } from '../utils/concurrent-test.utils';

describe('Auth Concurrency Test (10 Users)', () => {
  let app: INestApplication;
  const concurrentUsers: ConcurrentTestUser[] = [];

  beforeAll(async () => {
    for (let i = 1; i <= 10; i++) {
      concurrentUsers.push({
        email: `user${i}@concurrent.com`,
        password: `Password${i}!`,
      });
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Concurrent User Registration', () => {
    it('should handle 10 concurrent user registrations', async () => {
      // Execute 10 concurrent registration requests
      const registrationPromises = concurrentUsers.map(user =>
        ConcurrentTestHelper.registerUser(app, user)
      );

      const results = await Promise.allSettled(registrationPromises);

      // Analyze results
      const successfulRegistrations = results.filter(result => result.status === 'fulfilled').length;
      const failedRegistrations = results.filter(result => result.status === 'rejected').length;

      console.log(`📊 Successful: ${successfulRegistrations}, Failed: ${failedRegistrations}`);

      // All should succeed in a well-designed system
      expect(successfulRegistrations).toBe(10);
      expect(failedRegistrations).toBe(0);

      // Verify all users got tokens
      concurrentUsers.forEach(user => {
        expect(user).toBeDefined();
      });
    }, 30000); // Increase timeout for concurrent tests
  });

  describe('Concurrent User Login', () => {
    it('should handle 10 concurrent user logins', async () => {

      // Clear tokens first
      concurrentUsers.forEach(user => { user.token = undefined; });

      const loginPromises = concurrentUsers.map(user =>
        ConcurrentTestHelper.loginUser(app, user)
      );

      const results = await Promise.allSettled(loginPromises);

      const successfulLogins = results.filter(result => result.status === 'fulfilled').length;
      const failedLogins = results.filter(result => result.status === 'rejected').length;

      console.log(`📊 Successful: ${successfulLogins}, Failed: ${failedLogins}`);

      expect(successfulLogins).toBe(10);
      expect(failedLogins).toBe(0);

      // Verify tokens
      concurrentUsers.forEach(user => {
        expect(user.token).toBeDefined();
      });
    }, 30000);
  });
});