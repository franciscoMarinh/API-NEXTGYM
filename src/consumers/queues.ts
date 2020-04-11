import fs from 'fs'
import path from 'path'
import Bull from 'bull'
import redisConfig from './commons/config/redis.config'
import logger from './commons/utils/logger'

interface Jobs {
  name: string;
  bull: Bull.Queue;
  handle: Bull.ProcessPromiseFunction<object>;
}

class QueueController {
  public jobs: Array<Jobs>
  constructor () {
    this.jobs = this.getAllJobs()
  }

  private getAllJobs (): Array<Jobs> {
    const jobsPath = path.join(__dirname, 'commons', 'jobs')
    return fs.readdirSync(jobsPath).map(job => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const jobData = require(`${jobsPath}/${job}`).default
      return {
        name: jobData.name,
        bull: new Bull(jobData.name, redisConfig),
        handle: jobData.handle
      }
    })
  }

  public add (jobName: string): Bull.Queue | boolean {
    const job = this.jobs.find(job => job.name === jobName)
    if (!job) return false
    return job.bull
  }

  public processAllJobs (): void {
    this.jobs.forEach(async (job) => {
      try {
        job.bull.process(job.handle)
        logger.info(`job ${job.name} foi processado!`)
      } catch (error) {
        logger.error(`job ${job.name}, processamento`)
      }
    })
  }
}

export default new QueueController()
