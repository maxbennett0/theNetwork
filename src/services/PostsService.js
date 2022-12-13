import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }
  async createLikes(id) {
    const res = await api.post(`/api/posts/${id}/like`)
    AppState.posts.splice(AppState.posts.findIndex(p => p.id == id), 1, res.data)
  }
  async removePost(id) {
    const res = await api.delete('api/posts/' + id)
    AppState.posts.splice(AppState.posts.findIndex(p => p.id == id), 1)
  }
  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(res.data)
  }
  async pages(url) {
    const res = await api.get(url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }
}

export const postsService = new PostsService()