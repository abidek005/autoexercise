import { expect as playwrightExpect, test } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

test('@api @smoke @regression Search Products', async ({ request }: { request: APIRequestContext }) => {
  const response = await request.post(
    'https://automationexercise.com/api/searchProduct',
    {
      form: {
        search_product: 'Dress',
      },
    }
  );

  expect(response.ok()).toBeTruthy();
});

function expect(arg0: any) {
    return {
        toBeTruthy: () => {
            playwrightExpect(arg0).toBeTruthy();
        }
    };
}
