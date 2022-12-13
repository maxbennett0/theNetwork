import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get('api/profiles/' + profileId)
    AppState.activeProfile = new Account(res.data)
  }

  async getPageById(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}/posts`)
    // logger.log(res.data)
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const profilesService = new ProfilesService()