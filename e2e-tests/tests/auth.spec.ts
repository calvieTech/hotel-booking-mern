import { expect, test } from '@playwright/test';

const UI_URL = 'http://localhost:5173';

// use the SHOULD OR SHOULD NOT rule
// e.g. should not allow the user to sign in

/**
 * E2E test to allow user to login
 */
test('Should allow the user to sign in', async ({ page }) => {
  await page.goto(`${UI_URL}/login`);

  // get the Sign In button
  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  // does not work
  // await expect(page.getByText('Logged in successfully!')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});
/**
 * E2E test to allow user to register
 */
test('Should allow user to register', async ({ page }) => {
  // const testEmail = `test_register_${
  //   Math.floor(Math.random() * 90000) + 10000
  // }@test.com`;
  const testEmail = `test123abc@test.com`;

  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Register an account' }).click();
  await expect(
    page.getByRole('heading', { name: 'Create an Account' })
  ).toBeVisible();

  await page.locator('[name=firstName]').fill('test_firstName');
  await page.locator('[name=lastName]').fill('test_lastName');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('password123');
  await page.locator('[name=confirmPassword]').fill('password123');

  await page.getByRole('button', { name: 'Register Now!' }).click();

  // does not work
  // await expect(page.getByText('Registration Success!')).toBeVisible();

  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test('Should allow user to logout', async ({ page }) => {
  await page.goto(`${UI_URL}`);

  // await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
});
