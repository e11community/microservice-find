import * as core from '@actions/core'

import {findMicroserviceChildren} from './find-microservices-action'

async function run(): Promise<void> {
  try {
    const microservicesPath = core.getInput('microservices_path', {required: false}) || '.'
    const sExceptions = core.getInput('exceptions', {required: false})

    try {
      if (!sExceptions) {
        core.info('No exceptions inputted. Not even `default`?')
      }

      const aExceptions = sExceptions.trim().split(/\s+/)
      const discovered = findMicroserviceChildren(microservicesPath, aExceptions)
      const microservices = JSON.stringify(discovered)
      core.info('Microservices discovered: ' + microservices)
      core.setOutput('microservices', microservices)
    } catch (error) {
      core.setFailed(`Microservices could not be discovered under [${microservicesPath}]`)
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unknown error occurred.')
    }
  }
}

run()
