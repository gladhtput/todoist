const chai = require('chai')
const project = require('../../api/runner/get-a-project.js')
const data = require('../../api/data/get-a-project.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Get a project', () => {
        token = "7bdfa8de79ed4b312be8d25a73618cbff307103c";

        it('Using token and invalid id', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.get(`/projects/2301727`)            
            .set("Authorization", "Bearer " + token)                   
            .end(function(err, res){            
                expect(res.statusCode).to.equal(404);                
                done();
           })
        })

        it('Without token but using valid id', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.get(`/projects/2301727071`)
            // .set("Content-type", "application/json")
            // .set("Authorization", "Bearer " + token)                             
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);
                // expect(res.body).to.be.jsonSchema(data);
                done();
           })
        })

        it('Using token and valid id', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.get(`/projects/2301727071`)
            // .set("Content-type", "application/json")
            .set("Authorization", "Bearer " + token)                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                done();
           })
        })
    })
}