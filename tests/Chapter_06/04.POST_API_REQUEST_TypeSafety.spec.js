import { test, expect } from '@playwright/test';
import { validateSchema } from '../../src/utilities/validateSchema.js';
import { bookingSchema } from '../../src/utilities/bookingSchema.js';
test.use({baseURL:process.env.BASE_API_URL})
test('Validate API response types', async ({ request }) => {

    const response = await request.post(
        '/booking',
        {
            data: {
                firstname: 'Prakash',
                lastname: 'raj',
                totalprice: 500,
                depositpaid: true,
                additionalneeds: 'Breakfast',
                bookingdates: {
                checkin: '2026-10-20',
                checkout: '2026-10-25'
                }
            }
        }
    );

    expect(response.status()).toBe(200);

    const responseData = await response.json();

    // Validate the booking object's structure and types
     expect(validateSchema(responseData.booking, bookingSchema)).toBe(true);
});