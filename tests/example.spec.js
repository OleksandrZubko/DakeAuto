// @ts-check
import { test, expect } from '@playwright/test';

// Общая функция для логина
async function login(page) {
  try {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL environment variable is not set');
    }
    console.log('Using BASE_URL:', process.env.BASE_URL);
    
    // Используем полный URL вместо относительного пути
    await page.goto(process.env.BASE_URL);
    // Ждем, пока страница загрузится
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[name="login"]').fill(process.env.LOGIN || 'adminee');
    await page.locator('input[name="password"]').fill(process.env.PASSWORD || '71060589ff2cf877d53abb85d4daca2f');
    await page.locator('input[name="hash"]').fill(process.env.HASH || '71060589ff2cf877d53abb85d4daca2f');
    
    // Ждем, пока кнопка станет кликабельной
    const submitButton = page.locator('button.btn.btn-primary.user-login');
    await submitButton.waitFor({ state: 'visible' });
    
    // Используем Promise.all для обработки навигации
    await Promise.all([
      // Ждем навигацию
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      // Кликаем по кнопке
      submitButton.click()
    ]);
    
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

test('Login', async ({ page }) => {
  await login(page);

});

test('Statistic', async ({ page }) => {
  await login(page);

  // Поиск заголовка и проверка его видимости
  const title = page.locator('h3.kt-subheader__title');

  // Проверка на видимость заголовка
  await expect(title).toBeVisible();

  // Проверка, что текст заголовка равен "Statistics"
  await expect(title).toHaveText('Statistics');
});

test('Users', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Site management")');
  await page.click('#users');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Users');
});

test('Block Credentials', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Site management")');
  await page.click('#block-credentials');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Blocking Users');
});

test('Sessions', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Site management")');
  await page.click('#sessions');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Sessions');
});

test('Advertising Statistics', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Site management")');;
  await page.click('#advertising_statistics');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Advertising Statistics');
});

test('Ban by balance', async ({ page }) => {
    await login(page);
    await page.click('h4.kt-menu__section-text:has-text("Site management")');
    await page.click('#limit-ban');
    
    const label = page.locator('label[for="limit"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Set USDT Limit:');
});

test('Management Payment Provider', async ({ page }) => {
    await login(page);
    await page.click('h4.kt-menu__section-text:has-text("Site management")');
    await page.click('#management-payment-provider');
    
    const title = page.locator('h3.kt-portlet__head-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Management Payment Provider');
});

test('Data Statistic', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#DataStatistic');
  await page.click('#data_statistic');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Data Statistic');
});

test('Distribution Data', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#DataStatistic');;
  await page.click('#data_distribution');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Full statistic about distribution');
});

test('Distribution', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#DataStatistic');;
  await page.click('#distribution');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Distribution');
});

test('Banners', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#displayOnCasinoPanel');
  await page.click('#banners');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Banners');
});

test('FAQ', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#displayOnCasinoPanel');
  await page.click('#faq');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('List of FAQs');
});

test('Email Templates', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#displayOnCasinoPanel');
  await page.click('#email-template');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Email Templates');
});

test('Deposits', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Payments Panel")');;
  await page.click('#deposits');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Deposits');
});

test('Operations', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Payments Panel")');;
  await page.click('#operations');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Operations');
});

test('KYC', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Payments Panel")');;
  await page.click('#kyc');

  // Находим заголовок с текстом "Level 1"
  const header = page.locator('th.sorting', { hasText: 'Level 1' });

  // Проверка, что заголовок виден
  await expect(header).toBeVisible();

  // Проверка текста заголовка
  await expect(header).toHaveText('Level 1');
});

test('Withdraw', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("Payments Panel")');;
  await page.click('#withdraw');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Withdraw');
});

test('Slots', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  const gamePanelHeader = page.locator('h4.kt-menu__section-text', { hasText: 'Game Panel' });
  await expect(gamePanelHeader).toBeVisible();
  await gamePanelHeader.click();

  await page.click('li#slots a.kt-menu__link');

  const button = page.locator('button.btn.btn-success.btn-sm', { hasText: 'With Freespins' });

  // Проверка, что кнопка видна и активна
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  await expect(button).toHaveText('With Freespins');
});

test('Top Games', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  const gamePanelHeader = page.locator('h4.kt-menu__section-text', { hasText: 'Game Panel' });
  await expect(gamePanelHeader).toBeVisible();
  await gamePanelHeader.click();
  await page.click('li#top-games a.kt-menu__link');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Top Games');
});

test('Put Games into Group', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  const gamePanelHeader = page.locator('h4.kt-menu__section-text', { hasText: 'Game Panel' });
  await expect(gamePanelHeader).toBeVisible();
  await gamePanelHeader.click();
  
  const providerMenuItem = page.locator('li#put-games-into-group');
  await expect(providerMenuItem).toBeVisible();
  await providerMenuItem.click();

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Put Games into Group');
});

