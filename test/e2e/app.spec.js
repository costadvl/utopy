describe('end to end', function () {
  it('should hace contacts', function (done) {
    browser.get('http://localhost:8080');
    element.all(by.repeater('contact in contacts'))
    .then(function(contacts){
      var first = contacts[0];
      var text = first.getText();
      expect(text).toEqual('Robert R');
      done();
    })
  })
});
