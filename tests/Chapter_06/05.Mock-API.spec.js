import {test,expect} from '@playwright/test'

test('Mock API',async({page})=>{

    await page.route('*/**/api/v1/fruits',async route=>{
        const json= [
            {name:"Prakash",id:1},
            {name:"Raj",id:2}
        ]
        route.fulfill({json})
    })

    await page.goto('https://demo.playwright.dev/api-mocking/')

    await expect(page.getByText('Prakash')).toBeVisible()
    await expect(page.getByText('Raj')).toBeVisible()
    await page.waitForTimeout(3000)
})