test('Put Provider into Group', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  const gamePanelHeader = page.locator('h4.kt-menu__section-text', { hasText: 'Game Panel' });
  await expect(gamePanelHeader).toBeVisible();
  await gamePanelHeader.click();
  await page.click('#put-provider-into-group');

  // Находим заголовок <h1> с текстом "Manage Provider Groups"
  const header = page.locator('h1', { hasText: 'Manage Provider Groups' });

  // Проверка, что заголовок виден
  await expect(header).toBeVisible();

  // Проверка текста заголовка
  await expect(header).toHaveText('Manage Provider Groups');
});

test('Block Slots', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  const gamePanelHeader = page.locator('h4.kt-menu__section-text', { hasText: 'Game Panel' });
  await expect(gamePanelHeader).toBeVisible();
  await gamePanelHeader.click();
  await page.click('#block_slots');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Block Slots');
});

test('Reloads', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  const gamePanelHeader = page.locator('h4.kt-menu__section-text', { hasText: 'New Feature Panel' });
  await expect(gamePanelHeader).toBeVisible();
  await gamePanelHeader.click();
  await page.click('#reload');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Reloads');
});

test('Reloads & Users', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('h4.kt-menu__section-text:has-text("New Feature Panel")');

  await page.click('#reloads-users');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Reloads & Users');
});

test('List of Questions with Answers', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#questionnariePanel');
  await page.click('#questions');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('List of Questions with Answers');
});

test('List of Questionnaires', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#questionnariePanel');
  await page.click('#questionnaires');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('List of Questionnaires');
});

test('List of Bonus Questionnaires', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#questionnariePanel');
  await page.click('#user_bonus_questionnaire');

  const createButton = page.locator('a.btn.btn-primary', { hasText: 'Create User Bonus Questionnaire' });

  // Проверка, что кнопка видна
  await expect(createButton).toBeVisible();
  await expect(createButton).toHaveText('Create User Bonus Questionnaire');
});

test('List of Promocodes', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#promocode');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('List of Promocodes');
});

test('All Bonuses', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#bonuses');

  // Найти заголовок
  const title = page.locator('h5.m-3.text-center', { hasText: 'All Bonuses' });

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('All Bonuses');
});

test('Campaign Bonuses', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#campaign-assign-bonus');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Campaign Bonuses');
});

test('Additional Bonuses', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#additional_bonuses');

  const createBonusButton = page.locator('a.btn.btn-primary', { hasText: 'Create Additional Bonus' });

  // Проверка видимости кнопки
  await expect(createBonusButton).toBeVisible();
});

test('User & Additional', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#user_additional_bonuses');

  // Найти заголовок
  const header = page.locator('h3.kt-portlet__head-title', { hasText: 'All Users' });

  // Проверка, что заголовок виден
  await expect(header).toBeVisible();

  // Проверка точного текста заголовка
  await expect(header).toHaveText('All Users');
});

test('List of Daily Bonus', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#daily_bonus');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('List of Daily Bonus');
});

test('Managment Additional Bonus', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#bonusPanel');
  await page.click('#management_additional_bonuses');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Managment Additional Bonus');
});

test('Tech Work', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#technicalPanel');
  await page.click('#tech');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Tech Work');
});

test('Dake Mail SMTP', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#technicalPanel');
  await page.click('#mail_job_status');

  // Найти заголовок
  const retryButton = page.locator('button.btn.btn-primary', { hasText: 'Retry All Failed Jobs' });

  // Проверка, что кнопка видна
  await expect(retryButton).toBeVisible();

  // Проверка текста кнопки
  await expect(retryButton).toHaveText('Retry All Failed Jobs');
});

test('Country Blocker', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#technicalPanel');
  await page.click('#block_countries');

  // Найти заголовок
  const header = page.locator('h5.m-3.text-center', { hasText: 'Country Blocker' });

  // Проверка, что заголовок виден
  await expect(header).toBeVisible();

  // Проверка текста заголовка
  await expect(header).toHaveText('Country Blocker');
});

test('PayPro Account', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#SettingPanel');
  await page.click('#payments_account');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Payment Account');
});

test('PayPro Payment Systems', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#SettingPanel');
  await page.click('#payments_paymentSystems');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Payment Systems');
});

test('PayPro Payment Fields', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#SettingPanel');
  await page.click('#payments_fields');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Payment Fields');
});

test('PayPro Key Transfer', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#SettingPanel');
  await page.click('#payments_keyTransferForm');

  // Найти заголовок
  const title = page.locator('h3.kt-subheader__title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('Key Transfer');
});

test('Access', async ({ page }) => {
  await login(page);

  // Поиск заголовка
  await page.click('#panelControl');
  await page.click('#admin_panel');

  // Найти заголовок
  const title = page.locator('h3.kt-portlet__head-title');

  // Проверка видимости заголовка
  await expect(title).toBeVisible();

  // Проверка текста заголовка
  await expect(title).toHaveText('List of admin users');
});