require('dotenv').config()
const chai = require('chai')
const project = require('../../api/runner/get-all-projects.js')
const data = require('../../api/data/get-all-projects.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Get all project', () => {                

        it('Without token', (done) => {
            let api = chai.request(process.env.API_URL);
            api.get(`/projects`)
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);                
                done();
           })
        })

        it('Using token', (done) => {
            let api = chai.request(process.env.API_URL);
            api.get(`/projects`)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                global.valid_id = res.body[-1].id;
                expect(res.body[2].id).to.equal(200);
                done();
           })
        })
    })
}