import { AppState } from "../AppState.js"
import { Banner } from "../models/Banner.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class BannersService {
  async getBanners() {
    const res = await api.get('api/ads')
    AppState.banners = res.data.map(b => new Banner(b))
    logger.log(AppState.banners)
  }
}

export const bannersService = new BannersService()