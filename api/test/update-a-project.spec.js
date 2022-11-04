require('dotenv').config()
const {faker} = require('@faker-js/faker')
const chai = require('chai')
const project = require('../../api/runner/update-a-project.js')
const data = require('../../api/data/update-a-project.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Update a project', () => {        
        const project_name =  faker.commerce.productName();
        valid_id = "2301777036";
        invalid_id = "2301777";

        it('Using invalid token', (done) => {            
            let api = chai.request(process.env.API_URL);
            api.post(`/projects/` + valid_id)
            .type('form')
            .send({
                name : project_name,
                color : 'grey',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);                
                done();
           })
        })

        it('Using token and invalid project', (done) => {            
            let api = chai.request(process.env.API_URL);
            api.post(`/projects/` + invalid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .type('form')
            .send({
                name : project_name,
                color : 'grey',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(404);            
                done();
           })
        })

        it('Using token and name', (done) => {            
            let api = chai.request(process.env.API_URL);
            api.post(`/projects/` + valid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .type('form')
            .send({
                name : project_name,                
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.name).to.equal(project_name);                
                done();
           })
        })

        it('Using token and favorite', (done) => {            
            let api = chai.request(process.env.API_URL);
            api.post(`/projects/` + valid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .type('form')
            .send({                
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);                
                expect(res.body.is_favorite).to.equal(true);
                done();
           })
        })

        it('Using token and valid color', (done) => {            
            let api = chai.request(process.env.API_URL);
            api.post(`/projects/` + valid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .type('form')
            .send({                
                color : 'grey',                
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.color).to.equal("grey");
                done();
           })
        })

        it('Using token and invalid color', (done) => {            
            let api = chai.request(process.env.API_URL);
            api.post(`/projects/` + valid_id)
            .set("Authorization", "Bearer " + process.env.TOKEN)
            .type('form')
            .send({                
                color : 'black'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(400);
                done();
           })
        })                
    })
}