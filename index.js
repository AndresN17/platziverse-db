'use strict'
const setUpDatabase = require('./lib/db');
const setUpAgentModel = require('./models/agent');
const setUpMetricModel = require('./models/metric');
const defaults = require('defaults');

module.exports = async (config) => {
    config = defaults(config, {
        dialect: 'sqlite',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        query: {
            raw: true
        }
    });
    const sequelize = setUpDatabase(config);
    const AgentModel = setUpAgentModel(config);
    const MetricModel = setUpMetricModel(config);

    AgentModel.hasMany(MetricModel);
    MetricModel.belongsTo(AgentModel);

    await sequelize.authenticate();

    if (config.setup) {
        await sequelize.sync({ force: true });
    }

    const Agent = {};
    const Metric = {};

    return {
        Agent,
        Metric
    };
}