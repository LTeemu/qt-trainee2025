import { expect } from 'playwright/test';

async function mainFunctionalityTest(page) {
  // Navigate to the login page
  await page.goto('http://localhost:5173/login');

  // Clear local storage and check it's empty
  await page.evaluate(() => localStorage.clear());
  const localStorageContent = await page.evaluate(() => localStorage.length);
  await expect(localStorageContent).toBe(0);

  // Fill in invalid username
  await page.click('#usernameInput');
  await page.fill('#usernameInput', 'dummyuser2');

  // Click the Login button and check for error message
  await page.click('#loginButton');
  await expect(page.locator('#loginAlert')).toBeVisible();

  // Close the error message
  await page.click('#loginAlertCloseButton');

  // Fill in the correct username
  await page.click('#usernameInput');
  await page.fill('#usernameInput', 'dummyuser');

  // Click the Login button and check for welcome heading
  await page.click('#loginButton');
  await expect(page.locator('#dashboardHeading')).toHaveText('Welcome');
  await expect(page.locator('#noReservationsText')).toBeVisible();
  await expect(page.locator('#gettingStartedAlert')).toBeVisible();
  await expect(page.locator('#usernameDisplay')).toBeVisible();

  // Navigate to the devices page
  await page.click('#reserveDeviceLink');
  await page.click('#reserveDevice3');

  // Select custom Qt version
  await page.click('#customQtVersionDropdown');
  await page.click('#customQtVersionDropdown-option-1');

  // Select duration
  await page.click('#durationDropdown');
  await page.click('#durationDropdown-option-7');

  // Fill in the reason
  await page.click('#reasonTextbox');
  await page.fill('#reasonTextbox', 'Good reason!');

  // Reserve the device and check for success message
  await page.click('#reserveDeviceButton');
  await expect(page.locator('#dashboardTopAlert')).toHaveText(
    'Success!Device reserved successfully!',
  );

  // Check the reservation version
  await expect(page.locator('#reservation0Version')).toHaveText('2.1.0');
  await page.click('#ellipsisButton0');
  await expect(page.locator('#ellipsisButton0Edit')).toBeVisible();
  await page.click('#ellipsisButton0Edit');

  // Edit the reservation and check for success message and edited version
  await page.click('#customQtVersionDropdown');
  await page.click('#customQtVersionDropdown-option-2');
  await page.click('#durationDropdown');
  await page.click('#durationDropdown-option-23');
  await page.click('#reasonTextbox');
  await page.fill('#reasonTextbox', 'Good reason! (Edited)');
  await page.click('#editReservationButton');
  await expect(page.locator('#dashboardTopAlert')).toHaveText(
    'Success!Device reservation edited successfully!',
  );
  await expect(page.locator('#reservation0Version')).toHaveText('2.2.0');

  // Navigate back to the devices page, check availability and log out
  await page.click('#devicesLink');
  await expect(page.locator('#device2AvailabilityText')).toHaveText(
    '0 / 8 Available',
  );
  await page.click('#logoutButton');

  // Check the final state of local storage
  const expectedLocalStorageContent = {
    reservations:
      '[{"device_id":3,"device_type":"Device C","device_version":"2.2.0","reservation_time":"2024-12-26T19:59:44.962Z","reservation_duration":24,"reservation_reason":"Good reason! (Edited)"}]',
    'first-time-login': 'false',
  };
  const actualLocalStorageContent = await page.evaluate(() => {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageData[key] = localStorage.getItem(key);
    }
    return localStorageData;
  });
  const actualReservations = JSON.parse(
    actualLocalStorageContent['reservations'],
  );
  const expectedReservations = JSON.parse(
    expectedLocalStorageContent['reservations'],
  );
  const isValidDateString = (dateString) => !isNaN(Date.parse(dateString));
  const compareReservations = (actual, expected) => {
    return actual.every((reservation, index) => {
      return (
        reservation.device_id === expected[index].device_id &&
        reservation.device_type === expected[index].device_type &&
        reservation.device_version === expected[index].device_version &&
        reservation.reservation_duration ===
          expected[index].reservation_duration &&
        reservation.reservation_reason === expected[index].reservation_reason &&
        isValidDateString(reservation.reservation_time)
      );
    });
  };
  await expect(
    compareReservations(actualReservations, expectedReservations),
  ).toBe(true);
  await expect(actualLocalStorageContent['first-time-login']).toBe(
    expectedLocalStorageContent['first-time-login'],
  );
}

export { mainFunctionalityTest };
