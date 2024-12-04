const systemErp = require('../pages/sf_erp');
// Add in your custom step files

Given('I login to system', () => {
  systemErp.login();
});

When('I select HITSS SOLUTIONS subscription', () => {
  systemErp.selectSuscription(systemErp.sections.suscriptions.hitssSolutions);
});
When('I select the LAST 30 DAYS option in the payroll receipt filter', () => {
  systemErp.searchPayrollReceiptByPayDay(systemErp.filters.payDays.last30Days);
})
When('I View unconfirmed receipts', ()=>{
  systemErp.checkExistUnconfirmedReceipts();
});
Then('I should confirm the payroll receipts for the last 30 days', ()=>{
  systemErp.confirmPayrollReceipts();
});
