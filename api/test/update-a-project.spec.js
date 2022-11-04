const {faker} = require('@faker-js/faker')
const chai = require('chai')
const project = require('../../api/runner/update-a-project.js')
const data = require('../../api/data/update-a-project.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Update a project', () => {
        token = "7bdfa8de79ed4b312be8d25a73618cbff307103c";
        const project_name =  faker.commerce.productName();

        it('Using invalid token', (done) => {            
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects/2301777036`)            
            .type('form')
            .send({
                name : project_name,
                color : 'grape',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);                
                done();
           })
        })

        it('Using token and invalid project', (done) => {            
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects/2301777`)         
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                color : 'grape',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(404);            
                done();
           })
        })

        it('Using token and name', (done) => {            
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects/2301777036`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                // color : 'grape',
                // is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.name).to.equal(project_name);                
                done();
           })
        })

        it('Using token and favorite', (done) => {            
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects/2301777036`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                // name : project_name,
                // color : 'grape',
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
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects/2301777036`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({                
                color : 'grape',                
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.color).to.equal("grape");
                done();
           })
        })

        it('Using token and invalid color', (done) => {            
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects/2301777036`)
            .set("Authorization", "Bearer " + token)
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