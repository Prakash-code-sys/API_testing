import {test,expect} from '@playwright/test'
test.use({
    viewport: { width: 800, height: 600 }
});
test('Mock API',async({page})=>{

    await page.route('**/api/v1/fruits',async route=>{
        const response= await route.fetch()
        const json= await response.json()

        json.push({name:"Prakash",id:1})
        json.push({name:"Raj",id:2})
        
        await route.fulfill({response,
            json});
    })

    await page.goto('https://demo.playwright.dev/api-mocking/')

    await expect(page.getByText('Prakash')).toBeVisible()
    await expect(page.getByText('Raj')).toBeVisible()
    await page.waitForTimeout(3000)
})