import {test,expect} from '@playwright/test'
import POSTAPIRequests from '../../testData/DYNAMIC_API_request.json' with {type:'json'}
import {formatAPIRequest} from '../../src/utilities/formatAPI.js'
import path from 'node:path'
import fs from 'node:fs'; 
import { fileURLToPath } from 'node:url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
test.use({baseURL:process.env.BASE_API_URL})
test('POST API request',async({request})=>{

    const filePath= path.join(__dirname,'../../testData/DYNAMIC_API_request.json')
    const jsonTemplate= fs.readFileSync(filePath,'utf-8')
    const values=["Prakash","Kavitha",100]

    const PostAPIRequests=await formatAPIRequest(jsonTemplate,values)
   //Posting API requests
    const APIResponses=await request.post(`/booking`,{data:JSON.parse(PostAPIRequests)})
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
    expect(APIResponseJson.booking.lastname).toBe("Kavitha")
    expect(APIResponseJson.booking.bookingdates.checkin).toBe("2018-01-01")
    expect(APIResponseJson.booking.bookingdates.checkout).toBe("2019-01-01")
})