import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  /** @type {import('./models/Banner.js').Banner[]} */
  banners: [],

  /** @type {import('./models/Account.js').Account | null} */
  activeProfile: null,

  nextPage: null,
  previousPage: null

  // TODO create 3 places to store changing page information 
})
