import fs from '@zenfs/core'
import { toDashedCase } from '../../tools/utils'
import { LocalProject, LocalProjectNew } from './types'
import { LocalProjectNewSchema } from './schemas'

// 📝 Maybe could be renamed to ProjectCatalog, UserProjects,  ProjectLibrary or ProjectArchive

// The following may not work as it only request for permission when some heuristic chekcs are met:
// - page is bookmarket
// - user ahs notification enables ?
// Details: https://web.dev/articles/persistent-storage
// if ('persist' in navigator.storage) {
//   // Enable Data persistence
//   // https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#does_browser-stored_data_persist
//   navigator.storage.persist().then((granted) => {
//     console.log('🔥 persistence granted:', granted)
//   })
// } else {
//   console.log()
// }

const getLocalProjects = (): LocalProject[] => {
  if (!fs.existsSync('/projects')) fs.mkdirSync('/projects')

  const projectNames = fs.readdirSync('/projects')
  const projects = projectNames.map((projectName) => {
    const projectDirname = `/projects/${projectName}`
    const project = fs.readFileSync(`${projectDirname}/project.json`, {
      encoding: 'utf-8',
    })
    return JSON.parse(project)
  })
  LocalProjectNewSchema.array().parse(projects)
  return projects
}

const createLocalProject = (projectOptions: LocalProjectNew): LocalProject => {
  const projectId = toDashedCase(projectOptions.name)
  const project: LocalProject = {
    ...projectOptions,
    id: projectId,
  }
  fs.mkdirSync(`/projects/${projectId}`)
  fs.writeFileSync(
    `/projects/${projectId}/project.json`,
    JSON.stringify(project),
    {
      encoding: 'utf-8',
    }
  )
  return project
}

const deleteLocalProject = (id: LocalProject['id']): void => {
  fs.rmSync(`/projects/${id}`, { recursive: true })
}

export const LocalProjectsDataProvider = {
  getLocalProjects,
  createLocalProject,
  deleteLocalProject,
}
