'use strict'

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const agentFixtures = require('./fixtures/agent');

let config = {
    logging: () => { }
};

let single= Object.assign({}, );
let AgentStub = null;
let db = null;
let sandbox = null;

let MetricStub = {
    belongsTo: sinon.spy(),
}

test.beforeEach(async () => {
    sandbox = sinon.createSandbox({});
    AgentStub = {
        hasMany: sandbox.spy(),
    }

    const setUpDatabase = proxyquire('../', {
        './models/agent': () => AgentStub,
        './models/metric': () => MetricStub
    });
    db = await setUpDatabase(config);
})

test.afterEach(() => {
    sandbox && sandbox.restore();
});

test('Agent', (t) => {
    t.truthy(db.Agent, 'Agent service should exist');
});

test.serial('Setup', (t) => {
    t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed.');
    t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel');
    t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed');
    t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel');

});