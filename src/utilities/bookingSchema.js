export const bookingSchema = {
type: 'object',
properties: {
firstname: { type: 'string' },
lastname: { type: 'string' },
totalprice: { type: 'number' },
depositpaid: { type: 'boolean' },
additionalneeds: { type: 'string' },
bookingdates: {
type: 'object',
properties: {
checkin: { type: 'string' },
checkout: { type: 'string' }
},
required: ['checkin', 'checkout'],
additionalProperties: false
}
},
required: [
'firstname',
'lastname',
'totalprice',
'depositpaid',
'additionalneeds',
'bookingdates'
],
additionalProperties: false
};
