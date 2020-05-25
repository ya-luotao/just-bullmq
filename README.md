# just bullmq

## basic usage

create new perform job function `./jobs/sayhello-job.js`
```bash
module.exports = function() {
  console.log('say: hello');
}
```

up worker
```bash
npx just queue:up --queue sayhello
```
enqueue job
```bash
npx just queue:add --queue sayhello
```
