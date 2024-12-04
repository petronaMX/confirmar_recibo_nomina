// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({   
    login: function() {
      this.amOnPage('/crm/loginExterno.jsp');
      this.fillField('#email', process.env.USER_NAME);
      this.fillField('#password', process.env.PASSWORD);
      this.click('commit');
      this.see("Bienvenido")
    }
  });
}
