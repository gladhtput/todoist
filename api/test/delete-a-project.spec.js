require('dotenv').config()
const chai = require('chai')
const { beforeEach } = require('mocha')
const project = require('../../api/runner/delete-a-project.js')
// const data = require('../../api/data/delete-a-project.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Delete a project', () => {
        invalid_id = "2301785";
        beforeEach('Getting an id', (done) => {
            let api = chai.request(process.env.API_URL);
            api.get(`/projects`)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .end(function(err, res){                
                global.valid_id = res.body[2].id;
                done();
            })
        })        

        it('Using token and invalid id', (done) => {
            let api = chai.request(process.env.API_URL);
            api.delete(`/projects/` + invalid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .end(function(err, res){            
                expect(res.statusCode).to.equal(204);                               
                done();
           })
        })

        it('Without token but using valid id', (done) => {
            let api = chai.request(process.env.API_URL);
            api.delete(`/projects/` + valid_id)
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);
                expect(res.text).to.equal('Forbidden');                
                done();
           })
        })

        it('Using token and valid id', (done) => {
            let api = chai.request(process.env.API_URL);
            api.delete(`/projects/` + valid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .end(function(err, res){            
                expect(res.statusCode).to.equal(204);                                
                done();
           })
        })
    })
}