const { task, option, argv, logger } = require('just-scripts');
const { Queue, QueueEvents, Worker } = require('bullmq');

task('queue:up', async function() {
  const queueName = argv().queue;
  const performFn = require(`./jobs/${queueName}-job.js`);
  const worker = new Worker(queueName, performFn);
  worker.on('completed', (job) => {
    logger.info(`${job.id} has completed!`);
  });
  worker.on('failed', (job, err) => {
    logger.error(`${job.id} has failed with ${err.message}`);
  });
  logger.info(`Queue ${queueName} up.`);
});

task('queue:add', async function() {
  const queueName = argv().queue;
  const payload = argv().payload;
  const queue = new Queue(queueName);
  await queue.add(queueName, payload);
});
