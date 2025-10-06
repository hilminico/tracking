// test/utils/concurrent-test.utils.ts
import request from 'supertest';

export interface ConcurrentTestUser {
  email: string;
  password: string;
  token?: string;
  customerId?: string;
  vehicleIds?: string[];
}

export class ConcurrentTestHelper {
  static async loginUser(app: any, user: ConcurrentTestUser): Promise<void> {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      });

    user.token = response.body.accessToken;
  }

  static async registerUser(app: any, user: ConcurrentTestUser): Promise<void> {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: user.email,
        password: user.password,
      });

    user.token = response.body.accessToken;
  }

  // static async createCustomer(app: any, user: ConcurrentTestUser, customerData: any): Promise<void> {
  //   const response = await request(app.getHttpServer())
  //     .post('/customers')
  //     .set('Authorization', `Bearer ${user.token}`)
  //     .send(customerData);

  //   user.customerId = response.body.id;
  // }

  // static async createVehicle(app: any, user: ConcurrentTestUser, vehicleData: any): Promise<void> {
  //   const response = await request(app.getHttpServer())
  //     .post('/vehicles')
  //     .set('Authorization', `Bearer ${user.token}`)
  //     .send({
  //       ...vehicleData,
  //       customerId: user.customerId,
  //     });

  //   if (!user.vehicleIds) {
  //     user.vehicleIds = [];
  //   }
  //   user.vehicleIds.push(response.body.id);
  // }

  // static async updateVehicleLocation(app: any, user: ConcurrentTestUser, locationData: any): Promise<any> {
  //   return request(app.getHttpServer())
  //     .patch('/vehicles/location/update')
  //     .set('Authorization', `Bearer ${user.token}`)
  //     .send(locationData);
  // }
}