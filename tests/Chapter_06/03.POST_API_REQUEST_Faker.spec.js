import {test,expect} from '@playwright/test'
import path from "node:path"
import fs from "node:fs"
import {fileURLToPath} from "node:url"
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
import {faker} from '@faker-js/faker'
import { formatAPIRequest } from '../../src/utilities/formatAPI'
//import {POSTAPIRequests} from '../../testData/DYNAMIC_API_request.json' with {type:'json'}

test.use({baseURL:process.env.BASE_API_URL})


test("Using faker js",async({request})=>{

    const filePath= path.join(__dirname,'../../testData/DYNAMIC_API_request.json')
    const jsonTemplate= fs.readFileSync(filePath,'utf-8')
    const firstname=faker.person.firstName()
    const lastname=faker.person.lastName()
    const totalPrice=faker.number.int({min:1000,max:10000})
    const value=[firstname,lastname,totalPrice]
    const APIrequests= await formatAPIRequest(jsonTemplate,value)

    const APIResponses= await request.post('/booking',{data:JSON.parse(APIrequests)})
    const APIResponseJson= await APIResponses.json()
    console.log('API resposnes',JSON.stringify(APIResponseJson,null,2))

    //validating status,code
    expect(APIResponses.status()).toBe(200)
    expect(APIResponses.statusText()).toBe("OK")
    expect(APIResponses.headers()['content-type']).toContain('application/json')

    //validating properties
    expect(APIResponseJson.booking).toHaveProperty('firstname')
    expect(APIResponseJson.booking).toHaveProperty('lastname')
    expect(APIResponseJson.booking.bookingdates).toHaveProperty('checkin')
    expect(APIResponseJson.booking.bookingdates).toHaveProperty('checkout')

    //validating keys

     expect(APIResponseJson.bookingid).toBeGreaterThan(0)
    expect(APIResponseJson.booking.firstname).toBe(firstname)
    expect(APIResponseJson.booking.lastname).toBe(lastname)
    expect(APIResponseJson.booking.totalprice).toBe(totalPrice)
})