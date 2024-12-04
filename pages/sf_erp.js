const { I } = inject();

module.exports = {
    currenParameters:{
        suscription: '',
        payDay: ''
    },
    fields: {
        userName: '#email',
        password: '#password',
        payDays: '#RANGO_FECHA_TEXT'
    },
    buttons: {
        login: 'commit',
        search: '#btn_buscar_nomina',
        close: 'Cerrar',
        confirm: 'Confirmar'
    },    
    elements:{
        welcomeMessage: 'Bienvenido',
        dataSetPayroll: '#resultsData',
        payrollReceipts: '#resultsData a',
        dialogConfirmReceipts: '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable',
        dialogButtons: '.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only',
        contextMenu: '.contextMenu',
        suscriptions: '.shortCut .link>a'

    },
    sections: {
        actions: 'ACCIONES',
        suscriptions: {
            hitssSolutions: 'HITSS SOLUTIONS',
            hitssConsulting: 'HITSS CONSULTING SA DE CV',
        },
        filters: {
            itemsPayDays: '.ui-daterangepicker.ui-widget.ui-helper-clearfix.ui-widget-content.sf-shadow .sf-ui-widget-content li'
        },
        payrollMenu: '#inMenu'
        
    },
    filters:{
        payDays:{
            all: 'Todas',
            currentMonth: 'Del mes',
            lastMonth: 'Mes pasado',
            last30Days: 'Últimos 30 días',
            las7Days: 'Últimos 7 días',
            yesterday: 'Ayer',
            today: 'Hoy'
        }
    },
    atributes: {
        ariaLabelledby: {'aria-labelledby': 'ui-dialog-title-confirmInvoiceReceivedDialog'}
    },
    login: function() {
        I.amOnPage('/crm/loginExterno.jsp');
        I.fillField(this.fields.userName, process.env.USER_NAME);
        I.fillField(this.fields.password, process.env.PASSWORD);
        I.click(this.buttons.login);
        I.see(this.elements.welcomeMessage);
    },
    selectSuscription: async function(suscription) {
        this.currenParameters.suscription = suscription;
        const helperObj = {
            suscriptionValue: suscription,
            suscriptionsLocator: this.elements.suscriptions
        }
        I.executeScript(obj =>{
            document.querySelectorAll(obj.suscriptionsLocator).forEach((element) => {
                if (element.textContent  === obj.suscriptionValue) {
                    element.click();
                }
            });
        }, helperObj);
        I.see(this.sections.actions, this.elements.contextMenu);

        //let logs = await I.grabBrowserLogs();
        //console.log(logs[1]._event.text)
        //console.log(JSON.stringify(logs));
        
    },
    async searchPayrollReceiptByPayDay(payDay){
        this.currenParameters.payDay = payDay;
        const helperObj = {
            payDay: payDay,
            itemsPayDays: this.sections.filters.itemsPayDays
        }
        I.seeElement(this.fields.payDays);
        I.click(this.fields.payDays);
        I.executeScript((obj) =>{
            document.querySelectorAll(obj.itemsPayDays).forEach((element) => {
                if (element.textContent  === obj.payDay) {
                    element.click();
                }
            });
        }, helperObj);
        I.seeInField(this.fields.payDays, payDay);
        I.click(this.buttons.search);
    },
    checkExistUnconfirmedReceipts(){
       this.removeConfirmedReceipts();
       I.seeElement(this.elements.payrollReceipts);
    },
    async confirmPayrollReceipts(){
        I.click(this.elements.payrollReceipts);
        I.seeAttributesOnElements(this.elements.dialogConfirmReceipts, this.atributes.ariaLabelledby);

        I.executeScript((obj) =>{
            document.querySelectorAll(obj.selectorButton).forEach((element) => {
                if (element.textContent  === obj.button) {
                    element.click();
                }
            });
        }, {selectorButton:this.elements.dialogButtons, button:this.buttons.confirm});
        
        I.seeElement(this.sections.payrollMenu);

        this.reloadUnconfirmedPayrollReceipts();

        if(await this.totalUnconfirmedReceipts() > 0){
            this.confirmPayrollReceipts();
        }
    },
    reloadUnconfirmedPayrollReceipts(){
        this.selectSuscription(this.currenParameters.suscription);
        this.searchPayrollReceiptByPayDay(this.currenParameters.payDay);
        this.removeConfirmedReceipts();
    }
    ,
    totalUnconfirmedReceipts: async function(){
        return  await I.grabNumberOfVisibleElements(this.elements.payrollReceipts);
    },
    removeConfirmedReceipts(){
        I.executeScript((payrollReceipts) =>{
            document.querySelectorAll(payrollReceipts).forEach(element => {
                if(element.href != ""){
                    element.remove();
                }
            });
        },this.elements.payrollReceipts);        
    }
}