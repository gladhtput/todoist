const chai = require('chai')
const project = require('../../api/runner/get-all-projects.js')
const data = require('../../api/data/get-all-projects.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Get all project', () => {
        token = "7bdfa8de79ed4b312be8d25a73618cbff307103c";

        it('Without token', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.get(`/projects`)
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);                
                done();
           })
        })

        it('Using token', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.get(`/projects/2301727071`)            
            .set("Authorization", "Bearer " + token)                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                done();
           })
        })
    })
}