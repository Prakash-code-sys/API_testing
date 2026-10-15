import {test,expect} from '@playwright/test'
import POSTAPIRequests from '../../testData/POSTAPI_request.json' with {type:'json'}


test.use({baseURL:process.env.BASE_API_URL})
test('POST API request',async({request})=>{
   //Posting API requests
    const APIResponses=await request.post(`/booking`,{data:POSTAPIRequests})
    const APIResponseJson= await APIResponses.json()

   //Printing API responses
    console.log('API Responses',JSON.stringify(APIResponseJson,null,2))

    //validating Statuscode,Text,Content
    expect(APIResponses.status()).toBe(200)
    expect(APIResponses.statusText()).toBe('OK')
    expect(APIResponses.headers()['content-type']).toContain('application/json')

    //validating properties/keys

    expect(APIResponseJson.booking).toHaveProperty('firstname')
    expect(APIResponseJson.booking).toHaveProperty('lastname')
    expect(APIResponseJson.booking.bookingdates).toHaveProperty('checkin')
    expect(APIResponseJson.booking.bookingdates).toHaveProperty('checkout')

    //validate API response body
    expect(APIResponseJson.bookingid).toBeGreaterThan(0)
    expect(APIResponseJson.booking.firstname).toBe("Prakash")
    expect(APIResponseJson.booking.lastname).toBe("Raj")
    expect(APIResponseJson.booking.bookingdates.checkin).toBe("2018-01-01")
    expect(APIResponseJson.booking.bookingdates.checkout).toBe("2019-01-01")
})