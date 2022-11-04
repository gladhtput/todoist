const chai = require('chai')
const project = require('../../api/runner/delete-a-project.js')
// const data = require('../../api/data/delete-a-project.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Delete a project', () => {
        token = "7bdfa8de79ed4b312be8d25a73618cbff307103c";

        it('Using token and invalid id', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.delete(`/projects/2301727`)            
            .set("Authorization", "Bearer " + token)                   
            .end(function(err, res){            
                expect(res.statusCode).to.equal(204);                
                done();
           })
        })

        it('Without token but using valid id', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.delete(`/projects/2301777417`)            
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);                
                done();
           })
        })

        it('Using token and valid id', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.delete(`/projects/2301777417`)
            .set("Authorization", "Bearer " + token)                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(204);                
                done();
           })
        })
    })
}