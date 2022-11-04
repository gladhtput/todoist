const {faker} = require('@faker-js/faker')
const chai = require('chai')
const project = require('../../api/runner/create-a-new-project.js')
const data = require('../../api/data/create-a-new-project.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))

module.exports = function(){
    describe('Create a new project', () => {
        token = "7bdfa8de79ed4b312be8d25a73618cbff307103c";        

        it('Using token and name', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.name).to.equal(project_name);                
                done();
           })
        })

        it('Without token', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .type('form')
            .send({
                name : project_name
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(401);
                done();
           })
        })
        
        it('Using token, name, and color', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                color : 'grape'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.name).to.equal(project_name);
                expect(res.body.color).to.equal("grape");                              
                done();
           })
        })
        
        it('Using token, name, and favorite', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.name).to.equal(project_name);                
                expect(res.body.is_favorite).to.equal(true);
                done();
           })
        })
        
        it('Using token, name, color, and favorite', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                color : 'grape',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                expect(res.body.color).to.equal("grape");
                expect(res.body.is_favorite).to.equal(true);
                done();
           })
        })
        
        it('Using token, name, and invalid color', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                color : 'black',           
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(400);            
                done();
           })
        })
        
        it('Using token, color, and favorite without name', (done) => {            
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({                
                color : 'grape',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(400);                
                done();
           })
        })

        it('Project number limit reached with number of existing project is 7', (done) => {
            const project_name =  faker.commerce.productName();
            let api = chai.request('https://api.todoist.com/rest/v2');
            api.post(`/projects`)            
            .set("Authorization", "Bearer " + token)
            .type('form')
            .send({
                name : project_name,
                color : 'grape',
                is_favorite : 'true'
            })                     
            .end(function(err, res){            
                expect(res.statusCode).to.equal(403);                
                done();
           })
        })
    })
}