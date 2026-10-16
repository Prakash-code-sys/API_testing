import {test,expect} from '@playwright/test'
test.use({
    viewport: { width: 800, height: 600 }
});
test('Mock API',async({page})=>{

    await page.routeFromHAR('./har/fruits.har',{
        
        url:'**/api/v1/fruits',
        update:false
    })
    await page.goto('https://demo.playwright.dev/api-mocking/')
    await expect(page.getByText('Strawberry')).toBeVisible()
    await expect(page.getByText('Prakki')).toBeVisible()
    await expect(page.getByText('Raji')).toBeVisible()
    await page.waitForTimeout(3000)
})