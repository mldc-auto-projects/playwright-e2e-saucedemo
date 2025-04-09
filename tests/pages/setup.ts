import { Page } from '@playwright/test';
import { BASE_URL } from '../resources/globalVariables';

export async function navigateToSite(page: Page) {
    try {
      await page.goto(BASE_URL, { timeout: 60000 });
    } catch (error) {
      console.error(`Failed to navigate to: ${BASE_URL}`, error);
      throw error; 
    }
  }
  
